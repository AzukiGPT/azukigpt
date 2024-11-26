import React from 'react';
import { Bot, User } from 'lucide-react';
import { StepType } from '../../types/template';

interface StepTypeSelectorProps {
  value: StepType;
  onChange: (type: StepType) => void;
}

const StepTypeSelector: React.FC<StepTypeSelectorProps> = ({ value, onChange }) => {
  const types = [
    {
      type: 'ai_prompt' as StepType,
      icon: Bot,
      label: 'Prompt AI',
      description: 'Générer du contenu avec l\'IA'
    },
    {
      type: 'user_input' as StepType,
      icon: User,
      label: 'Input(s) Utilisateur',
      description: 'Demander des informations'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {types.map(({ type, icon: Icon, label, description }) => (
        <button
          key={type}
          type="button"
          onClick={() => onChange(type)}
          className={`
            flex items-start gap-3 p-4 border-2 rounded-xl text-left 
            transition-all duration-200 hover:shadow-md 
            ${value === type 
              ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-lg shadow-primary/10'
              : 'border-gray-100 hover:border-primary/20 hover:bg-gray-50'
            }
          `}
        >
          <Icon 
            className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
              value === type 
                ? 'text-primary' 
                : 'text-gray-400 group-hover:text-primary/60'
            }`} 
          />
          <div>
            <h3 className={`text-sm font-medium ${
              value === type 
                ? 'text-primary' 
                : 'text-gray-900 group-hover:text-primary/80'
            }`}>
              {label}
            </h3>
            <p className="mt-0.5 text-xs text-gray-500">{description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default StepTypeSelector;