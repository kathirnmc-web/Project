export interface PasswordCriteria {
  label: string;
  met: boolean;
}

export type StrengthLabel = "Very Weak" | "Weak" | "Medium" | "Strong" | "Very Strong";

export interface PasswordAnalysis {
  score: number; // 0 to 5
  label: StrengthLabel;
  criteria: PasswordCriteria[];
  suggestions: string[];
}

export interface AIPasswordSuggestion {
  password: string;
  explanation: string;
  strength: string;
}
