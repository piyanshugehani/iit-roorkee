import React, { useState } from 'react';
import { Clock, Edit2, ChevronRight } from 'lucide-react';
import type { SubtitleEntry } from '../../types';
import { formatTimestamp } from '../../utils/timeFormat';
import { SubtitleEditor } from './SubtitleEditor';

interface SubtitleListProps {
  subtitles: SubtitleEntry[];
  currentTime: number;
  onSubtitleClick: (time: number) => void;
  onSubtitleUpdate: (subtitle: SubtitleEntry) => void;
}

export function SubtitleList({
  subtitles,
  currentTime,
  onSubtitleClick,
  onSubtitleUpdate,
}: SubtitleListProps) {
  const [editingSubtitle, setEditingSubtitle] = useState<SubtitleEntry | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
        {subtitles.map((subtitle) => {
          const isCurrent = currentTime >= subtitle.startTime && currentTime <= subtitle.endTime;
          
          return (
            <div
              key={subtitle.id}
              className={`group relative p-4 border-b border-gray-100 transition-all duration-200 ${
                isCurrent
                  ? 'bg-indigo-50 hover:bg-indigo-100'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500">#{subtitle.id}</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{formatTimestamp(subtitle.startTime)}</span>
                    <ChevronRight className="w-4 h-4 mx-1" />
                    <span>{formatTimestamp(subtitle.endTime)}</span>
                  </div>
                  <button
                    onClick={() => setEditingSubtitle(subtitle)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-100 rounded-full"
                  >
                    <Edit2 className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => onSubtitleClick(subtitle.startTime)}
              >
                <p className="text-gray-800 leading-relaxed">{subtitle.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {editingSubtitle && (
        <SubtitleEditor
          subtitle={editingSubtitle}
          onSave={(updated) => {
            onSubtitleUpdate(updated);
            setEditingSubtitle(null);
          }}
          onCancel={() => setEditingSubtitle(null)}
        />
      )}
    </div>
  );
}