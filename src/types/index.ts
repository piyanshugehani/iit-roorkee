export interface SubtitleEntry {
  id: number;
  startTime: number;
  endTime: number;
  text: string;
}

export interface VideoState {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
}