import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import TemplateForm from '../../../components/Templates/TemplateForm';
import TemplatePreview from '../../../components/Templates/TemplatePreview';
import { TemplateStep } from '../../../types/template';

interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  writingStyle?: string;
  steps?: {
    [key: string]: {
      title?: string;
      content?: string;
      userInputs?: {
        [key: string]: {
          title?: string;
          description?: string;
        };
      };
    };
  };
}

const CreateTemplate: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [writingStyle, setWritingStyle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [steps, setSteps] = useState<TemplateStep[]>([{
    id: '1',
    title: '',
    type: 'ai_prompt',
    content: '',
    order: 0,
    variables: [],
    output: {
      name: 'output',
      type: 'text',
      requireUserValidation: false
    }
  }]);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Validation des champs de base
    if (!title.trim()) {
      newErrors.title = "Le titre est requis";
    }
    if (!description.trim()) {
      newErrors.description = "La description est requise";
    }
    if (!category) {
      newErrors.category = "La catégorie est requise";
    }
    if (!writingStyle) {
      newErrors.writingStyle = "Le style d'écriture est requis";
    }

    // Validation des étapes
    const stepErrors: FormErrors['steps'] = {};
    steps.forEach((step, index) => {
      const stepError: any = {};

      if (!step.title.trim()) {
        stepError.title = "Le titre de l'étape est requis";
      }

      if (step.type === 'ai_prompt' && !step.content.trim()) {
        stepError.content = "Le contenu du prompt est requis";
      }

      if (step.type === 'user_input' && step.userInputs) {
        const userInputErrors: any = {};
        step.userInputs.forEach((input, inputIndex) => {
          if (input.required) {
            if (!input.title.trim()) {
              userInputErrors[inputIndex] = {
                title: "Le titre du champ est requis"
              };
            }
          }
        });
        if (Object.keys(userInputErrors).length > 0) {
          stepError.userInputs = userInputErrors;
        }
      }

      if (Object.keys(stepError).length > 0) {
        stepErrors[step.id] = stepError;
      }
    });

    if (Object.keys(stepErrors).length > 0) {
      newErrors.steps = stepErrors;
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Template creation logic will be implemented here
        console.log({ title, description, category, writingStyle, steps, tags });
        setIsDirty(false);
        navigate('/dashboard/templates');
      } catch (error) {
        console.error("Erreur lors de la création du template:", error);
        alert("Une erreur est survenue lors de la création du template");
      }
    } else {
      // Scroll to first error
      const firstErrorElement = document.querySelector('[data-error]');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleAddStep = () => {
    const newStep: TemplateStep = {
      id: String(steps.length + 1),
      title: '',
      type: 'ai_prompt',
      content: '',
      order: steps.length,
      variables: [],
      output: {
        name: 'output',
        type: 'text',
        requireUserValidation: false
      }
    };
    setSteps([...steps, newStep]);
    setIsDirty(true);
  };

  const handleRemoveStep = (stepId: string) => {
    if (steps.length > 1) {
      setSteps(steps.filter(step => step.id !== stepId));
      setIsDirty(true);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      const confirm = window.confirm("Voulez-vous vraiment annuler ? Toutes les modifications seront perdues.");
      if (!confirm) return;
    }
    navigate('/dashboard/templates');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Créer un Template</h1>
        </div>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="btn btn-secondary"
        >
          {showPreview ? (
            <>
              <EyeOff className="h-5 w-5 mr-2" />
              Masquer la prévisualisation
            </>
          ) : (
            <>
              <Eye className="h-5 w-5 mr-2" />
              Prévisualiser
            </>
          )}
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <TemplateForm
            title={title}
            description={description}
            category={category}
            writingStyle={writingStyle}
            steps={steps}
            tags={tags}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onCategoryChange={setCategory}
            onWritingStyleChange={setWritingStyle}
            onStepsChange={setSteps}
            onTagsChange={setTags}
            onAddStep={handleAddStep}
            onRemoveStep={handleRemoveStep}
            onSubmit={handleSubmit}
            submitButtonText="Créer le Template"
            onCancel={handleCancel}
            errors={showErrors ? errors : {}}
          />
        </div>

        {showPreview && (
          <div className="lg:sticky lg:top-6 space-y-6">
            <TemplatePreview
              title={title}
              description={description}
              category={category}
              writingStyle={writingStyle}
              steps={steps}
              tags={tags}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTemplate;