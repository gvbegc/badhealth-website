import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { appendFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog');

function readExistingPosts() {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
  return files.map(file => {
    const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const titleMatch = content.match(/title:\s*"([^"]+)"/);
    const categoryMatch = content.match(/category:\s*"([^"]+)"/);
    return {
      filename: file,
      title: titleMatch?.[1] ?? file,
      category: categoryMatch?.[1] ?? 'Unknown',
      content,
    };
  });
}

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function main() {
  const client = new Anthropic();
  const existingPosts = readExistingPosts();

  const coveredTopics = existingPosts
    .map(p => `- "${p.title}" (${p.category})`)
    .join('\n');

  // Use the most recent post as the style reference
  const styleExample = existingPosts[existingPosts.length - 1].content;

  const today = new Date().toISOString().split('T')[0];

  const prompt = `You are a content writer for BadHealth, an AI-powered app that scans your fridge and recommends personalized meals based on your nutrition goals.

EXISTING POSTS — do not cover these topics again:
${coveredTopics}

STYLE REFERENCE — match this format and voice exactly:
${styleExample}

TASK: Write a new blog post for BadHealth.

TOPIC RULES:
- Choose a topic related to: meal planning, nutrition, healthy cooking, family eating, personalized diet, grocery shopping, or cooking tips
- Do not overlap with the existing posts above
- Pick something people actually search for online (good SEO potential)
- Target 800-1200 words

REQUIRED FRONTMATTER FORMAT:
---
title: "Your Title Here"
excerpt: "One-sentence description of the post."
date: "${today}"
category: "Meal Planning"
author: "BadHealth Team"
readTime: "X min read"
---

Valid categories: Meal Planning, Nutrition, Cooking Tips, Family Meals, Science, Our Story
Estimate readTime at 200 words per minute.

WRITING RULES — no exceptions:
- NO em dashes (— or --). Use commas, colons, or rewrite the sentence instead
- NO AI vocabulary: delve, tapestry, vibrant, pivotal, crucial, landscape, foster, underscore, showcase, testament, enduring, transformative, robust, comprehensive, leverage, elevate, streamline, enhance, empower, holistic, seamless
- NO rule of three in closing sentences
- NO negative parallelisms ("It's not just about X, it's about Y")
- NO preachy closers ("That's the difference between X and Y")
- Lowercase headings (## why this works, not ## Why This Works)
- Vary sentence length naturally — mix short punchy sentences with longer ones
- Use specific details over vague claims
- Write like a real person who actually cooks and thinks about nutrition
- Keep bold text minimal — only for genuinely important terms, not decoration

End with a natural, low-key mention of the BadHealth app that fits the post's topic.

Output only the complete blog post, starting with ---.`;

  console.log('Calling Claude to generate post...');

  const stream = client.messages.stream({
    model: 'claude-opus-4-6',
    max_tokens: 8192,
    messages: [{ role: 'user', content: prompt }],
  });

  const response = await stream.finalMessage();

  const textBlock = response.content.find(b => b.type === 'text');
  if (!textBlock?.text) {
    throw new Error('No text content in Claude response');
  }

  // Strip any preamble before the frontmatter in case Claude adds one
  const frontmatterStart = textBlock.text.indexOf('---');
  if (frontmatterStart === -1) {
    throw new Error('Generated post is missing frontmatter block');
  }

  const postContent = textBlock.text.slice(frontmatterStart).trim();

  const titleMatch = postContent.match(/title:\s*"([^"]+)"/);
  if (!titleMatch) {
    throw new Error('Could not extract title from generated post');
  }

  const title = titleMatch[1];
  const slug = titleToSlug(title);

  let filename = `${slug}.md`;
  let filepath = path.join(BLOG_DIR, filename);

  // Avoid overwriting an existing post
  if (fs.existsSync(filepath)) {
    filename = `${slug}-${Date.now()}.md`;
    filepath = path.join(BLOG_DIR, filename);
  }

  fs.writeFileSync(filepath, postContent);
  console.log(`Post saved: ${filepath}`);

  // Pass outputs to GitHub Actions
  const githubOutput = process.env.GITHUB_OUTPUT;
  if (githubOutput) {
    appendFileSync(githubOutput, `filename=${path.basename(filename, '.md')}\n`);
    appendFileSync(githubOutput, `title=${title}\n`);
  }
}

main().catch(err => {
  console.error('Error generating post:', err);
  process.exit(1);
});
