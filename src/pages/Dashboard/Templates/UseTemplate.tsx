import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ChevronLeft, Bot, User, Globe, Save } from 'lucide-react';
import type { Template, TemplateStep } from '../../../types/template';
import StepEditor from '../../../components/Templates/StepEditor';

interface StepOutput {
  content: string;
  validated: boolean;
}

const UseTemplate: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [template, setTemplate] = useState<Template | null>(null);
  const [stepOutputs, setStepOutputs] = useState<Record<string, StepOutput>>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [finalContent, setFinalContent] = useState('');

  useEffect(() => {
    // Simuler le chargement du template
    const mockTemplate: Template = {
      id: '1',
      title: 'Statistiques Post LinkedIn',
      description: 'Récupérer et analyser les statistiques d\'engagement d\'un post LinkedIn',
      category: 'social-media',
      writingStyle: 'professional',
      stepsCount: 3,
      estimatedTime: '5 mins',
      author: 'Sarah Smith',
      isFavorite: true,
      tags: ['linkedin', 'analytics', 'engagement'],
      steps: [
        {
          id: 'step-1',
          title: 'URL du post LinkedIn',
          type: 'user_input',
          description: 'Entrez l\'URL du post LinkedIn dont vous souhaitez analyser les statistiques',
          content: '',
          order: 0,
          variables: [],
          helpText: 'Vous pouvez trouver l\'URL en cliquant sur les trois points du post et en sélectionnant "Copier le lien du post"',
          examples: [
            'https://www.linkedin.com/posts/johndoe_marketing-innovation-digital-activity-123456789',
            'https://www.linkedin.com/company/company-name/posts/123456789'
          ],
          contextualNotes: 'Assurez-vous d\'avoir les droits d\'accès aux statistiques du post',
          requiredInputs: [
            {
              name: 'postUrl',
              label: 'URL du post',
              type: 'url',
              placeholder: 'https://www.linkedin.com/posts/...',
              description: 'L\'URL complète du post LinkedIn',
              helpText: 'Copiez l\'URL directement depuis LinkedIn pour éviter les erreurs',
              validation: [
                {
                  type: 'required',
                  message: 'L\'URL du post est requise'
                },
                {
                  type: 'regex',
                  value: '^https://www\\.linkedin\\.com/.*',
                  message: 'L\'URL doit être une URL LinkedIn valide'
                }
              ]
            }
          ]
        }
      ]
    };
    setTemplate(mockTemplate);
  }, [id]);

  const currentStep = template?.steps?.[currentStepIndex];
  const previousSteps = template?.steps?.slice(0, currentStepIndex) || [];

  const handleStepChange = (stepId: string, updatedFields: Partial<TemplateStep>) => {
    if (!template) return;

    const newSteps = template.steps?.map(step =>
      step.id === stepId ? { ...step, ...updatedFields } : step
    );

    setTemplate({
      ...template,
      steps: newSteps
    });
  };

  const handleValidateStep = () => {
    if (!currentStep) return;

    // Combine all outputs to create final content
    const allOutputs = Object.values(stepOutputs)
      .map(output => output.content)
      .join('\n\n');
    
    setFinalContent(allOutputs);

    // Move to next step or preview mode
    if (currentStepIndex < (template?.steps?.length || 0) - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsPreviewMode(true);
    }
  };

  const handleSaveAsset = async (assetData: any) => {
    try {
      // Save asset logic will be implemented here
      console.log('Saving asset:', assetData);
      navigate('/dashboard/assets');
    } catch (error) {
      console.error('Error saving asset:', error);
    }
  };

  if (!template) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Chargement...</div>
      </div>
    );
  }

  const StepIcon = currentStep?.type === 'ai_prompt' ? Bot :
                   currentStep?.type === 'user_input' ? User :
                   Globe;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard/templates')}
            className="btn btn-secondary"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{template.title}</h1>
            <p className="text-sm text-gray-500">{template.description}</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            {template.steps?.map((step, index) => (
              <div 
                key={step.id}
                className={`flex-1 ${index !== template.steps!.length - 1 ? 'relative' : ''}`}
              >
                <div className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-full 
                    ${index < currentStepIndex ? 'bg-green-100 text-green-600' :
                      index === currentStepIndex ? 'bg-indigo-100 text-indigo-600' :
                      'bg-gray-100 text-gray-400'}
                  `}>
                    {React.createElement(
                      step.type === 'ai_prompt' ? Bot :
                      step.type === 'user_input' ? User :
                      Globe,
                      { className: "h-5 w-5" }
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      index === currentStepIndex ? 'text-indigo-600' :
                      index < currentStepIndex ? 'text-green-600' :
                      'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                </div>
                {index !== template.steps!.length - 1 && (
                  <div className={`absolute top-4 w-full h-0.5 ${
                    index < currentStepIndex ? 'bg-green-100' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {currentStep && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <StepIcon className="h-6 w-6 text-indigo-600" />
                  <h2 className="text-lg font-medium text-gray-900">
                    {currentStep.title}
                  </h2>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Étape {currentStepIndex + 1} sur {template.steps?.length}
                </span>
              </div>

              <StepEditor
                step={currentStep}
                previousSteps={previousSteps}
                onChange={(updatedFields) => handleStepChange(currentStep.id, updatedFields)}
                onValidateStep={handleValidateStep}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UseTemplate;