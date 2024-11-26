import React from 'react';
import { StepOutput, ValidationRule, StepType } from '../../types/template';
import { Plus, Trash2, AlertCircle } from 'lucide-react';

interface OutputConfigurationProps {
  value: StepOutput;
  onChange: (output: StepOutput) => void;
  stepType: StepType;
}

const OutputConfiguration: React.FC<OutputConfigurationProps> = ({
  value,
  onChange,
  stepType
}) => {
  const handleAddValidationRule = () => {
    const newRule: ValidationRule = {
      type: 'required',
      message: ''
    };
    onChange({
      ...value,
      validation: [...(value.validation || []), newRule]
    });
  };

  const handleRemoveValidationRule = (index: number) => {
    const newValidation = value.validation?.filter((_, i) => i !== index);
    onChange({
      ...value,
      validation: newValidation
    });
  };

  const showValidation = stepType === 'ai_prompt' || stepType === 'api_call';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Format de sortie
          </label>
          <select
            value={value.type}
            onChange={(e) => onChange({ ...value, type: e.target.value as any })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="text">Texte</option>
            <option value="json">JSON</option>
            <option value="array">Array</option>
          </select>
          <p className="mt-1 text-sm text-gray-500">
            Définit le format attendu pour la sortie de cette étape
          </p>
        </div>

        {showValidation && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Validation utilisateur
            </label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={value.requireUserValidation}
                  onChange={(e) => onChange({
                    ...value,
                    requireUserValidation: e.target.checked
                  })}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-900">
                  Nécessite une validation utilisateur
                </span>
              </label>
              {value.requireUserValidation && (
                <textarea
                  value={value.validationInstructions || ''}
                  onChange={(e) => onChange({
                    ...value,
                    validationInstructions: e.target.value
                  })}
                  placeholder="Instructions pour l'utilisateur lors de la validation..."
                  rows={2}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                />
              )}
            </div>
          </div>
        )}
      </div>

      {value.type === 'json' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Structure JSON attendue
          </label>
          <div className="relative">
            <textarea
              value={value.format || ''}
              onChange={(e) => onChange({ ...value, format: e.target.value })}
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono text-sm"
              placeholder="{\n  'field': 'type'\n}"
            />
            <div className="absolute top-2 right-2">
              <AlertCircle className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Définissez la structure JSON attendue pour valider le format de sortie
          </p>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Règles de validation
          </label>
          <button
            type="button"
            onClick={handleAddValidationRule}
            className="inline-flex items-center px-2 py-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Ajouter une règle
          </button>
        </div>
        
        <div className="space-y-3">
          {value.validation?.map((rule, index) => (
            <div 
              key={index} 
              className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <select
                value={rule.type}
                onChange={(e) => {
                  const newValidation = value.validation?.map((r, i) =>
                    i === index ? { ...r, type: e.target.value as any } : r
                  );
                  onChange({ ...value, validation: newValidation });
                }}
                className="block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
              >
                <option value="required">Requis</option>
                <option value="min_length">Longueur min</option>
                <option value="max_length">Longueur max</option>
                <option value="regex">Regex</option>
                <option value="custom">Custom</option>
              </select>

              {rule.type !== 'required' && (
                <input
                  type="text"
                  value={rule.value || ''}
                  onChange={(e) => {
                    const newValidation = value.validation?.map((r, i) =>
                      i === index ? { ...r, value: e.target.value } : r
                    );
                    onChange({ ...value, validation: newValidation });
                  }}
                  placeholder="Valeur"
                  className="block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                />
              )}

              <input
                type="text"
                value={rule.message}
                onChange={(e) => {
                  const newValidation = value.validation?.map((r, i) =>
                    i === index ? { ...r, message: e.target.value } : r
                  );
                  onChange({ ...value, validation: newValidation });
                }}
                placeholder="Message d'erreur"
                className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
              />

              <button
                type="button"
                onClick={() => handleRemoveValidationRule(index)}
                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-md transition-colors"
                title="Supprimer la règle"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          {(!value.validation || value.validation.length === 0) && (
            <div className="text-center py-4 text-sm text-gray-500">
              Aucune règle de validation définie
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutputConfiguration;