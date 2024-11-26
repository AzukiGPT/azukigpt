import React from 'react';
import { AIModelConfig, UserInputConfig } from '../../types/template';
import { Info } from 'lucide-react';

interface AdvancedOptionsProps {
  type: 'ai_prompt' | 'user_input';
  aiConfig?: AIModelConfig;
  userConfig?: UserInputConfig;
  onAIConfigChange: (config: AIModelConfig) => void;
  onUserConfigChange: (config: UserInputConfig) => void;
}

const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({
  type,
  aiConfig,
  userConfig,
  onAIConfigChange,
  onUserConfigChange
}) => {
  if (type === 'ai_prompt') {
    return (
      <div className="space-y-4">
        <div>
          <label className="form-label text-sm">
            Modèle d'IA
          </label>
          <select
            value={aiConfig?.model || 'gpt-4'}
            onChange={(e) => onAIConfigChange({
              ...aiConfig,
              model: e.target.value as AIModelConfig['model']
            })}
            className="form-select text-sm cursor-pointer"
          >
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="claude-2">Claude 2</option>
            <option value="gemini-pro">Gemini Pro</option>
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="form-label text-sm">
              Température
            </label>
            <span className="text-xs text-gray-500">
              ({aiConfig?.temperature || 0.7})
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={aiConfig?.temperature || 0.7}
            onChange={(e) => onAIConfigChange({
              ...aiConfig,
              temperature: parseFloat(e.target.value)
            })}
            className="form-range mt-2"
          />
          <div className="flex items-start gap-2 mt-2 p-2 bg-gray-50 rounded-lg">
            <Info className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600">
              Contrôle la créativité du modèle. Une valeur plus basse donne des réponses plus cohérentes, une valeur plus haute des réponses plus créatives.
            </p>
          </div>
        </div>

        <div>
          <label className="form-label text-sm">
            Nombre maximum de tokens
          </label>
          <input
            type="number"
            min="1"
            max="4000"
            value={aiConfig?.maxTokens || 2000}
            onChange={(e) => onAIConfigChange({
              ...aiConfig,
              maxTokens: parseInt(e.target.value)
            })}
            className="form-input text-sm"
          />
          <p className="form-helper text-xs">
            Limite la longueur de la réponse générée.
          </p>
        </div>
      </div>
    );
  }

  if (type === 'user_input') {
    return (
      <div className="space-y-4">
        <div>
          <label className="form-label text-sm">
            Longueur minimale (caractères)
          </label>
          <div className="relative mt-1">
            <input
              type="number"
              min="0"
              value={userConfig?.minLength || 0}
              onChange={(e) => onUserConfigChange({
                ...userConfig,
                minLength: parseInt(e.target.value)
              })}
              className="form-input text-sm pr-12"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-xs">car.</span>
            </div>
          </div>
        </div>

        <div>
          <label className="form-label text-sm">
            Longueur maximale (caractères)
          </label>
          <div className="relative mt-1">
            <input
              type="number"
              min="0"
              value={userConfig?.maxLength || 0}
              onChange={(e) => onUserConfigChange({
                ...userConfig,
                maxLength: parseInt(e.target.value)
              })}
              className="form-input text-sm pr-12"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-xs">car.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AdvancedOptions;