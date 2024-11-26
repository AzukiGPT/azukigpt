import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, FileText, Image, Video, Mail, 
  MessageSquare, Calendar, Tag, Plus, 
  Folder, Building2
} from 'lucide-react';

interface AssetForm {
  title: string;
  type: 'article' | 'image' | 'video' | 'email' | 'social' | 'document';
  content: string;
  folder: string;
  tags: string[];
  campaign?: string;
  template?: string;
}

const NewAsset = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AssetForm>({
    title: '',
    type: 'article',
    content: '',
    folder: '',
    tags: [],
    campaign: '',
    template: ''
  });

  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      alert('Le titre est requis');
      return;
    }

    if (!formData.content.trim()) {
      alert('Le contenu est requis');
      return;
    }

    if (!formData.folder) {
      alert('Le dossier est requis');
      return;
    }

    // Save asset logic here
    console.log('Saving asset:', formData);
    navigate('/dashboard/assets');
  };

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard/assets')}
            className="btn btn-secondary"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Nouvel Asset</h1>
            <p className="mt-1 text-sm text-gray-500">Créez un nouvel asset pour votre bibliothèque de contenu</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Type Selection */}
        <div className="card">
          <h2 className="card-title mb-4">Type d'asset</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { value: 'article', icon: FileText, label: 'Article' },
              { value: 'image', icon: Image, label: 'Image' },
              { value: 'video', icon: Video, label: 'Vidéo' },
              { value: 'email', icon: Mail, label: 'Email' },
              { value: 'social', icon: MessageSquare, label: 'Social' },
              { value: 'document', icon: FileText, label: 'Document' }
            ].map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFormData({ ...formData, type: value as AssetForm['type'] })}
                className={`p-6 border-2 rounded-xl text-left transition-all duration-200 
                  ${formData.type === value 
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-lg shadow-primary/10'
                    : 'border-gray-100 hover:border-primary/20 hover:bg-gray-50'
                  }`}
              >
                <Icon className={`h-6 w-6 ${
                  formData.type === value ? 'text-primary' : 'text-gray-400'
                }`} />
                <span className={`block mt-2 text-sm font-medium ${
                  formData.type === value ? 'text-primary' : 'text-gray-900'
                }`}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Information */}
        <div className="card">
          <h2 className="card-title mb-6">Informations générales</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="form-label">Titre</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-input"
                placeholder="Ex: Newsletter Mensuelle - Janvier 2024"
              />
            </div>

            <div>
              <label htmlFor="content" className="form-label">Contenu</label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                className="form-textarea"
                placeholder="Contenu de votre asset..."
              />
            </div>
          </div>
        </div>

        {/* Organization */}
        <div className="card">
          <h2 className="card-title mb-6">Organisation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="folder" className="form-label">
                <Folder className="h-4 w-4 inline-block mr-2" />
                Dossier
              </label>
              <select
                id="folder"
                value={formData.folder}
                onChange={(e) => setFormData({ ...formData, folder: e.target.value })}
                className="form-select"
              >
                <option value="">Sélectionner un dossier</option>
                <option value="Blog">Blog</option>
                <option value="Newsletters">Newsletters</option>
                <option value="Social Media">Social Media</option>
                <option value="Campagnes">Campagnes</option>
              </select>
            </div>

            <div>
              <label htmlFor="campaign" className="form-label">
                <Calendar className="h-4 w-4 inline-block mr-2" />
                Campagne (optionnel)
              </label>
              <select
                id="campaign"
                value={formData.campaign}
                onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
                className="form-select"
              >
                <option value="">Sélectionner une campagne</option>
                <option value="Q1 2024">Q1 2024</option>
                <option value="Q2 2024">Q2 2024</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="form-label">
              <Tag className="h-4 w-4 inline-block mr-2" />
              Tags
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
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
            <div className="mt-2 flex gap-2">
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

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard/assets')}
            className="btn btn-secondary"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Créer l'asset
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewAsset;