import React from 'react';
import { MoodType, MoodConfig } from './types';

// SVG Icons for Moods
export const MoodIcons = {
  [MoodType.VeryHappy]: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  [MoodType.Happy]: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  [MoodType.Neutral]: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="8" y1="15" x2="16" y2="15" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  [MoodType.Sad]: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  [MoodType.VerySad]: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
      <path d="M12 22v-4" /> {/* Tear drop ish */}
    </svg>
  ),
};

export const MOOD_CONFIG: Record<MoodType, MoodConfig> = {
  [MoodType.VeryHappy]: { label: 'Very Happy', color: 'text-orange-500', barColor: '#F97316', score: 5 },
  [MoodType.Happy]: { label: 'Happy', color: 'text-green-500', barColor: '#22C55E', score: 4 },
  [MoodType.Neutral]: { label: 'Neutral', color: 'text-blue-500', barColor: '#3B82F6', score: 3 },
  [MoodType.Sad]: { label: 'Sad', color: 'text-indigo-500', barColor: '#6366F1', score: 2 },
  [MoodType.VerySad]: { label: 'Very Sad', color: 'text-red-500', barColor: '#EF4444', score: 1 },
};

export const INITIAL_DATA = [
  { id: '1', date: 'Mar 31', fullDate: new Date('2024-03-31'), mood: MoodType.VeryHappy, sleepHours: 8 },
  { id: '2', date: 'Apr 02', fullDate: new Date('2024-04-02'), mood: MoodType.Happy, sleepHours: 7 },
  { id: '3', date: 'Apr 04', fullDate: new Date('2024-04-04'), mood: MoodType.Neutral, sleepHours: 6 },
  { id: '4', date: 'Apr 06', fullDate: new Date('2024-04-06'), mood: MoodType.Sad, sleepHours: 5 },
  { id: '5', date: 'Apr 07', fullDate: new Date('2024-04-07'), mood: MoodType.VeryHappy, sleepHours: 9 },
  { id: '6', date: 'Apr 09', fullDate: new Date('2024-04-09'), mood: MoodType.Happy, sleepHours: 7.5 },
  { id: '7', date: 'Apr 10', fullDate: new Date('2024-04-10'), mood: MoodType.Neutral, sleepHours: 6.5 },
  { id: '8', date: 'Apr 12', fullDate: new Date('2024-04-12'), mood: MoodType.VerySad, sleepHours: 4 },
  { id: '9', date: 'Apr 13', fullDate: new Date('2024-04-13'), mood: MoodType.Sad, sleepHours: 5.5 },
  { id: '10', date: 'Apr 14', fullDate: new Date('2024-04-14'), mood: MoodType.Happy, sleepHours: 8 },
  { id: '11', date: 'Apr 15', fullDate: new Date('2024-04-15'), mood: MoodType.VeryHappy, sleepHours: 9 },
];
