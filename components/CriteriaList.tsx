import React from 'react';
import { PasswordCriteria } from '../types';
import { Check, X } from 'lucide-react';

interface CriteriaListProps {
  criteria: PasswordCriteria[];
}

const CriteriaList: React.FC<CriteriaListProps> = ({ criteria }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6">
      {criteria.map((item, index) => (
        <div 
          key={index} 
          className={`flex items-center space-x-2 text-sm transition-colors duration-200 ${
            item.met ? 'text-green-400' : 'text-slate-500'
          }`}
        >
          {item.met ? (
            <Check size={16} className="text-green-400 shrink-0" />
          ) : (
            <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
          )}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CriteriaList;
