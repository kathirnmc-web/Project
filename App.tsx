import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ShieldCheck, AlertTriangle } from 'lucide-react';
import { analyzePassword } from './utils/passwordLogic';
import StrengthMeter from './components/StrengthMeter';
import CriteriaList from './components/CriteriaList';
import AIGenerator from './components/AIGenerator';
import { PasswordAnalysis } from './types';

const App: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [analysis, setAnalysis] = useState<PasswordAnalysis | null>(null);

  useEffect(() => {
    setAnalysis(analyzePassword(password));
  }, [password]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex flex-col items-center justify-center p-4 md:p-8">
      
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-3 bg-blue-600/20 rounded-full border border-blue-500/30">
            <ShieldCheck className="text-blue-400" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            ShieldPass AI
          </h1>
        </div>
        <p className="text-slate-400 max-w-md mx-auto">
          Analyze password strength instantly and generate secure, memorable credentials using AI.
        </p>
      </header>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Manual Checker */}
        <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            Test Your Password
          </h2>
          
          <div className="relative mb-2">
            <input
              type={isVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type a password..."
              className="w-full bg-slate-900 border border-slate-600 text-white text-lg px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-600"
            />
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {analysis && (
            <>
              <StrengthMeter analysis={analysis} />
              
              <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                 {analysis.suggestions.length > 0 ? (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                      <AlertTriangle size={14} />
                      Suggestions
                    </h3>
                    <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                      {analysis.suggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <ShieldCheck size={16} />
                    <span>Great job! This password meets all core criteria.</span>
                  </div>
                )}
              </div>

              <CriteriaList criteria={analysis.criteria} />
            </>
          )}
        </div>

        {/* Right Column: AI Generator */}
        <div className="space-y-6">
           <AIGenerator />
           
           {/* Info Card */}
           <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
             <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Security Best Practices</h3>
             <ul className="space-y-3 text-sm text-slate-400">
               <li className="flex gap-2">
                 <span className="text-blue-500">•</span>
                 <span>Avoid using personal information like birthdays or pet names.</span>
               </li>
               <li className="flex gap-2">
                 <span className="text-blue-500">•</span>
                 <span>Use a different password for every important account.</span>
               </li>
               <li className="flex gap-2">
                 <span className="text-blue-500">•</span>
                 <span>Enable Two-Factor Authentication (2FA) whenever possible.</span>
               </li>
                <li className="flex gap-2">
                 <span className="text-blue-500">•</span>
                 <span>Use a password manager to store complex passwords.</span>
               </li>
             </ul>
           </div>
        </div>

      </div>

      <footer className="mt-12 text-slate-500 text-sm text-center">
        <p>© {new Date().getFullYear()} ShieldPass. Analysis happens locally in your browser.</p>
      </footer>
    </div>
  );
};

export default App;
