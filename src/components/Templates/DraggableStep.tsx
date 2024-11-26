import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import StepTypeSelector from './StepTypeSelector';
import PromptEditor from './PromptEditor';
import AdvancedOptions from './AdvancedOptions';
import { TemplateStep } from '../../types/template';

interface DraggableStepProps {
  step: TemplateStep;
  index: number;
  previousSteps: TemplateStep[];
  onRemove: (id: string) => void;
  onChange: (id: string, updatedFields: Partial<TemplateStep>) => void;
  canRemove: boolean;
  errors?: any;
}

const DraggableStep: React.FC<DraggableStepProps> = ({
  step,
  index,
  previousSteps,
  onRemove,
  onChange,
  canRemove,
  errors = {}
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex gap-2 items-start bg-white rounded-xl shadow-sm border-2 border-gray-100 overflow-hidden"
    >
      <div className="bg-gray-50 p-2 sm:p-3 border-r-2 border-gray-100">
        <div
          className="flex-shrink-0 text-gray-400 cursor-move hover:text-gray-600 transition-colors"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5" />
        </div>
      </div>
      
      <div className="flex-grow p-4 sm:p-6 space-y-4">
        <div>
          <label className="form-label text-sm">
            Étape {index + 1}
            {errors.title && <span className="text-error ml-1">*</span>}
          </label>
          <input
            type="text"
            value={step.title}
            onChange={(e) => onChange(step.id, { title: e.target.value })}
            className={`form-input text-sm ${errors.title ? 'border-error' : ''}`}
            placeholder="Ex: Définir le sujet principal"
            data-error={errors.title ? true : undefined}
          />
          {errors.title && (
            <p className="form-error text-xs">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="form-label text-sm mb-2">Type d'étape</label>
          <StepTypeSelector
            value={step.type}
            onChange={(type) => onChange(step.id, { type })}
          />
        </div>

        <div>
          <label className="form-label text-sm mb-2">
            {step.type === 'ai_prompt' ? 'Prompt' : 'Instructions'}
            {errors.content && <span className="text-error ml-1">*</span>}
          </label>
          <PromptEditor
            content={step.content}
            variables={step.variables}
            availableVariables={previousSteps.flatMap(s => s.variables.map(v => ({
              ...v,
              stepTitle: s.title
            })))}
            onChange={(content, variables) => onChange(step.id, { content, variables })}
            isUserInput={step.type === 'user_input'}
          />
          {errors.content && (
            <p className="form-error text-xs">{errors.content}</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center text-xs text-gray-600 hover:text-gray-900"
        >
          {showAdvanced ? (
            <ChevronUp className="h-4 w-4 mr-1" />
          ) : (
            <ChevronDown className="h-4 w-4 mr-1" />
          )}
          Options avancées
        </button>

        {showAdvanced && (
          <div className="pt-4 border-t border-gray-200">
            <AdvancedOptions
              type={step.type}
              aiConfig={step.aiConfig}
              userConfig={step.type === 'user_input' ? {
                minLength: 0,
                maxLength: 1000,
                placeholder: ''
              } : undefined}
              onAIConfigChange={(config) => onChange(step.id, { aiConfig: config })}
              onUserConfigChange={(config) => onChange(step.id, { 
                userInputs: step.userInputs?.map(input => ({
                  ...input,
                  config
                }))
              })}
            />
          </div>
        )}
      </div>
      
      {canRemove && (
        <div className="p-2 sm:p-4">
          <button
            type="button"
            onClick={() => onRemove(step.id)}
            className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
            title="Supprimer l'étape"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DraggableStep;