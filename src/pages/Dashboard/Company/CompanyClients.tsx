import React, { useState } from 'react';
import { Plus, Building2, Users, BarChart, FileText, Trash2, Link as LinkIcon } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  website: string;
  description: string;
  industry: string;
  size: string;
  persona: string;
  benefits: string[];
  kpis: Array<{
    name: string;
    value: string;
    trend: 'up' | 'down' | 'stable';
  }>;
  content: Array<{
    type: 'testimonial' | 'case_study' | 'article' | 'video';
    title: string;
    description: string;
    url?: string;
  }>;
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    website: 'https://techcorp.com',
    description: 'Leader dans les solutions cloud pour entreprises',
    industry: 'Technologies',
    size: '500-1000',
    persona: 'Sarah, la Directrice Marketing',
    benefits: [
      'Gain de temps significatif',
      'Amélioration de la qualité des contenus',
      'ROI marketing optimisé'
    ],
    kpis: [
      { name: 'Engagement LinkedIn', value: '+45%', trend: 'up' },
      { name: 'Leads générés', value: '+60%', trend: 'up' },
      { name: 'Temps de production', value: '-30%', trend: 'down' }
    ],
    content: [
      {
        type: 'testimonial',
        title: 'Transformation de notre stratégie marketing',
        description: 'Comment TechCorp a révolutionné sa présence digitale'
      },
      {
        type: 'case_study',
        title: 'Étude de cas : Automatisation marketing',
        description: 'Impact sur la productivité et le ROI'
      }
    ]
  }
];

const CompanyClients = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleAddClient = () => {
    setSelectedClient(null);
    setShowForm(true);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setShowForm(true);
  };

  const handleDeleteClient = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {!showForm ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Clients</h2>
              <p className="text-sm text-gray-500">
                Gérez vos success stories et témoignages clients
              </p>
            </div>
            <button
              onClick={handleAddClient}
              className="btn btn-primary"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nouveau client
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {client.name}
                        </h3>
                        <a
                          href={client.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                        >
                          <LinkIcon className="h-4 w-4" />
                          {new URL(client.website).hostname}
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClient(client)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <FileText className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Secteur:</span>
                      <span className="ml-2 text-gray-900">{client.industry}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Taille:</span>
                      <span className="ml-2 text-gray-900">{client.size} employés</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
                        <Users className="h-4 w-4 text-indigo-500" />
                        Persona cible
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {client.persona}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
                        <BarChart className="h-4 w-4 text-indigo-500" />
                        KPIs
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {client.kpis.map((kpi, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 rounded-lg p-2 text-center"
                          >
                            <div className="text-xs text-gray-500">{kpi.name}</div>
                            <div className={`font-medium ${
                              kpi.trend === 'up' ? 'text-green-600' :
                              kpi.trend === 'down' ? 'text-red-600' :
                              'text-gray-600'
                            }`}>
                              {kpi.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
                        <FileText className="h-4 w-4 text-indigo-500" />
                        Contenus
                      </div>
                      <div className="space-y-2">
                        {client.content.map((content, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 rounded-lg p-3"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                                {content.type === 'testimonial' ? 'Témoignage' :
                                 content.type === 'case_study' ? 'Étude de cas' :
                                 content.type === 'article' ? 'Article' : 'Vidéo'}
                              </span>
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              {content.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {content.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <ClientForm
          client={selectedClient}
          onSubmit={(data) => {
            if (selectedClient) {
              setClients(clients.map(c => 
                c.id === selectedClient.id ? { ...data, id: c.id } : c
              ));
            } else {
              setClients([...clients, { ...data, id: String(clients.length + 1) }]);
            }
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

interface ClientFormProps {
  client?: Client | null;
  onSubmit: (data: Omit<Client, 'id'>) => void;
  onCancel: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ client, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Client, 'id'>>({
    name: client?.name || '',
    website: client?.website || '',
    description: client?.description || '',
    industry: client?.industry || '',
    size: client?.size || '',
    persona: client?.persona || '',
    benefits: client?.benefits || [''],
    kpis: client?.kpis || [{ name: '', value: '', trend: 'stable' }],
    content: client?.content || [{
      type: 'testimonial',
      title: '',
      description: ''
    }]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          {client ? 'Modifier le client' : 'Nouveau client'}
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom de l'entreprise
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
                Site web
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Secteur d'activité
              </label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Taille de l'entreprise
              </label>
              <select
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Sélectionnez une taille</option>
                <option value="1-50">1-50 employés</option>
                <option value="51-200">51-200 employés</option>
                <option value="201-500">201-500 employés</option>
                <option value="501-1000">501-1000 employés</option>
                <option value="1000+">1000+ employés</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Persona cible
            </label>
            <select
              value={formData.persona}
              onChange={(e) => setFormData({ ...formData, persona: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Sélectionnez un persona</option>
              <option value="Sarah, la Directrice Marketing">Sarah, la Directrice Marketing</option>
              <option value="Thomas, le Chef de Projet">Thomas, le Chef de Projet</option>
              <option value="Marie, la Responsable Communication">Marie, la Responsable Communication</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bénéfices obtenus
            </label>
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => {
                    const newBenefits = [...formData.benefits];
                    newBenefits[index] = e.target.value;
                    setFormData({ ...formData, benefits: newBenefits });
                  }}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newBenefits = formData.benefits.filter((_, i) => i !== index);
                    setFormData({ ...formData, benefits: newBenefits });
                  }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setFormData({
                ...formData,
                benefits: [...formData.benefits, '']
              })}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="h-4 w-4 inline mr-1" />
              Ajouter un bénéfice
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              KPIs
            </label>
            {formData.kpis.map((kpi, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 mb-2">
                <input
                  type="text"
                  value={kpi.name}
                  onChange={(e) => {
                    const newKpis = [...formData.kpis];
                    newKpis[index] = { ...kpi, name: e.target.value };
                    setFormData({ ...formData, kpis: newKpis });
                  }}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Nom du KPI"
                />
                <input
                  type="text"
                  value={kpi.value}
                  onChange={(e) => {
                    const newKpis = [...formData.kpis];
                    newKpis[index] = { ...kpi, value: e.target.value };
                    setFormData({ ...formData, kpis: newKpis });
                  }}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Valeur"
                />
                <div className="flex gap-2">
                  <select
                    value={kpi.trend}
                    onChange={(e) => {
                      const newKpis = [...formData.kpis];
                      newKpis[index] = { ...kpi, trend: e.target.value as 'up' | 'down' | 'stable' };
                      setFormData({ ...formData, kpis: newKpis });
                    }}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="up">Hausse</option>
                    <option value="down">Baisse</option>
                    <option value="stable">Stable</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      const newKpis = formData.kpis.filter((_, i) => i !== index);
                      setFormData({ ...formData, kpis: newKpis });
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setFormData({
                ...formData,
                kpis: [...formData.kpis, { name: '', value: '', trend: 'stable' }]
              })}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="h-4 w-4 inline mr-1" />
              Ajouter un KPI
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenus
            </label>
            {formData.content.map((content, index) => (
              <div key={index} className="border rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Type de contenu
                    </label>
                    <select
                      value={content.type}
                      onChange={(e) => {
                        const newContent = [...formData.content];
                        newContent[index] = { 
                          ...content, 
                          type: e.target.value as Client['content'][0]['type']
                        };
                        setFormData({ ...formData, content: newContent });
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="testimonial">Témoignage</option>
                      <option value="case_study">Étude de cas</option>
                      <option value="article">Article</option>
                      <option value="video">Vidéo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={content.title}
                      onChange={(e) => {
                        const newContent = [...formData.content];
                        newContent[index] = { ...content, title: e.target.value };
                        setFormData({ ...formData, content: newContent });
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={content.description}
                      onChange={(e) => {
                        const newContent = [...formData.content];
                        newContent[index] = { ...content, description: e.target.value };
                        setFormData({ ...formData, content: newContent });
                      }}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      URL (optionnel)
                    </label>
                    <input
                      type="url"
                      value={content.url || ''}
                      onChange={(e) => {
                        const newContent = [...formData.content];
                        newContent[index] = { ...content, url: e.target.value };
                        setFormData({ ...formData, content: newContent });
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      const newContent = formData.content.filter((_, i) => i !== index);
                      setFormData({ ...formData, content: newContent });
                    }}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 inline mr-1" />
                    Supprimer ce contenu
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setFormData({
                ...formData,
                content: [...formData.content, {
                  type: 'testimonial',
                  title: '',
                  description: ''
                }]
              })}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="h-4 w-4 inline mr-1" />
              Ajouter un contenu
            </button>
          </div>
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
          {client ? 'Mettre à jour' : 'Créer le client'}
        </button>
      </div>
    </form>
  );
};

export default CompanyClients;