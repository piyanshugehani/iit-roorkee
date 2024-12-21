import React from 'react';
import type { SubtitleEntry } from '../types';

interface SubtitleControlsProps {
  subtitles: SubtitleEntry[];
  offset: number;
  onOffsetChange: (offset: number) => void;
  onSave: () => void;
}

export function SubtitleControls({
  subtitles,
  offset,
  onOffsetChange,
  onSave,
}: SubtitleControlsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Offset (seconds)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={offset}
              onChange={(e) => onOffsetChange(parseFloat(e.target.value))}
              className="flex-1"
            />
            <input
              type="number"
              value={offset}
              onChange={(e) => onOffsetChange(parseFloat(e.target.value))}
              className="w-24 px-3 py-2 border rounded-md"
              step="0.1"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {subtitles.length} subtitles loaded
          </div>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Adjusted Subtitles
          </button>
        </div>
      </div>
    </div>
  );
}