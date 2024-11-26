import React, { useState } from 'react';
import { X, Globe, Linkedin, Twitter } from 'lucide-react';
import type { AssetKpi, KpiSource } from '../../types/asset';

interface AddKpiModalProps {
  onAdd: (kpi: Omit<AssetKpi, 'id'>) => void;
  onClose: () => void;
}

const AddKpiModal: React.FC<AddKpiModalProps> = ({ onAdd, onClose }) => {
  const [source, setSource] = useState<KpiSource>('manual');
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [trend, setTrend] = useState<AssetKpi['trend']>('stable');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !value.trim()) {
      alert('Le nom et la valeur sont requis');
      return;
    }

    onAdd({
      name,
      value,
      source,
      sourceUrl: sourceUrl || undefined,
      timestamp: new Date().toISOString(),
      trend
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">
            Ajouter un KPI
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Source
            </label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'manual', icon: Globe, label: 'Manuel' },
                { value: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
                { value: 'twitter', icon: Twitter, label: 'Twitter' }
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSource(value as KpiSource)}
                  className={`p-3 border rounded-lg text-center transition-all ${
                    source === value
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600 ring-2 ring-indigo-200'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`h-5 w-5 mx-auto mb-1 ${
                    source === value ? 'text-indigo-600' : 'text-gray-400'
                  }`} />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom du KPI
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Valeur
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          {source !== 'manual' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL source
              </label>
              <input
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder={`https://${source}.com/...`}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tendance
            </label>
            <select
              value={trend}
              onChange={(e) => setTrend(e.target.value as AssetKpi['trend'])}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="up">En hausse</option>
              <option value="down">En baisse</option>
              <option value="stable">Stable</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddKpiModal;