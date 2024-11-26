import React from 'react';
import { AlertCircle, HelpCircle, Lightbulb } from 'lucide-react';

interface StepHelpContentProps {
  title: string;
  description?: string;
  helpText?: string;
  examples?: string[];
  contextualNotes?: string;
}

const StepHelpContent: React.FC<StepHelpContentProps> = ({
  title,
  description,
  helpText,
  examples,
  contextualNotes
}) => {
  return (
    <div className="space-y-4">
      {description && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">{description}</p>
            </div>
          </div>
        </div>
      )}

      {helpText && (
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <HelpCircle className="h-5 w-5 text-gray-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">{helpText}</p>
            </div>
          </div>
        </div>
      )}

      {examples && examples.length > 0 && (
        <div className="bg-green-50 border border-green-100 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Lightbulb className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-green-800">Exemples</h4>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {examples.map((example, index) => (
                  <li key={index} className="text-sm text-green-700">
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {contextualNotes && (
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{contextualNotes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepHelpContent;