// ... imports existants ...

const SaveTemplateOutput: React.FC<SaveTemplateOutputProps> = ({
  templateId,
  templateName,
  content,
  onSave,
  onCancel
}) => {
  // ... state existant ...

  return (
    <div className="space-y-6">
      {/* Template Info */}
      <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
          <FileText className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-indigo-900">Créé depuis le template</h3>
          <p className="text-sm text-indigo-700">{templateName}</p>
        </div>
      </div>

      {/* Tabs pour organiser les champs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className="border-indigo-500 text-indigo-600 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
          >
            Informations générales
          </button>
          <button
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
          >
            Workflow & Révision
          </button>
          <button
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
          >
            KPIs & Métriques
          </button>
        </nav>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations générales */}
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Titre de l'asset
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Ex: Statistiques LinkedIn - Post Produit A"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type de contenu
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="document">Document</option>
              <option value="social">Social Media</option>
              <option value="email">Email</option>
              <option value="article">Article</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dossier
            </label>
            <select
              value={formData.folder}
              onChange={(e) => setFormData({ ...formData, folder: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Sélectionner un dossier</option>
              <option value="Analytics">Analytics</option>
              <option value="Social Media">Social Media</option>
              <option value="Campagnes">Campagnes</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Une brève description du contenu et de son objectif..."
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-gray-400 hover:text-gray-500"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Ajouter un tag..."
              />
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end gap-4 pt-4 border-t">
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
            <Save className="h-5 w-5 mr-2" />
            Sauvegarder l'asset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SaveTemplateOutput;