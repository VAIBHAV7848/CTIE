import React, { useState } from 'react';
import { MoodType } from '../types';
import { Button } from './Button';
import { MoodIcons, MOOD_CONFIG } from '../constants';

interface MoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mood: MoodType) => void;
}

export const MoodModal: React.FC<MoodModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selectedMood) {
      onSubmit(selectedMood);
      setSelectedMood(null); // Reset after submit
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl animate-fade-in-up">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Log your mood</h2>
          <p className="text-slate-500">How are you feeling right now?</p>
        </div>

        {/* Mood Selection Grid */}
        <div className="space-y-3 mb-8">
          {Object.values(MoodType).map((mood) => {
            const Icon = MoodIcons[mood];
            const isSelected = selectedMood === mood;
            const config = MOOD_CONFIG[mood];

            return (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border-2
                  ${isSelected 
                    ? `border-${config.color.split('-')[1]}-400 bg-${config.color.split('-')[1]}-50` 
                    : 'border-transparent hover:bg-slate-50'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${isSelected ? 'bg-white shadow-sm' : 'bg-slate-100'} ${config.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`font-semibold ${isSelected ? 'text-slate-800' : 'text-slate-600'}`}>
                    {config.label}
                  </span>
                </div>
                
                {/* Custom Radio Circle */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${isSelected ? 'border-slate-800' : 'border-slate-200'}`
                }>
                  {isSelected && <div className="w-3 h-3 bg-slate-800 rounded-full" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            fullWidth 
            onClick={handleSubmit} 
            disabled={!selectedMood}
          >
            Continue
          </Button>
          <button 
            onClick={onClose}
            className="w-full py-3 text-slate-400 hover:text-slate-600 font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
