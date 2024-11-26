import React from 'react';
import { Link, HelpCircle } from 'lucide-react';

interface InputProps {
  name: string;
  label: string;
  type: 'text' | 'url' | 'number' | 'select';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  description?: string;
  helpText?: string;
  examples?: string[];
  error?: string;
  required?: boolean;
}

const StepInput: React.FC<InputProps> = ({
  name,
  label,
  type,
  value,
  onChange,
  placeholder,
  description,
  helpText,
  examples,
  error,
  required
}) => {
  const [showHelp, setShowHelp] = React.useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {(helpText || examples) && (
          <button
            type="button"
            onClick={() => setShowHelp(!showHelp)}
            className="text-gray-400 hover:text-gray-500"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        )}
      </div>

      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}

      <div className="mt-1 relative rounded-md shadow-sm">
        {type === 'url' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Link className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        {type === 'select' ? (
          <select
            id={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              error ? 'border-red-300' : 'border-gray-300'
            } ${type === 'url' ? 'pl-10' : ''}`}
          >
            <option value="">Sélectionnez une option</option>
            {examples?.map((example, index) => (
              <option key={index} value={example}>
                {example}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            id={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              error ? 'border-red-300' : 'border-gray-300'
            } ${type === 'url' ? 'pl-10' : ''}`}
            placeholder={placeholder}
          />
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}

      {showHelp && (helpText || examples) && (
        <div className="mt-2 p-4 bg-gray-50 rounded-md">
          {helpText && (
            <p className="text-sm text-gray-600 mb-2">{helpText}</p>
          )}
          {examples && examples.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700">Exemples :</p>
              <ul className="mt-1 list-disc list-inside space-y-1">
                {examples.map((example, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StepInput;