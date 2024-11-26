import React, { useState } from 'react';
import { Play, Copy, Check } from 'lucide-react';
import type { TemplateStep } from '../../types/template';
import PromptEditor from './PromptEditor';
import StepHelpContent from './StepHelpContent';

interface StepEditorProps {
  step: TemplateStep;
  previousSteps: TemplateStep[];
  onChange: (updatedStep: Partial<TemplateStep>) => void;
  onValidateStep: () => void;
  isTemplateUsage?: boolean;
}

const StepEditor: React.FC<StepEditorProps> = ({
  step,
  previousSteps,
  onChange,
  onValidateStep,
  isTemplateUsage = false
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock output based on step type
      const mockOutput = `Voici un exemple de contenu généré pour l'étape "${step.title}".\n\n` +
        `Ce contenu est généré à partir des inputs fournis et du contexte du template.\n\n` +
        `Dans une vraie implémentation, ce contenu serait généré via une requête à l'API backend ` +
        `qui utiliserait les variables et le prompt pour construire une réponse pertinente.`;
      
      setOutput(mockOutput);
      setShowOutput(true);
    } catch (error) {
      console.error('Error generating output:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  const handleEdit = () => {
    setShowOutput(false);
  };

  const handleValidate = () => {
    onChange({ output: { content: output, validated: true } });
    onValidateStep();
  };

  const handlePromptChange = (content: string, variables: any[]) => {
    onChange({ content, variables });
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-900">{step.title}</h3>
          {step.description && (
            <p className="mt-1 text-sm text-gray-500">{step.description}</p>
          )}
        </div>
        
        <div className="p-4">
          {/* Use PromptEditor for both AI prompts and user inputs */}
          <PromptEditor
            content={step.content}
            variables={step.variables}
            availableVariables={[
              ...previousSteps.flatMap(s => s.variables.map(v => ({
                ...v,
                stepTitle: s.title
              }))),
              // Add any other available variables here
            ]}
            onChange={handlePromptChange}
            isUserInput={step.type === 'user_input'}
            isTemplateUsage={isTemplateUsage}
          />

          {/* Help Content */}
          {(step.helpText || step.examples || step.contextualNotes) && (
            <div className="mt-4">
              <StepHelpContent
                title={step.title}
                helpText={step.helpText}
                examples={step.examples}
                contextualNotes={step.contextualNotes}
              />
            </div>
          )}
        </div>

        <div className="px-4 py-3 bg-gray-50 text-right">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn btn-primary"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Génération...
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" />
                {step.type === 'user_input' ? 'Valider' : 'Générer'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Output Section */}
      {showOutput && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-900">Résultat généré</h3>
            <button
              onClick={handleCopyOutput}
              className="text-gray-500 hover:text-gray-700"
              title="Copier le contenu"
            >
              {copied ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </button>
          </div>
          
          <div className="p-4">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-gray-50 rounded-lg p-4">
              {output}
            </pre>
          </div>

          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between">
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="btn btn-secondary"
              >
                Modifier
              </button>
              <button
                onClick={handleRegenerate}
                className="btn btn-secondary"
              >
                Régénérer
              </button>
            </div>
            <button
              onClick={handleValidate}
              className="btn btn-primary"
            >
              Valider et continuer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepEditor;