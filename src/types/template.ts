export type StepType = 'ai_prompt' | 'user_input';

export interface AIModelConfig {
  model: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-2' | 'gemini-pro';
  temperature?: number;
  maxTokens?: number;
}

export interface UserInputConfig {
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
}

export interface UserInputField {
  id: string;
  title: string;
  description?: string;
  required: boolean;
  variables: TemplateVariable[];
  config?: UserInputConfig;
}

export interface TemplateStep {
  id: string;
  title: string;
  type: StepType;
  description?: string;
  content: string;
  order: number;
  variables: TemplateVariable[];
  userInputs?: UserInputField[];
  aiConfig?: AIModelConfig;
  output?: {
    content: string;
    validated: boolean;
  };
  helpText?: string;
  examples?: string[];
  contextualNotes?: string;
  validationRules?: ValidationRule[];
}

export interface TemplateVariable {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'boolean';
  source: 'previous_step' | 'company_asset' | 'company_data';
  sourceId: string;
  required: boolean;
  description?: string;
  defaultValue?: string | number | boolean;
  options?: string[];
}

export interface ValidationRule {
  type: 'required' | 'min_length' | 'max_length' | 'regex' | 'custom';
  value?: string | number;
  message: string;
}