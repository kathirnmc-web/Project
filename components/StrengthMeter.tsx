import React from 'react';
import { PasswordAnalysis } from '../types';
import { STRENGTH_COLORS } from '../constants';

interface StrengthMeterProps {
  analysis: PasswordAnalysis;
}

const StrengthMeter: React.FC<StrengthMeterProps> = ({ analysis }) => {
  const { score, label } = analysis;

  return (
    <div className="w-full mt-4 space-y-2">
      <div className="flex justify-between items-end mb-1">
        <span className="text-sm font-medium text-slate-400">Strength</span>
        <span className={`text-sm font-bold ${score < 3 ? 'text-red-400' : score < 4 ? 'text-yellow-400' : 'text-green-400'}`}>
          {label}
        </span>
      </div>
      
      <div className="flex gap-1 h-2 w-full">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-full flex-1 rounded-full transition-all duration-300 ${
              score >= level 
                ? STRENGTH_COLORS[score as keyof typeof STRENGTH_COLORS] 
                : 'bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StrengthMeter;
