import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';
import { MoodEntry, MoodType } from '../types';
import { MOOD_CONFIG, MoodIcons } from '../constants';

interface TrendsChartProps {
  data: MoodEntry[];
}

// Custom tick renderer for Y-Axis (Sleep ranges)
const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const val = payload.value;
  let label = '';
  
  // Mapping numeric values to the visual ranges requested
  if (val === 0) label = '0-2h';
  else if (val === 3) label = '3-4h';
  else if (val === 5) label = '5-6h';
  else if (val === 7) label = '7-8h';
  else if (val === 9) label = '9+h';
  else return null; // Don't show other ticks

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={4} textAnchor="end" fill="#94a3b8" fontSize={12} fontWeight={500}>
        {label}
      </text>
    </g>
  );
};

// Custom Icon renderer for top of bars
const CustomBarLabel = (props: any) => {
  const { x, y, width, value, index, data } = props;
  if (!data || !data[index]) return null;
  
  const mood = data[index].mood as MoodType;
  const Icon = MoodIcons[mood];
  const color = MOOD_CONFIG[mood].color; // "text-orange-500"

  // Extract tailwind color to hex loosely or just use currentColor
  // For simplicity in SVG context, we apply a class or style
  // But inside SVG foreignObject or direct SVG manipulation is tricky in Recharts
  // Simplest is to render the SVG path directly if possible, or use a foreignObject
  
  return (
    <g transform={`translate(${x + width / 2 - 12},${y - 30})`}>
       <foreignObject width="24" height="24">
          <div className={color}>
            <Icon width="24" height="24" />
          </div>
       </foreignObject>
    </g>
  );
};

export const TrendsChart: React.FC<TrendsChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 40, right: 10, left: 10, bottom: 0 }}
          barSize={40} // Pill width
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            dy={10}
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tick={<CustomYAxisTick />}
            domain={[0, 10]}
            ticks={[0, 3, 5, 7, 9]}
            width={40}
          />

          <Tooltip 
            cursor={{ fill: '#f8fafc' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload as MoodEntry;
                return (
                  <div className="bg-slate-800 text-white p-3 rounded-xl shadow-xl text-sm">
                    <p className="font-semibold mb-1">{item.date}</p>
                    <p>Mood: {item.mood}</p>
                    <p>Sleep: {item.sleepHours} hrs</p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Bar 
            dataKey="sleepHours" 
            radius={[20, 20, 20, 20]} // Pill shape
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={MOOD_CONFIG[entry.mood].barColor} />
            ))}
            <LabelList dataKey="sleepHours" content={<CustomBarLabel data={data} />} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
