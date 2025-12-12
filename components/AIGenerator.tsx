import React, { useState } from 'react';
import { generateCreativePasswords } from '../services/geminiService';
import { AIPasswordSuggestion } from '../types';
import { Sparkles, Loader2, Copy, RefreshCw } from 'lucide-react';

const AIGenerator: React.FC = () => {
  const [theme, setTheme] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AIPasswordSuggestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!theme.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const results = await generateCreativePasswords(theme);
      setSuggestions(results);
    } catch (err) {
      setError("Failed to connect to AI service. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-purple-400" size={20} />
        <h2 className="text-lg font-semibold text-white">AI Memorable Password Generator</h2>
      </div>
      
      <p className="text-slate-400 text-sm mb-4">
        Enter a word or theme (e.g., "Summer 2024", "Coffee", "Star Wars") and Gemini will create strong, memorable passwords for you.
      </p>

      <div className="flex gap-2 mb-6">
        <input 
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Enter a theme..."
          className="flex-1 bg-slate-900 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-slate-600"
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading || !theme.trim()}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
          Generate
        </button>
      </div>

      {error && <div className="text-red-400 text-sm mb-4">{error}</div>}

      <div className="space-y-3">
        {suggestions.map((suggestion, idx) => (
          <div key={idx} className="bg-slate-900/80 p-4 rounded-lg border border-slate-700 group hover:border-purple-500/50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div className="font-mono text-lg text-purple-200 font-bold tracking-wider break-all">
                {suggestion.password}
              </div>
              <button 
                onClick={() => copyToClipboard(suggestion.password)}
                className="text-slate-500 hover:text-white transition-colors p-1"
                title="Copy to clipboard"
              >
                <Copy size={16} />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-green-900/30 text-green-400 border border-green-800/50">
                {suggestion.strength}
              </span>
            </div>
            <p className="text-xs text-slate-400">{suggestion.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIGenerator;
