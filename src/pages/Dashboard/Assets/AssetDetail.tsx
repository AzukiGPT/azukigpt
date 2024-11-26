import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Image, 
  Video, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Folder, 
  Tag,
  Pencil,
  Trash2,
  Link as LinkIcon,
  Share2
} from 'lucide-react';

interface Asset {
  id: string;
  title: string;
  type: 'article' | 'image' | 'video' | 'email' | 'social' | 'document';
  content: string;
  folder: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  campaign?: string;
  template?: string;
}

const mockAsset: Asset = {
  id: '1',
  title: 'Statistiques LinkedIn - Post Produit A',
  type: 'document',
  content: `# Analyse des statistiques
  
  ## Engagement
  - 245 impressions
  - 12 likes
  - 3 commentaires
  - 2 partages
  
  ## Audience
  - 60% de décideurs
  - 35% de managers
  - 5% autres`,
  folder: 'Analytics',
  createdAt: '2024-03-15',
  updatedAt: '2024-03-15',
  tags: ['linkedin', 'analytics', 'engagement'],
  campaign: 'Q1 2024'
};

const AssetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const asset = mockAsset; // In real app, fetch asset by id

  const getAssetIcon = (type: Asset['type']) => {
    switch (type) {
      case 'article':
        return FileText;
      case 'image':
        return Image;
      case 'video':
        return Video;
      case 'email':
        return Mail;
      case 'social':
        return MessageSquare;
      case 'document':
        return FileText;
      default:
        return FileText;
    }
  };

  const handleEdit = () => {
    navigate(`/dashboard/assets/${id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet asset ?')) {
      // Delete logic here
      navigate('/dashboard/assets');
    }
  };

  const AssetIcon = getAssetIcon(asset.type);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard/assets')}
            className="btn btn-secondary"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">{asset.title}</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="btn btn-secondary"
          >
            <Pencil className="h-5 w-5 mr-2" />
            Modifier
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-secondary text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-5 w-5 mr-2" />
            Supprimer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <AssetIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">Contenu</h2>
                <p className="text-sm text-gray-500">
                  Créé le {new Date(asset.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-gray-50 rounded-lg p-4">
                {asset.content}
              </pre>
            </div>
          </div>

          {/* Usage History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Historique d'utilisation</h3>
            <div className="text-sm text-gray-500">
              Aucune utilisation enregistrée
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Metadata */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informations</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Type</dt>
                <dd className="mt-1 text-sm text-gray-900 flex items-center gap-2">
                  <AssetIcon className="h-4 w-4" />
                  {asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Dossier</dt>
                <dd className="mt-1 text-sm text-gray-900 flex items-center gap-2">
                  <Folder className="h-4 w-4" />
                  {asset.folder}
                </dd>
              </div>

              {asset.campaign && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Campagne</dt>
                  <dd className="mt-1 text-sm text-gray-900 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {asset.campaign}
                  </dd>
                </div>
              )}

              <div>
                <dt className="text-sm font-medium text-gray-500">Tags</dt>
                <dd className="mt-1">
                  <div className="flex flex-wrap gap-2">
                    {asset.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Dates</dt>
                <dd className="mt-1 space-y-1">
                  <div className="text-sm text-gray-900">
                    Créé le {new Date(asset.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-900">
                    Modifié le {new Date(asset.updatedAt).toLocaleDateString()}
                  </div>
                </dd>
              </div>
            </dl>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h3>
            <div className="space-y-2">
              <button className="w-full btn btn-secondary">
                <LinkIcon className="h-5 w-5 mr-2" />
                Copier le lien
              </button>
              <button className="w-full btn btn-secondary">
                <Share2 className="h-5 w-5 mr-2" />
                Partager
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;