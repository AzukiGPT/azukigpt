import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Target, BarChart, Users, Link } from 'lucide-react';

interface Benefit {
  id: string;
  title: string;
  description: string;
  painPoints: string[];
  metrics: {
    name: string;
    value: string;
    trend?: 'up' | 'down';
  }[];
  relatedPersonas: string[];
}

const mockBenefits: Benefit[] = [
  {
    id: '1',
    title: 'Gain de temps significatif',
    description: 'Automatisation des tâches répétitives permettant aux équipes de se concentrer sur la stratégie',
    painPoints: [
      'Temps perdu dans les tâches manuelles',
      'Délais de production de contenu trop longs',
      'Manque de réactivité face aux opportunités'
    ],
    metrics: [
      { name: 'Réduction du temps de production', value: '60%', trend: 'down' },
      { name: 'Contenu produit par mois', value: '+45%', trend: 'up' }
    ],
    relatedPersonas: ['Sarah, la Directrice Marketing']
  }
];

const KeyBenefits = () => {
  const [benefits, setBenefits] = useState<Benefit[]>(mockBenefits);
  const [showForm, setShowForm] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);

  const handleAddBenefit = () => {
    setSelectedBenefit(null);
    setShowForm(true);
  };

  const handleEditBenefit = (benefit: Benefit) => {
    setSelectedBenefit(benefit);
    setShowForm(true);
  };

  const handleDeleteBenefit = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bénéfice ?')) {
      setBenefits(benefits.filter(b => b.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {!showForm ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Bénéfices clés</h2>
              <p className="text-sm text-gray-500">
                Définissez les bénéfices apportés par votre solution et leurs impacts
              </p>
            </div>
            <button
              onClick={handleAddBenefit}
              className="btn btn-primary"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nouveau bénéfice
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Target className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditBenefit(benefit)}
                        className="p-1 text-gray-400 hover:text-gray-500"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteBenefit(benefit.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Pain Points */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <Target className="h-4 w-4 text-indigo-500" />
                        Points de friction résolus
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1 ml-6">
                        {benefit.painPoints.map((point, index) => (
                          <li key={index} className="list-disc">{point}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <BarChart className="h-4 w-4 text-indigo-500" />
                        Métriques d'impact
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {benefit.metrics.map((metric, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 rounded-lg p-3 flex items-center justify-between"
                          >
                            <span className="text-sm text-gray-600">{metric.name}</span>
                            <span className={`font-medium ${
                              metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Related Personas */}
                    {benefit.relatedPersonas.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                          <Users className="h-4 w-4 text-indigo-500" />
                          Personas concernés
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {benefit.relatedPersonas.map((persona, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                            >
                              <Link className="h-3 w-3 mr-1" />
                              {persona}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <BenefitForm
          benefit={selectedBenefit}
          onSubmit={(data) => {
            if (selectedBenefit) {
              setBenefits(benefits.map(b => 
                b.id === selectedBenefit.id ? { ...data, id: b.id } : b
              ));
            } else {
              setBenefits([...benefits, { ...data, id: String(benefits.length + 1) }]);
            }
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

interface BenefitFormProps {
  benefit?: Benefit | null;
  onSubmit: (data: Omit<Benefit, 'id'>) => void;
  onCancel: () => void;
}

const BenefitForm: React.FC<BenefitFormProps> = ({ benefit, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Benefit, 'id'>>({
    title: benefit?.title || '',
    description: benefit?.description || '',
    painPoints: benefit?.painPoints || [''],
    metrics: benefit?.metrics || [{ name: '', value: '' }],
    relatedPersonas: benefit?.relatedPersonas || []
  });

  const handleArrayChange = (field: 'painPoints', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleMetricChange = (index: number, field: keyof typeof formData.metrics[0], value: string) => {
    const newMetrics = [...formData.metrics];
    newMetrics[index] = { ...newMetrics[index], [field]: value };
    setFormData({ ...formData, metrics: newMetrics });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          {benefit ? 'Modifier le bénéfice' : 'Nouveau bénéfice'}
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Titre
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Points de friction résolus
            </label>
            {formData.painPoints.map((point, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => handleArrayChange('painPoints', index, e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Ex: Temps perdu dans les tâches manuelles"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newPoints = formData.painPoints.filter((_, i) => i !== index);
                    setFormData({ ...formData, painPoints: newPoints });
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
                painPoints: [...formData.painPoints, '']
              })}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="h-4 w-4 inline mr-1" />
              Ajouter un point
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Métriques d'impact
            </label>
            {formData.metrics.map((metric, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-2">
                <input
                  type="text"
                  value={metric.name}
                  onChange={(e) => handleMetricChange(index, 'name', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Nom de la métrique"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={metric.value}
                    onChange={(e) => handleMetricChange(index, 'value', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Valeur (ex: +60%)"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newMetrics = formData.metrics.filter((_, i) => i !== index);
                      setFormData({ ...formData, metrics: newMetrics });
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
                metrics: [...formData.metrics, { name: '', value: '' }]
              })}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="h-4 w-4 inline mr-1" />
              Ajouter une métrique
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Personas concernés
            </label>
            <select
              multiple
              value={formData.relatedPersonas}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                setFormData({ ...formData, relatedPersonas: values });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="Sarah, la Directrice Marketing">Sarah, la Directrice Marketing</option>
              <option value="Thomas, le Chef de Projet">Thomas, le Chef de Projet</option>
              <option value="Marie, la Responsable Communication">Marie, la Responsable Communication</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Maintenez Ctrl (Cmd sur Mac) pour sélectionner plusieurs personas
            </p>
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
          {benefit ? 'Mettre à jour' : 'Créer le bénéfice'}
        </button>
      </div>
    </form>
  );
};

export default KeyBenefits;