import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TemplateForm from '../../../components/Templates/TemplateForm';
import { Template } from '../../../types/template';

// Mock template data
const mockTemplate: Template = {
  id: '1',
  title: 'Social Media Campaign',
  description: 'Complete workflow for social media content creation',
  category: 'social-media',
  writingStyle: 'casual',
  stepsCount: 5,
  estimatedTime: '30 mins',
  author: 'Sarah Smith',
  isFavorite: true,
  tags: ['social', 'marketing', 'content'],
  steps: [
    {
      id: '1',
      title: 'Define Target Audience',
      type: 'user_input',
      content: 'Identify and describe your target audience for this campaign.',
      order: 0,
      variables: [],
      output: {
        name: 'audience',
        type: 'text',
        requireUserValidation: false
      }
    },
    {
      id: '2',
      title: 'Content Strategy',
      type: 'ai_prompt',
      content: 'Outline the main message and content strategy.',
      order: 1,
      variables: [],
      output: {
        name: 'strategy',
        type: 'text',
        requireUserValidation: false
      }
    }
  ]
};

const EditTemplate: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [writingStyle, setWritingStyle] = useState('');
  const [steps, setSteps] = useState(mockTemplate.steps);
  const [tags, setTags] = useState<string[]>([]);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from an API
    setTitle(mockTemplate.title);
    setDescription(mockTemplate.description);
    setCategory(mockTemplate.category);
    setWritingStyle(mockTemplate.writingStyle);
    setSteps(mockTemplate.steps);
    setTags(mockTemplate.tags);
  }, [id]);

  const handleAddStep = () => {
    const newStep = {
      id: String(steps.length + 1),
      title: '',
      type: 'ai_prompt' as const,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      alert("Le titre est requis");
      return;
    }

    if (!description.trim()) {
      alert("La description est requise");
      return;
    }

    if (!category) {
      alert("La catégorie est requise");
      return;
    }

    if (!writingStyle) {
      alert("Le style d'écriture est requis");
      return;
    }

    // Validation des étapes
    for (const step of steps) {
      if (!step.title.trim()) {
        alert("Chaque étape doit avoir un titre");
        return;
      }

      if (step.type === 'ai_prompt' && !step.content.trim()) {
        alert("Le contenu du prompt est requis pour les étapes de type AI");
        return;
      }

      if (step.type === 'api_call' && !step.apiAction) {
        alert("La configuration de l'API est requise pour les étapes de type API");
        return;
      }
    }

    try {
      // Template update logic will be implemented here
      console.log({ id, title, description, category, writingStyle, steps, tags });
      setIsDirty(false);
      navigate('/dashboard/templates');
    } catch (error) {
      console.error("Erreur lors de la mise à jour du template:", error);
      alert("Une erreur est survenue lors de la mise à jour du template");
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
      <div className="flex items-center gap-4">
        <button 
          onClick={handleCancel}
          className="btn btn-secondary"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Modifier le Template</h1>
      </div>
      
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
        submitButtonText="Enregistrer les modifications"
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditTemplate;