import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Search, Filter, SortDesc, FileText, Image, 
  Video, Mail, MessageSquare, Calendar, Folder, Tag,
  BarChart, Clock, Star, Link as LinkIcon
} from 'lucide-react';
import type { Asset } from '../../../types/asset';

const mockAssets: Asset[] = [
  {
    id: '1',
    title: 'Statistiques LinkedIn - Post Produit A',
    type: 'document',
    content: '# Analyse des statistiques...',
    folder: 'Analytics',
    tags: ['linkedin', 'analytics', 'engagement'],
    campaign: 'Q1 2024',
    source: 'template',
    templateId: 'template-1',
    templateName: 'Analyse LinkedIn',
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
  }
];

const AssetsHome = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [assets] = useState<Asset[]>(mockAssets);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

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

  const filteredAssets = assets.filter(asset =>
    (searchQuery ? (
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      asset.folder.toLowerCase().includes(searchQuery.toLowerCase())
    ) : true) &&
    (selectedFolder ? asset.folder === selectedFolder : true)
  );

  const folders = Array.from(new Set(assets.map(asset => asset.folder)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Assets</h1>
          <p className="text-sm text-gray-500">
            {filteredAssets.length} assets trouvés
          </p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/assets/new')}
          className="btn btn-primary"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvel Asset
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un asset..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Filter className="h-5 w-5 mr-2" />
            Filtres
          </button>
          <button className="btn btn-secondary">
            <SortDesc className="h-5 w-5 mr-2" />
            Trier
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFolder(null)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                !selectedFolder
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Tous
            </button>
            {folders.map((folder) => (
              <button
                key={folder}
                onClick={() => setSelectedFolder(folder)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  selectedFolder === folder
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {folder}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => {
          const AssetIcon = getAssetIcon(asset.type);
          return (
            <div
              key={asset.id}
              onClick={() => navigate(`/dashboard/assets/${asset.id}`)}
              className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <AssetIcon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {asset.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Folder className="h-4 w-4" />
                        {asset.folder}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
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

                {/* KPIs */}
                {asset.kpis && asset.kpis.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {asset.kpis.slice(0, 2).map((kpi) => (
                      <div
                        key={kpi.id}
                        className="bg-gray-50 rounded-lg p-2"
                      >
                        <div className="text-xs text-gray-500">{kpi.name}</div>
                        <div className={`text-sm font-medium ${
                          kpi.trend === 'up' ? 'text-green-600' :
                          kpi.trend === 'down' ? 'text-red-600' :
                          'text-gray-600'
                        }`}>
                          {kpi.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Metadata */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {new Date(asset.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-4">
                    {asset.campaign && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {asset.campaign}
                      </span>
                    )}
                    {asset.source === 'template' && (
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                        <LinkIcon className="h-3 w-3" />
                        {asset.templateName}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun asset ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default AssetsHome;