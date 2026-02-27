"use client";

import { useState } from "react";
import Container from "../components/Container";

const faqs = [
  {
    question: "What is the BadHealth app?",
    answer:
      "BadHealth is a smart fridge-scanning app that uses AI to analyze the ingredients you have at home and instantly recommend personalized meals tailored to your health goals. It helps you eat better, reduce food waste, and take the guesswork out of what to cook.",
  },
  {
    question: "How are meal recommendations calculated?",
    answer:
      "BadHealth analyzes the ingredients in your fridge using computer vision and combines that with your personal health profile — including your dietary preferences, goals, and restrictions — to surface the best meal options for you. The more you use the app, the better it gets at understanding what works for you.",
  },
  {
    question: "What do you mean by 'mindful eating'? Why should I care about this?",
    answer:
      "Mindful eating means being intentional about what you eat and why — paying attention to hunger cues, choosing foods that align with your goals, and reducing impulsive or wasteful food decisions. BadHealth makes mindful eating easier by surfacing meals that are both delicious and aligned with what your body needs.",
  },
  {
    question: "What is BadHealth Plus?",
    answer:
      "BadHealth Plus is our premium subscription that unlocks advanced features including unlimited fridge scans, detailed nutritional breakdowns, personalized weekly meal plans, grocery list generation, and priority access to new features as we ship them.",
  },
  {
    question: "How much does BadHealth Plus cost?",
    answer:
      "BadHealth Plus costs $29.99 per year. That works out to less than $2.50 a month — less than a cup of coffee — for a smarter, healthier relationship with food.",
  },
  {
    question: "How can I manage my BadHealth Plus subscription?",
    answer:
      "You can manage your BadHealth Plus subscription directly through your iPhone's Settings app. Go to Settings → your Apple ID → Subscriptions, then tap BadHealth to view, change, or cancel your subscription at any time.",
  },
  {
    question: "I am trying to purchase BadHealth Plus, but keep getting an error.",
    answer:
      "First, make sure your Apple ID has a valid payment method on file and that you have a stable internet connection. If the issue persists, try signing out of your Apple ID and back in, or restart the app. If you're still having trouble, reach out to us at Gabriel@badhealthapp.com and we'll get it sorted quickly.",
  },
  {
    question: "I have paid for BadHealth Plus — can I now use all features?",
    answer:
      "Yes! Once your purchase is confirmed, all BadHealth Plus features are unlocked immediately. If you don't see them right away, try closing and reopening the app. If features still aren't showing, tap 'Restore Purchases' in the app settings or contact us at Gabriel@badhealthapp.com.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-6 [font-family:var(--font-google-sans)]"
      >
        <span className="text-base text-black">{question}</span>
        <span
          className={`shrink-0 text-zinc-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm text-zinc-600 leading-relaxed [font-family:var(--font-google-sans)] max-w-2xl">
          {answer}
        </p>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen py-20">
      <Container>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-normal tracking-tight text-black mb-2">
            Frequently asked questions
          </h1>
          <p className="text-zinc-500 text-sm mb-12 [font-family:var(--font-google-sans)]">
            Can&apos;t find what you&apos;re looking for? Email us at{" "}
            <a
              href="mailto:Gabriel@badhealthapp.com"
              className="text-[#0B352B] underline underline-offset-2"
            >
              Gabriel@badhealthapp.com
            </a>
          </p>
          <div className="border-t border-zinc-200">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
