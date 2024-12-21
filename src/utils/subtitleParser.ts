export function parseSubRipTime(timeString: string): number {
  const [hours, minutes, seconds, milliseconds] = timeString
    .replace(',', '.')
    .split(/[:.]/);
  
  return (
    parseInt(hours) * 3600 +
    parseInt(minutes) * 60 +
    parseInt(seconds) +
    parseFloat(`0.${milliseconds}`)
  );
}

export function formatTime(seconds: number): string {
  const pad = (num: number) => num.toString().padStart(2, '0');
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)},${ms.toString().padStart(3, '0')}`;
}

export function parseSubRip(content: string): SubtitleEntry[] {
  const blocks = content.trim().split(/\n\s*\n/);
  return blocks.map((block, index) => {
    const lines = block.trim().split('\n');
    const [timeRange] = lines.slice(1, 2);
    const [startTime, endTime] = timeRange.split(' --> ').map(parseSubRipTime);
    const text = lines.slice(2).join('\n');
    
    return {
      id: index + 1,
      startTime,
      endTime,
      text,
    };
  });
}

export function generateSubRip(subtitles: SubtitleEntry[]): string {
  return subtitles
    .map(
      (sub) =>
        `${sub.id}\n${formatTime(sub.startTime)} --> ${formatTime(
          sub.endTime
        )}\n${sub.text}`
    )
    .join('\n\n');
}