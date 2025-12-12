import { PasswordAnalysis, StrengthLabel } from '../types';
import { STRENGTH_LABELS } from '../constants';

export const analyzePassword = (password: string): PasswordAnalysis => {
  const criteria = [
    { label: "Minimum 8 characters", met: password.length >= 8 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains number", met: /[0-9]/.test(password) },
    { label: "Contains special character (!@#$)", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const metCount = criteria.filter(c => c.met).length;
  
  // Basic scoring: purely based on the checklist
  let score = metCount;
  
  // Edge case: If password is empty, score is 0
  if (password.length === 0) score = 0;

  const label = STRENGTH_LABELS[score as keyof typeof STRENGTH_LABELS] as StrengthLabel;

  const suggestions: string[] = [];
  if (!criteria[0].met) suggestions.push("Add more characters to reach at least 8.");
  if (!criteria[1].met) suggestions.push("Add an uppercase letter.");
  if (!criteria[2].met) suggestions.push("Add a lowercase letter.");
  if (!criteria[3].met) suggestions.push("Include at least one number.");
  if (!criteria[4].met) suggestions.push("Use a special character (e.g., !, @, #, $).");

  return {
    score,
    label,
    criteria,
    suggestions
  };
};
