import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Image, 
  Video, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Tag,
  Plus,
  Trash2,
  Link as LinkIcon,
  BarChart
} from 'lucide-react';
import type { Asset, AssetKpi } from '../../../types/asset';
import AddKpiModal from '../../../components/Assets/AddKpiModal';

const mockAsset: Asset = {
  id: '1',
  title: 'Statistiques LinkedIn - Post Produit A',
  type: 'document',
  content: `# Analyse des statistiques\n\n## Engagement\n- 245 impressions\n- 12 likes\n- 3 commentaires\n- 2 partages\n\n## Audience\n- 60% de décideurs\n- 35% de managers\n- 5% autres`,
  folder: 'Analytics',
  tags: ['linkedin', 'analytics', 'engagement'],
  campaign: 'Q1 2024',
  source: 'template',
  version: 1,
  kpis: [
    {
      id: '1',
      name: 'Impressions',
      value: '245',
      source: 'linkedin',
      sourceUrl: 'https://linkedin.com/post/123',
      timestamp: '2024-03-15T10:00:00Z',
      trend: 'up'
    }
  ],
  createdAt: '2024-03-15',
  updatedAt: '2024-03-15',
  createdBy: 'user-1'
};

const EditAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState<Asset>(mockAsset);
  const [showKpiModal, setShowKpiModal] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!asset.title.trim()) {
      alert('Le titre est requis');
      return;
    }

    if (!asset.content.trim()) {
      alert('Le contenu est requis');
      return;
    }

    if (!asset.folder) {
      alert('Le dossier est requis');
      return;
    }

    // Save asset logic here
    console.log('Saving asset:', asset);
    navigate(`/dashboard/assets/${id}`);
  };

  const handleAddTag = () => {
    if (newTag && !asset.tags.includes(newTag)) {
      setAsset({
        ...asset,
        tags: [...asset.tags, newTag]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setAsset({
      ...asset,
      tags: asset.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleAddKpi = (kpi: Omit<AssetKpi, 'id'>) => {
    setAsset({
      ...asset,
      kpis: [...asset.kpis, { ...kpi, id: String(asset.kpis.length + 1) }]
    });
    setShowKpiModal(false);
  };

  const handleRemoveKpi = (kpiId: string) => {
    setAsset({
      ...asset,
      kpis: asset.kpis.filter(k => k.id !== kpiId)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(`/dashboard/assets/${id}`)}
          className="btn btn-secondary"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Modifier l'Asset</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Titre
              </label>
              <input
                type="text"
                id="title"
                value={asset.title}
                onChange={(e) => setAsset({ ...asset, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Contenu
              </label>
              <textarea
                id="content"
                value={asset.content}
                onChange={(e) => setAsset({ ...asset, content: e.target.value })}
                rows={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="folder" className="block text-sm font-medium text-gray-700">
                  Dossier
                </label>
                <select
                  id="folder"
                  value={asset.folder}
                  onChange={(e) => setAsset({ ...asset, folder: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Sélectionner un dossier</option>
                  <option value="Analytics">Analytics</option>
                  <option value="Blog">Blog</option>
                  <option value="Newsletters">Newsletters</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Campagnes">Campagnes</option>
                </select>
              </div>

              <div>
                <label htmlFor="campaign" className="block text-sm font-medium text-gray-700">
                  Campagne (optionnel)
                </label>
                <select
                  id="campaign"
                  value={asset.campaign}
                  onChange={(e) => setAsset({ ...asset, campaign: e.target.value || undefined })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Sélectionner une campagne</option>
                  <option value="Q1 2024">Q1 2024</option>
                  <option value="Q2 2024">Q2 2024</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {asset.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-gray-400 hover:text-gray-500"
                    >
                      &times;
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
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Ajouter un tag..."
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="btn btn-secondary"
                >
                  Ajouter
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  KPIs
                </label>
                <button
                  type="button"
                  onClick={() => setShowKpiModal(true)}
                  className="btn btn-secondary"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Ajouter un KPI
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {asset.kpis.map((kpi) => (
                  <div
                    key={kpi.id}
                    className="bg-gray-50 rounded-lg p-4 relative group"
                  >
                    <button
                      type="button"
                      onClick={() => handleRemoveKpi(kpi.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart className={`h-4 w-4 ${
                        kpi.trend === 'up' ? 'text-green-500' :
                        kpi.trend === 'down' ? 'text-red-500' :
                        'text-gray-500'
                      }`} />
                      <span className="text-sm font-medium text-gray-900">
                        {kpi.name}
                      </span>
                    </div>
                    
                    <div className="text-2xl font-semibold text-gray-900">
                      {kpi.value}
                    </div>
                    
                    {kpi.sourceUrl && (
                      <a
                        href={kpi.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                      >
                        <LinkIcon className="h-3 w-3" />
                        Voir la source
                      </a>
                    )}
                    
                    <div className="mt-2 text-xs text-gray-500">
                      Mis à jour le {new Date(kpi.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(`/dashboard/assets/${id}`)}
            className="btn btn-secondary"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>

      {showKpiModal && (
        <AddKpiModal
          onAdd={handleAddKpi}
          onClose={() => setShowKpiModal(false)}
        />
      )}
    </div>
  );
};

export default EditAsset;