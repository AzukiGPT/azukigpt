import React, { useState } from 'react';
import { Plus, Pencil, Trash2, PenTool } from 'lucide-react';

interface WritingStyle {
  id: string;
  name: string;
  description: string;
  tone: string;
  formality: 'formal' | 'semi-formal' | 'casual';
  vocabulary: string[];
  examples: string[];
  dosList: string[];
  dontsList: string[];
}

const mockStyles: WritingStyle[] = [
  {
    id: '1',
    name: 'Professionnel Expert',
    description: 'Ton autoritaire et expert pour établir la crédibilité',
    tone: 'Confiant et analytique',
    formality: 'formal',
    vocabulary: [
      'Expertise',
      'Innovation',
      'Performance',
      'Optimisation'
    ],
    examples: [
      'Notre analyse approfondie révèle...',
      'Les données démontrent que...'
    ],
    dosList: [
      'Utiliser des termes techniques précis',
      'Citer des sources fiables',
      'Fournir des données concrètes'
    ],
    dontsList: [
      'Éviter le jargon inutile',
      'Ne pas faire de promesses exagérées',
      'Éviter le langage familier'
    ]
  }
];

const WritingStyles = () => {
  const [styles, setStyles] = useState<WritingStyle[]>(mockStyles);
  const [showForm, setShowForm] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<WritingStyle | null>(null);

  const handleAddStyle = () => {
    setSelectedStyle(null);
    setShowForm(true);
  };

  const handleEditStyle = (style: WritingStyle) => {
    setSelectedStyle(style);
    setShowForm(true);
  };

  const handleDeleteStyle = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce style d\'écriture ?')) {
      setStyles(styles.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {!showForm ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Styles d'écriture</h2>
              <p className="text-sm text-gray-500">
                Définissez et gérez vos différents styles de communication
              </p>
            </div>
            <button
              onClick={handleAddStyle}
              className="btn btn-primary"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nouveau style
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {styles.map((style) => (
              <div
                key={style.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <PenTool className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {style.name}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          style.formality === 'formal'
                            ? 'bg-blue-100 text-blue-800'
                            : style.formality === 'semi-formal'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {style.formality === 'formal' ? 'Formel'
                            : style.formality === 'semi-formal' ? 'Semi-formel'
                            : 'Décontracté'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditStyle(style)}
                        className="p-1 text-gray-400 hover:text-gray-500"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteStyle(style.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {style.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Ton
                      </h4>
                      <p className="text-sm text-gray-600">
                        {style.tone}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Vocabulaire clé
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {style.vocabulary.map((word, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Exemples
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1 ml-4">
                        {style.examples.map((example, index) => (
                          <li key={index} className="list-disc">
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-green-700 mb-2">
                          À faire
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1 ml-4">
                          {style.dosList.map((item, index) => (
                            <li key={index} className="list-disc">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-red-700 mb-2">
                          À éviter
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1 ml-4">
                          {style.dontsList.map((item, index) => (
                            <li key={index} className="list-disc">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <WritingStyleForm
          style={selectedStyle}
          onSubmit={(data) => {
            if (selectedStyle) {
              setStyles(styles.map(s => 
                s.id === selectedStyle.id ? { ...data, id: s.id } : s
              ));
            } else {
              setStyles([...styles, { ...data, id: String(styles.length + 1) }]);
            }
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

interface WritingStyleFormProps {
  style?: WritingStyle | null;
  onSubmit: (data: Omit<WritingStyle, 'id'>) => void;
  onCancel: () => void;
}

const WritingStyleForm: React.FC<WritingStyleFormProps> = ({ style, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<WritingStyle, 'id'>>({
    name: style?.name || '',
    description: style?.description || '',
    tone: style?.tone || '',
    formality: style?.formality || 'formal',
    vocabulary: style?.vocabulary || [''],
    examples: style?.examples || [''],
    dosList: style?.dosList || [''],
    dontsList: style?.dontsList || ['']
  });

  const handleArrayChange = (
    field: 'vocabulary' | 'examples' | 'dosList' | 'dontsList',
    index: number,
    value: string
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleAddArrayItem = (
    field: 'vocabulary' | 'examples' | 'dosList' | 'dontsList'
  ) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const handleRemoveArrayItem = (
    field: 'vocabulary' | 'examples' | 'dosList' | 'dontsList',
    index: number
  ) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          {style ? 'Modifier le style' : 'Nouveau style d\'écriture'}
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom du style
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Niveau de formalité
              </label>
              <select
                value={formData.formality}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  formality: e.target.value as WritingStyle['formality']
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="formal">Formel</option>
                <option value="semi-formal">Semi-formel</option>
                <option value="casual">Décontracté</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ton
            </label>
            <input
              type="text"
              value={formData.tone}
              onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Ex: Professionnel et confiant"
              required
            />
          </div>

          {/* Arrays */}
          {[
            { field: 'vocabulary' as const, label: 'Vocabulaire clé' },
            { field: 'examples' as const, label: 'Exemples' },
            { field: 'dosList' as const, label: 'À faire' },
            { field: 'dontsList' as const, label: 'À éviter' }
          ].map(({ field, label }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
              </label>
              {formData[field].map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange(field, index, e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem(field, index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayItem(field)}
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                <Plus className="h-4 w-4 inline mr-1" />
                Ajouter
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
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
          {style ? 'Mettre à jour' : 'Créer le style'}
        </button>
      </div>
    </form>
  );
};

export default WritingStyles;