import React, { useState, useCallback } from 'react';
import { VideoPlayer } from '../components/VideoPlayer';
import { SubtitleControls } from '../components/SubtitleControls';
import { WaveformVisualizer } from '../components/sync/WaveformVisualizer';
import { SubtitleList } from '../components/sync/SubtitleList';
import { parseSubRip, generateSubRip } from '../utils/subtitleParser';
import { analyzeSyncIssues } from '../utils/smartSync';
import type { SubtitleEntry, VideoState } from '../types';

export function SyncApp() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [subtitles, setSubtitles] = useState<SubtitleEntry[]>([]);
  const [offset, setOffset] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSubtitle, setCurrentSubtitle] = useState<SubtitleEntry | null>(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const handleSubtitleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const content = await file.text();
      const parsed = parseSubRip(content);
      setSubtitles(parsed);
      
      // Analyze for sync issues and suggest corrections
      const suggestions = analyzeSyncIssues(parsed);
      if (suggestions.length > 0) {
        const bestSuggestion = suggestions.reduce((prev, current) => 
          current.confidence > prev.confidence ? current : prev
        );
        setOffset(bestSuggestion.offset);
      }
    }
  };

  const handleTimeUpdate = useCallback(
    ({ currentTime: time, duration: dur }: VideoState) => {
      setCurrentTime(time);
      setDuration(dur);
      
      const adjustedTime = time - offset;
      const current = subtitles.find(
        (sub) => adjustedTime >= sub.startTime && adjustedTime <= sub.endTime
      );
      setCurrentSubtitle(current || null);
    },
    [subtitles, offset]
  );

  const handleSubtitleClick = useCallback((time: number) => {
    const video = document.querySelector('video');
    if (video) {
      video.currentTime = time + offset;
    }
  }, [offset]);

  const handleSave = () => {
    const adjustedSubtitles = subtitles.map((sub) => ({
      ...sub,
      startTime: sub.startTime + offset,
      endTime: sub.endTime + offset,
    }));

    const content = generateSubRip(adjustedSubtitles);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'adjusted_subtitles.srt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {videoUrl ? (
              <>
                <VideoPlayer
                  videoUrl={videoUrl}
                  currentSubtitle={currentSubtitle}
                  onTimeUpdate={handleTimeUpdate}
                />
                <div className="mt-4">
                  <WaveformVisualizer
                    videoUrl={videoUrl}
                    currentTime={currentTime}
                    duration={duration}
                  />
                </div>
              </>
            ) : (
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                <label className="cursor-pointer text-center">
                  <div className="text-gray-400 mb-2">Upload Video</div>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            {!subtitles.length ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <label className="cursor-pointer">
                  <div className="text-gray-600 mb-2">Upload Subtitles</div>
                  <input
                    type="file"
                    accept=".srt"
                    onChange={handleSubtitleUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <SubtitleList
                subtitles={subtitles}
                currentTime={currentTime - offset}
                onSubtitleClick={handleSubtitleClick}
              />
            )}
          </div>
        </div>

        {videoUrl && subtitles.length > 0 && (
          <div className="mt-8">
            <SubtitleControls
              subtitles={subtitles}
              offset={offset}
              onOffsetChange={setOffset}
              onSave={handleSave}
            />
          </div>
        )}
      </div>
    </div>
  );
}