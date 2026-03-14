"use client";

import { useState, useEffect, useCallback } from "react";

// --- Types ---
interface Video {
  id: string;
  title: string;
  platform: "Instagram" | "YouTube" | "TikTok";
  url: string;
  uploadDate: string; // YYYY-MM-DD
}

interface WeekEntry {
  weekEnding: string; // Friday date YYYY-MM-DD
  videoSnapshots: { videoId: string; views: number }[];
}

interface AnalyticsData {
  videos: Video[];
  weeks: WeekEntry[];
}

// --- Helpers ---
function getStorageData(): AnalyticsData {
  if (typeof window === "undefined") return { videos: [], weeks: [] };
  const raw = localStorage.getItem("bh_analytics");
  if (!raw) return { videos: [], weeks: [] };
  try {
    return JSON.parse(raw);
  } catch {
    return { videos: [], weeks: [] };
  }
}

function saveStorageData(data: AnalyticsData) {
  localStorage.setItem("bh_analytics", JSON.stringify(data));
}

function getFridayLabel(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  const weekStart = new Date(d);
  weekStart.setDate(d.getDate() - 6);
  return `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
}

function formatViews(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toLocaleString();
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// --- Main Component ---
export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({ videos: [], weeks: [] });
  const [loaded, setLoaded] = useState(false);
  const [weekIndex, setWeekIndex] = useState(0); // 0 = latest
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [showLogWeek, setShowLogWeek] = useState(false);
  const [showExport, setShowExport] = useState(false);

  // Load on mount
  useEffect(() => {
    const d = getStorageData();
    setData(d);
    setLoaded(true);
  }, []);

  // Save whenever data changes
  const persist = useCallback((newData: AnalyticsData) => {
    setData(newData);
    saveStorageData(newData);
  }, []);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-500">Loading...</p>
      </div>
    );
  }

  const sortedWeeks = [...data.weeks].sort(
    (a, b) => new Date(b.weekEnding).getTime() - new Date(a.weekEnding).getTime()
  );

  const currentWeek = sortedWeeks[weekIndex] || null;
  const previousWeek = currentWeek
    ? sortedWeeks[weekIndex + 1] || null
    : null;

  // Compute weekly stats
  let weeklyNewViews = 0;
  let videoRows: {
    video: Video;
    currentViews: number;
    previousViews: number;
    newViews: number;
  }[] = [];

  if (currentWeek) {
    for (const snap of currentWeek.videoSnapshots) {
      const video = data.videos.find((v) => v.id === snap.videoId);
      if (!video) continue;
      const prevSnap = previousWeek?.videoSnapshots.find(
        (s) => s.videoId === snap.videoId
      );
      const previousViews = prevSnap ? prevSnap.views : 0;
      const newViews = snap.views - previousViews;
      weeklyNewViews += newViews;
      videoRows.push({
        video,
        currentViews: snap.views,
        previousViews,
        newViews,
      });
    }
    videoRows.sort((a, b) => b.newViews - a.newViews);
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-lora)" }}>
            Video Analytics
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddVideo(true)}
              className="px-3 py-1.5 text-xs font-medium bg-[#0B352B] text-white rounded-lg hover:bg-[#0e4a3f] transition-colors"
            >
              + Add Video
            </button>
            <button
              onClick={() => setShowLogWeek(true)}
              className="px-3 py-1.5 text-xs font-medium bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
            >
              Log Week
            </button>
            <button
              onClick={() => setShowExport(!showExport)}
              className="px-3 py-1.5 text-xs font-medium border border-zinc-300 text-zinc-600 rounded-lg hover:bg-zinc-50 transition-colors"
            >
              Backup
            </button>
          </div>
        </div>

        {/* Export/Import Panel */}
        {showExport && (
          <ExportImportPanel data={data} onImport={persist} onClose={() => setShowExport(false)} />
        )}

        {/* Week Navigator */}
        {sortedWeeks.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6 bg-zinc-50 rounded-xl p-4">
              <button
                onClick={() => setWeekIndex(Math.min(weekIndex + 1, sortedWeeks.length - 1))}
                disabled={weekIndex >= sortedWeeks.length - 1}
                className="p-2 rounded-lg hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="text-center">
                <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Week Ending</p>
                <p className="font-semibold text-lg">{currentWeek ? getFridayLabel(currentWeek.weekEnding) : "—"}</p>
              </div>
              <button
                onClick={() => setWeekIndex(Math.max(weekIndex - 1, 0))}
                disabled={weekIndex <= 0}
                className="p-2 rounded-lg hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Weekly Summary Card */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-zinc-50 rounded-xl p-4 text-center">
                <p className="text-xs text-zinc-500 mb-1">New Views This Week</p>
                <p className="text-2xl font-bold text-[#0B352B]">{formatViews(weeklyNewViews)}</p>
              </div>
              <div className="bg-zinc-50 rounded-xl p-4 text-center">
                <p className="text-xs text-zinc-500 mb-1">Videos Tracked</p>
                <p className="text-2xl font-bold">{currentWeek?.videoSnapshots.length || 0}</p>
              </div>
              <div className="bg-zinc-50 rounded-xl p-4 text-center">
                <p className="text-xs text-zinc-500 mb-1">Total Views</p>
                <p className="text-2xl font-bold">
                  {formatViews(
                    currentWeek?.videoSnapshots.reduce((sum, s) => sum + s.views, 0) || 0
                  )}
                </p>
              </div>
            </div>

            {/* Mini Bar Chart */}
            {sortedWeeks.length > 1 && (
              <WeeklyChart weeks={sortedWeeks} allWeeks={data.weeks} videos={data.videos} activeIndex={weekIndex} onSelectWeek={setWeekIndex} />
            )}

            {/* Video Table */}
            <div className="border border-zinc-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200">
                    <th className="text-left px-4 py-3 font-medium text-zinc-600">Video</th>
                    <th className="text-left px-4 py-3 font-medium text-zinc-600 hidden sm:table-cell">Platform</th>
                    <th className="text-right px-4 py-3 font-medium text-zinc-600">Total Views</th>
                    <th className="text-right px-4 py-3 font-medium text-zinc-600">New This Week</th>
                  </tr>
                </thead>
                <tbody>
                  {videoRows.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-zinc-400">
                        No videos logged for this week
                      </td>
                    </tr>
                  ) : (
                    videoRows.map((row) => (
                      <tr key={row.video.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-zinc-900 truncate max-w-[200px] sm:max-w-[300px]">
                              {row.video.title}
                            </p>
                            <p className="text-xs text-zinc-400">{row.video.uploadDate}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <PlatformBadge platform={row.video.platform} />
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-zinc-700">
                          {formatViews(row.currentViews)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-semibold text-[#0B352B]">
                          +{formatViews(row.newViews)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-zinc-400">
            <p className="text-lg mb-2">No data yet</p>
            <p className="text-sm">Add videos, then log your first week to get started.</p>
          </div>
        )}

        {/* All Videos List */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-lora)" }}>
            All Videos ({data.videos.length})
          </h2>
          {data.videos.length === 0 ? (
            <p className="text-zinc-400 text-sm">No videos added yet.</p>
          ) : (
            <div className="space-y-2">
              {data.videos
                .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
                .map((v) => (
                  <div key={v.id} className="flex items-center justify-between border border-zinc-200 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <PlatformBadge platform={v.platform} />
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{v.title}</p>
                        <p className="text-xs text-zinc-400">{v.uploadDate}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (!confirm("Delete this video? This will also remove it from all weekly logs.")) return;
                        const newData = {
                          videos: data.videos.filter((x) => x.id !== v.id),
                          weeks: data.weeks.map((w) => ({
                            ...w,
                            videoSnapshots: w.videoSnapshots.filter((s) => s.videoId !== v.id),
                          })),
                        };
                        persist(newData);
                      }}
                      className="text-xs text-red-400 hover:text-red-600 ml-2 shrink-0"
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showAddVideo && (
        <AddVideoModal
          onClose={() => setShowAddVideo(false)}
          onAdd={(video) => {
            persist({ ...data, videos: [...data.videos, video] });
            setShowAddVideo(false);
          }}
        />
      )}
      {showLogWeek && (
        <LogWeekModal
          data={data}
          onClose={() => setShowLogWeek(false)}
          onSave={(entry) => {
            const existing = data.weeks.findIndex((w) => w.weekEnding === entry.weekEnding);
            let newWeeks: WeekEntry[];
            if (existing >= 0) {
              newWeeks = [...data.weeks];
              newWeeks[existing] = entry;
            } else {
              newWeeks = [...data.weeks, entry];
            }
            persist({ ...data, weeks: newWeeks });
            setShowLogWeek(false);
            setWeekIndex(0);
          }}
        />
      )}
    </div>
  );
}

// --- Sub Components ---

function PlatformBadge({ platform }: { platform: string }) {
  const colors: Record<string, string> = {
    Instagram: "bg-pink-50 text-pink-700 border-pink-200",
    YouTube: "bg-red-50 text-red-700 border-red-200",
    TikTok: "bg-zinc-100 text-zinc-700 border-zinc-300",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${colors[platform] || colors.Instagram}`}>
      {platform}
    </span>
  );
}

function WeeklyChart({
  weeks,
  allWeeks,
  activeIndex,
  onSelectWeek,
}: {
  weeks: WeekEntry[];
  allWeeks: WeekEntry[];
  videos: Video[];
  activeIndex: number;
  onSelectWeek: (i: number) => void;
}) {
  // Calculate new views per week
  const weeklyData = weeks.map((week, i) => {
    const prev = weeks[i + 1] || null;
    let newViews = 0;
    for (const snap of week.videoSnapshots) {
      const prevSnap = prev?.videoSnapshots.find((s) => s.videoId === snap.videoId);
      newViews += snap.views - (prevSnap?.views || 0);
    }
    return { weekEnding: week.weekEnding, newViews };
  }).reverse();

  const max = Math.max(...weeklyData.map((d) => d.newViews), 1);

  return (
    <div className="mb-8">
      <p className="text-xs text-zinc-500 mb-3">Weekly New Views</p>
      <div className="flex items-end gap-1 h-24">
        {weeklyData.map((d, i) => {
          const reversedIndex = weeklyData.length - 1 - i;
          const isActive = reversedIndex === activeIndex;
          const height = Math.max((d.newViews / max) * 100, 4);
          return (
            <button
              key={d.weekEnding}
              onClick={() => onSelectWeek(reversedIndex)}
              className={`flex-1 rounded-t transition-colors ${
                isActive ? "bg-[#0B352B]" : "bg-zinc-200 hover:bg-zinc-300"
              }`}
              style={{ height: `${height}%` }}
              title={`${getFridayLabel(d.weekEnding)}: ${formatViews(d.newViews)} new views`}
            />
          );
        })}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-zinc-400">
          {weeklyData[0] ? new Date(weeklyData[0].weekEnding + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
        </span>
        <span className="text-[10px] text-zinc-400">
          {weeklyData[weeklyData.length - 1] ? new Date(weeklyData[weeklyData.length - 1].weekEnding + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
        </span>
      </div>
    </div>
  );
}

function AddVideoModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (v: Video) => void;
}) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState<Video["platform"]>("Instagram");
  const [url, setUrl] = useState("");
  const [uploadDate, setUploadDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-lora)" }}>Add Video</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B352B]/20 focus:border-[#0B352B]"
              placeholder="Video title"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Video["platform"])}
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B352B]/20 focus:border-[#0B352B]"
            >
              <option>Instagram</option>
              <option>YouTube</option>
              <option>TikTok</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B352B]/20 focus:border-[#0B352B]"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">Upload Date</label>
            <input
              type="date"
              value={uploadDate}
              onChange={(e) => setUploadDate(e.target.value)}
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B352B]/20 focus:border-[#0B352B]"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          <button onClick={onClose} className="flex-1 px-4 py-2 text-sm border border-zinc-300 rounded-lg hover:bg-zinc-50">
            Cancel
          </button>
          <button
            onClick={() => {
              if (!title.trim()) return;
              onAdd({ id: generateId(), title: title.trim(), platform, url: url.trim(), uploadDate });
            }}
            disabled={!title.trim()}
            className="flex-1 px-4 py-2 text-sm bg-[#0B352B] text-white rounded-lg hover:bg-[#0e4a3f] disabled:opacity-40"
          >
            Add Video
          </button>
        </div>
      </div>
    </div>
  );
}

function LogWeekModal({
  data,
  onClose,
  onSave,
}: {
  data: AnalyticsData;
  onClose: () => void;
  onSave: (entry: WeekEntry) => void;
}) {
  // Default to today's date as the week-ending Friday
  const today = new Date().toISOString().split("T")[0];
  const [weekEnding, setWeekEnding] = useState(today);

  // Pre-fill with existing data if editing a week
  const existingWeek = data.weeks.find((w) => w.weekEnding === weekEnding);

  const [snapshots, setSnapshots] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const v of data.videos) {
      const existing = existingWeek?.videoSnapshots.find((s) => s.videoId === v.id);
      init[v.id] = existing ? String(existing.views) : "";
    }
    return init;
  });

  // Update snapshots when weekEnding changes
  useEffect(() => {
    const week = data.weeks.find((w) => w.weekEnding === weekEnding);
    const updated: Record<string, string> = {};
    for (const v of data.videos) {
      const existing = week?.videoSnapshots.find((s) => s.videoId === v.id);
      updated[v.id] = existing ? String(existing.views) : snapshots[v.id] || "";
    }
    setSnapshots(updated);
  }, [weekEnding]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-lora)" }}>
          Log Weekly Views
        </h2>
        <div className="mb-4">
          <label className="block text-xs font-medium text-zinc-600 mb-1">Week Ending (Friday)</label>
          <input
            type="date"
            value={weekEnding}
            onChange={(e) => setWeekEnding(e.target.value)}
            className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B352B]/20 focus:border-[#0B352B]"
          />
        </div>
        {data.videos.length === 0 ? (
          <p className="text-zinc-400 text-sm py-4">No videos added yet. Add videos first.</p>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-zinc-500">Enter the <strong>total</strong> view count for each video as of this date:</p>
            {data.videos
              .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
              .map((v) => (
                <div key={v.id} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{v.title}</p>
                    <div className="flex items-center gap-2">
                      <PlatformBadge platform={v.platform} />
                      <span className="text-xs text-zinc-400">{v.uploadDate}</span>
                    </div>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={snapshots[v.id] || ""}
                    onChange={(e) => setSnapshots({ ...snapshots, [v.id]: e.target.value })}
                    className="w-28 border border-zinc-300 rounded-lg px-3 py-2 text-sm text-right font-mono focus:outline-none focus:ring-2 focus:ring-[#0B352B]/20 focus:border-[#0B352B]"
                    placeholder="Views"
                  />
                </div>
              ))}
          </div>
        )}
        <div className="flex gap-2 mt-6">
          <button onClick={onClose} className="flex-1 px-4 py-2 text-sm border border-zinc-300 rounded-lg hover:bg-zinc-50">
            Cancel
          </button>
          <button
            onClick={() => {
              const videoSnapshots = Object.entries(snapshots)
                .filter(([, views]) => views !== "" && !isNaN(Number(views)))
                .map(([videoId, views]) => ({ videoId, views: Number(views) }));
              onSave({ weekEnding, videoSnapshots });
            }}
            className="flex-1 px-4 py-2 text-sm bg-[#0B352B] text-white rounded-lg hover:bg-[#0e4a3f]"
          >
            Save Week
          </button>
        </div>
      </div>
    </div>
  );
}

function ExportImportPanel({
  data,
  onImport,
  onClose,
}: {
  data: AnalyticsData;
  onImport: (d: AnalyticsData) => void;
  onClose: () => void;
}) {
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");

  const exportJson = JSON.stringify(data, null, 2);

  return (
    <div className="mb-6 border border-zinc-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Backup & Restore</h3>
        <button onClick={onClose} className="text-xs text-zinc-400 hover:text-zinc-600">Close</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-zinc-500 mb-2">Export (copy this to save your data)</p>
          <textarea
            readOnly
            value={exportJson}
            className="w-full h-32 text-xs font-mono border border-zinc-200 rounded-lg p-2 bg-zinc-50"
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />
          <button
            onClick={() => navigator.clipboard.writeText(exportJson)}
            className="mt-1 text-xs text-[#0B352B] hover:underline"
          >
            Copy to clipboard
          </button>
        </div>
        <div>
          <p className="text-xs text-zinc-500 mb-2">Import (paste backup data to restore)</p>
          <textarea
            value={importText}
            onChange={(e) => { setImportText(e.target.value); setImportError(""); }}
            className="w-full h-32 text-xs font-mono border border-zinc-200 rounded-lg p-2"
            placeholder="Paste JSON here..."
          />
          {importError && <p className="text-xs text-red-500 mt-1">{importError}</p>}
          <button
            onClick={() => {
              try {
                const parsed = JSON.parse(importText);
                if (!parsed.videos || !parsed.weeks) throw new Error("Invalid format");
                if (!confirm("This will replace ALL current data. Are you sure?")) return;
                onImport(parsed);
                setImportText("");
                onClose();
              } catch {
                setImportError("Invalid JSON. Make sure you pasted the full export.");
              }
            }}
            className="mt-1 text-xs text-[#0B352B] hover:underline"
          >
            Restore from backup
          </button>
        </div>
      </div>
    </div>
  );
}
