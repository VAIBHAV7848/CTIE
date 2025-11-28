import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_DATA, MOOD_CONFIG, MoodIcons } from './constants';
import { MoodEntry, MoodType } from './types';
import { TrendsChart } from './components/TrendsChart';
import { MoodModal } from './components/MoodModal';
import { Button } from './components/Button';

// Utility Icons
const MenuIcon = () => (
  <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

function App() {
  const [history, setHistory] = useState<MoodEntry[]>(INITIAL_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  // Set date on mount to avoid hydration mismatch if this were SSR, 
  // but fine here.
  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  }, []);

  const handleLogMood = (mood: MoodType) => {
    // Generate random sleep between 3 and 10 hours for the demo
    const sleepHours = Math.floor(Math.random() * (10 - 3 + 1) + 3);
    
    const today = new Date();
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: today.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
      fullDate: today,
      mood,
      sleepHours
    };

    setHistory(prev => [...prev, newEntry]);
    setIsModalOpen(false);
  };

  // Calculate stats for last 5 check-ins
  const stats = useMemo(() => {
    const recent = history.slice(-5);
    if (recent.length === 0) return { avgMood: 'Neutral', avgSleep: '0' };

    // Sleep Avg
    const totalSleep = recent.reduce((acc, curr) => acc + curr.sleepHours, 0);
    const avgSleepVal = totalSleep / recent.length;
    
    // Mood Avg
    const totalMoodScore = recent.reduce((acc, curr) => acc + MOOD_CONFIG[curr.mood].score, 0);
    const avgMoodScore = Math.round(totalMoodScore / recent.length);
    
    // Find mood enum by score (rough approximation)
    const avgMoodEntry = Object.entries(MOOD_CONFIG).find(([_, config]) => config.score === avgMoodScore);
    const avgMoodLabel = avgMoodEntry ? avgMoodEntry[1].label : 'Neutral';

    return {
      avgSleep: avgSleepVal.toFixed(1),
      avgMood: avgMoodLabel
    };
  }, [history]);

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-slate-800 font-sans p-4 sm:p-8">
      
      {/* Top Navigation */}
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white rounded-xl shadow-sm cursor-pointer hover:bg-gray-50">
            <MenuIcon />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Mood tracker</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex gap-2">
            <button className="p-2 bg-white rounded-full shadow-sm text-slate-400 hover:text-slate-600">
              <SearchIcon />
            </button>
            <button className="p-2 bg-white rounded-full shadow-sm text-slate-400 hover:text-slate-600 relative">
              <BellIcon />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full border-2 border-white"></span>
            </button>
          </div>
          <img 
            src="https://picsum.photos/100/100" 
            alt="User" 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-md object-cover"
          />
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Welcome + Stats */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Welcome Section */}
            <div className="text-center lg:text-left py-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">Hello, Lisa! <span className="inline-block animate-pulse">👋</span></h2>
              <p className="text-xl text-slate-500 mb-2">How are you feeling today?</p>
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-8">{currentDate}</p>
              
              <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto shadow-xl shadow-slate-200/50">
                Log today's mood
              </Button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-6">
              
              {/* Mood KPI */}
              <div className="bg-blue-50 rounded-[2rem] p-8 relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-500">
                      <MoodIcons.Neutral className="w-6 h-6" /> 
                      {/* Ideally dynamic icon based on avg, keeping static for layout match */}
                    </div>
                  </div>
                  <h3 className="text-slate-500 font-medium text-sm uppercase tracking-wide mb-1">Average Mood</h3>
                  <div className="text-3xl font-bold text-slate-800 mb-2">{stats.avgMood}</div>
                  <p className="text-slate-400 text-sm">Same as the previous 5 check-ins</p>
                </div>
              </div>

              {/* Sleep KPI */}
              <div className="bg-slate-800 text-white rounded-[2rem] p-8 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-slate-700 rounded-full -mb-16 -mr-16 opacity-50 group-hover:scale-110 transition-transform"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-slate-700 rounded-2xl shadow-inner text-blue-300">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-slate-400 font-medium text-sm uppercase tracking-wide mb-1">Average Sleep</h3>
                  <div className="text-3xl font-bold mb-2">{Math.floor(Number(stats.avgSleep))} - {Math.ceil(Number(stats.avgSleep))} Hours</div>
                  <p className="text-slate-400 text-sm flex items-center gap-2">
                    <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-bold">+2%</span>
                    Increase from previous
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Chart */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-slate-800">Mood and sleep trends</h3>
                <div className="flex gap-2">
                  <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm font-medium text-slate-600 cursor-pointer hover:bg-gray-100 outline-none">
                    <option>Last 7 Days</option>
                    <option selected>Last 30 Days</option>
                  </select>
                </div>
              </div>
              
              <div className="flex-1 min-h-[400px]">
                <TrendsChart data={history} />
              </div>
            </div>
          </div>

        </div>
      </main>

      <MoodModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleLogMood} 
      />
    </div>
  );
}

export default App;
