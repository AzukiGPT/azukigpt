import React from 'react';
import { Plus } from 'lucide-react';
import { TemplateStep } from '../../types/template';
import DraggableStep from './DraggableStep';

interface TemplateFormProps {
  title: string;
  description: string;
  category: string;
  writingStyle: string;
  steps: TemplateStep[];
  tags: string[];
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onWritingStyleChange: (value: string) => void;
  onStepsChange: (steps: TemplateStep[]) => void;
  onTagsChange: (tags: string[]) => void;
  onAddStep: () => void;
  onRemoveStep: (id: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitButtonText: string;
  onCancel: () => void;
  errors?: any;
}

const TemplateForm: React.FC<TemplateFormProps> = ({
  title,
  description,
  category,
  writingStyle,
  steps,
  tags,
  onTitleChange,
  onDescriptionChange,
  onCategoryChange,
  onWritingStyleChange,
  onStepsChange,
  onTagsChange,
  onAddStep,
  onRemoveStep,
  onSubmit,
  submitButtonText,
  onCancel,
  errors = {}
}) => {
  const [newTag, setNewTag] = React.useState('');

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      onTagsChange([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Section Informations Générales */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b-2 border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Informations Générales</h2>
          <p className="mt-1 text-sm text-gray-500">Définissez les informations de base de votre template</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="form-label">
              Titre du Template
              {errors.title && <span className="text-error ml-1">*</span>}
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className={`form-input ${errors.title ? 'border-error' : ''}`}
              placeholder="Ex: Newsletter Hebdomadaire"
              data-error={errors.title ? true : undefined}
            />
            {errors.title && (
              <p className="form-error">{errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="form-label">
              Description
              {errors.description && <span className="text-error ml-1">*</span>}
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              rows={3}
              className={`form-textarea ${errors.description ? 'border-error' : ''}`}
              placeholder="Décrivez l'objectif et l'utilisation de ce template..."
              data-error={errors.description ? true : undefined}
            />
            {errors.description && (
              <p className="form-error">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="form-label">
                Catégorie
                {errors.category && <span className="text-error ml-1">*</span>}
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className={`form-select ${errors.category ? 'border-error' : ''}`}
                data-error={errors.category ? true : undefined}
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="social-media">Social Media</option>
                <option value="email">Email</option>
                <option value="blog">Blog</option>
                <option value="marketing">Marketing</option>
                <option value="technical">Technical</option>
              </select>
              {errors.category && (
                <p className="form-error">{errors.category}</p>
              )}
            </div>

            <div>
              <label htmlFor="writingStyle" className="form-label">
                Style d'écriture
                {errors.writingStyle && <span className="text-error ml-1">*</span>}
              </label>
              <select
                id="writingStyle"
                value={writingStyle}
                onChange={(e) => onWritingStyleChange(e.target.value)}
                className={`form-select ${errors.writingStyle ? 'border-error' : ''}`}
                data-error={errors.writingStyle ? true : undefined}
              >
                <option value="">Sélectionner un style</option>
                <option value="professional">Professionnel</option>
                <option value="casual">Décontracté</option>
                <option value="technical">Technique</option>
                <option value="creative">Créatif</option>
                <option value="formal">Formel</option>
              </select>
              {errors.writingStyle && (
                <p className="form-error">{errors.writingStyle}</p>
              )}
            </div>
          </div>

          <div>
            <label className="form-label">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="tag-remove"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="form-input"
                placeholder="Ajouter un tag..."
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="btn btn-secondary"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Étapes */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b-2 border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Étapes du Template</h2>
          <p className="mt-1 text-sm text-gray-500">Configurez les différentes étapes de votre template</p>
        </div>
        
        <div className="p-6 space-y-6">
          {steps.map((step, index) => (
            <DraggableStep
              key={step.id}
              step={step}
              index={index}
              previousSteps={steps.slice(0, index)}
              onRemove={onRemoveStep}
              onChange={(id, updatedFields) => {
                const newSteps = steps.map(s =>
                  s.id === id ? { ...s, ...updatedFields } : s
                );
                onStepsChange(newSteps);
              }}
              canRemove={steps.length > 1}
              errors={errors?.steps?.[step.id]}
            />
          ))}
          
          <button
            type="button"
            onClick={onAddStep}
            className="w-full btn btn-secondary border-dashed border-2 hover:border-primary hover:bg-primary/5 group"
          >
            <Plus className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
            Ajouter une étape
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default TemplateForm;