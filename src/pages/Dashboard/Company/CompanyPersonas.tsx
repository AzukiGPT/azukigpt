import React, { useState } from 'react';
import { Plus, Pencil, Trash2, User, BarChart, Target, Heart } from 'lucide-react';

interface Persona {
  id: string;
  name: string;
  age: string;
  gender: string;
  location: string;
  occupation: string;
  income: string;
  education: string;
  goals: string[];
  painPoints: string[];
  motivations: string[];
  behaviors: string[];
}

const mockPersonas: Persona[] = [
  {
    id: '1',
    name: 'Sarah, la Directrice Marketing',
    age: '35-45',
    gender: 'Femme',
    location: 'Grande ville',
    occupation: 'Directrice Marketing',
    income: '70-90k€',
    education: 'Master en Marketing',
    goals: [
      'Optimiser le ROI des campagnes',
      'Innover dans les stratégies digitales',
      'Développer la présence de la marque'
    ],
    painPoints: [
      'Manque de temps pour l\'analyse',
      'Difficulté à mesurer l\'impact',
      'Budget limité'
    ],
    motivations: [
      'Reconnaissance professionnelle',
      'Innovation',
      'Performance mesurable'
    ],
    behaviors: [
      'Utilise principalement LinkedIn',
      'Suit les tendances marketing',
      'Participe à des conférences'
    ]
  }
];

const CompanyPersonas = () => {
  const [personas, setPersonas] = useState<Persona[]>(mockPersonas);
  const [showForm, setShowForm] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

  const handleAddPersona = () => {
    setSelectedPersona(null);
    setShowForm(true);
  };

  const handleEditPersona = (persona: Persona) => {
    setSelectedPersona(persona);
    setShowForm(true);
  };

  const handleDeletePersona = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce persona ?')) {
      setPersonas(personas.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {!showForm ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Personas</h2>
              <p className="text-sm text-gray-500">
                Gérez vos personas cibles pour personnaliser vos communications
              </p>
            </div>
            <button
              onClick={handleAddPersona}
              className="btn btn-primary"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nouveau Persona
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personas.map((persona) => (
              <div
                key={persona.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <User className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {persona.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {persona.occupation}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditPersona(persona)}
                        className="p-1 text-gray-400 hover:text-gray-500"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeletePersona(persona.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Âge:</span>
                        <span className="ml-2 text-gray-900">{persona.age}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Genre:</span>
                        <span className="ml-2 text-gray-900">{persona.gender}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Localisation:</span>
                        <span className="ml-2 text-gray-900">{persona.location}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Revenu:</span>
                        <span className="ml-2 text-gray-900">{persona.income}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                        <Target className="h-4 w-4 text-indigo-500" />
                        Objectifs
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1 ml-6">
                        {persona.goals.slice(0, 2).map((goal, index) => (
                          <li key={index} className="list-disc">{goal}</li>
                        ))}
                        {persona.goals.length > 2 && (
                          <li className="text-gray-400">
                            +{persona.goals.length - 2} autres
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                        <Heart className="h-4 w-4 text-indigo-500" />
                        Motivations
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1 ml-6">
                        {persona.motivations.slice(0, 2).map((motivation, index) => (
                          <li key={index} className="list-disc">{motivation}</li>
                        ))}
                        {persona.motivations.length > 2 && (
                          <li className="text-gray-400">
                            +{persona.motivations.length - 2} autres
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <PersonaForm
          persona={selectedPersona}
          onSubmit={(data) => {
            if (selectedPersona) {
              setPersonas(personas.map(p => 
                p.id === selectedPersona.id ? { ...data, id: p.id } : p
              ));
            } else {
              setPersonas([...personas, { ...data, id: String(personas.length + 1) }]);
            }
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

interface PersonaFormProps {
  persona?: Persona | null;
  onSubmit: (data: Omit<Persona, 'id'>) => void;
  onCancel: () => void;
}

const PersonaForm: React.FC<PersonaFormProps> = ({ persona, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Persona, 'id'>>({
    name: persona?.name || '',
    age: persona?.age || '',
    gender: persona?.gender || '',
    location: persona?.location || '',
    occupation: persona?.occupation || '',
    income: persona?.income || '',
    education: persona?.education || '',
    goals: persona?.goals || [''],
    painPoints: persona?.painPoints || [''],
    motivations: persona?.motivations || [''],
    behaviors: persona?.behaviors || ['']
  });

  const handleArrayChange = (
    field: 'goals' | 'painPoints' | 'motivations' | 'behaviors',
    index: number,
    value: string
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleAddArrayItem = (
    field: 'goals' | 'painPoints' | 'motivations' | 'behaviors'
  ) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const handleRemoveArrayItem = (
    field: 'goals' | 'painPoints' | 'motivations' | 'behaviors',
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
          {persona ? 'Modifier le persona' : 'Nouveau persona'}
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom du persona
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Ex: Sarah, la Directrice Marketing"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tranche d'âge
              </label>
              <input
                type="text"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Ex: 35-45"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Genre
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Sélectionnez un genre</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Localisation
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Ex: Grande ville"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profession
              </label>
              <input
                type="text"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Ex: Directrice Marketing"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Revenu annuel
              </label>
              <input
                type="text"
                value={formData.income}
                onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Ex: 70-90k€"
              />
            </div>
          </div>

          {['goals', 'painPoints', 'motivations', 'behaviors'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize mb-2">
                {field === 'painPoints' ? 'Points de friction' : field}
              </label>
              {formData[field as keyof typeof formData].map((item: string, index: number) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange(
                      field as 'goals' | 'painPoints' | 'motivations' | 'behaviors',
                      index,
                      e.target.value
                    )}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem(
                      field as 'goals' | 'painPoints' | 'motivations' | 'behaviors',
                      index
                    )}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayItem(
                  field as 'goals' | 'painPoints' | 'motivations' | 'behaviors'
                )}
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
          {persona ? 'Mettre à jour' : 'Créer le persona'}
        </button>
      </div>
    </form>
  );
};

export default CompanyPersonas;