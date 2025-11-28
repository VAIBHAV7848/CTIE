export enum MoodType {
  VeryHappy = 'Very Happy',
  Happy = 'Happy',
  Neutral = 'Neutral',
  Sad = 'Sad',
  VerySad = 'Very Sad',
}

export interface MoodEntry {
  id: string;
  date: string; // Display format e.g., "April 15"
  fullDate: Date; // For sorting if needed
  mood: MoodType;
  sleepHours: number;
}

export interface MoodConfig {
  label: string;
  color: string; // Tailwind class for text/bg
  barColor: string; // Hex for chart
  score: number; // For average calculation (5 = Very Happy, 1 = Very Sad)
}
