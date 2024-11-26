import React, { useState } from 'react';
import { Plus, Calendar, Hash, MessageSquare, Trash2, ArrowRight } from 'lucide-react';

interface Theme {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  messages: string[];
  priority: 'high' | 'medium' | 'low';
}

interface ContentPlan {
  id: string;
  theme: string;
  date: string;
  type: string;
  channel: string;
  status: 'draft' | 'planned' | 'in_progress' | 'published';
  title: string;
  description: string;
}

const mockThemes: Theme[] = [
  {
    id: '1',
    name: 'Innovation Technologique',
    description: 'Focus sur nos avancées technologiques et innovations',
    keywords: ['innovation', 'technologie', 'futur', 'R&D'],
    messages: [
      'Leader dans l\'innovation technologique',
      'Solutions d\'avant-garde',
      'Recherche et développement continus'
    ],
    priority: 'high'
  }
];

const mockContentPlan: ContentPlan[] = [
  {
    id: '1',
    theme: 'Innovation Technologique',
    date: '2024-03-15',
    type: 'Article',
    channel: 'Blog',
    status: 'planned',
    title: 'Les 5 innovations qui transforment notre industrie',
    description: 'Analyse des dernières innovations technologiques'
  }
];

const ContentStrategy = () => {
  const [themes, setThemes] = useState<Theme[]>(mockThemes);
  const [contentPlan, setContentPlan] = useState<ContentPlan[]>(mockContentPlan);
  const [showThemeForm, setShowThemeForm] = useState(false);
  const [showContentForm, setShowContentForm] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedContent, setSelectedContent] = useState<ContentPlan | null>(null);

  const handleAddTheme = () => {
    setSelectedTheme(null);
    setShowThemeForm(true);
  };

  const handleEditTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    setShowThemeForm(true);
  };

  const handleDeleteTheme = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce thème ?')) {
      setThemes(themes.filter(t => t.id !== id));
    }
  };

  const handleAddContent = () => {
    setSelectedContent(null);
    setShowContentForm(true);
  };

  const handleEditContent = (content: ContentPlan) => {
    setSelectedContent(content);
    setShowContentForm(true);
  };

  const handleDeleteContent = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contenu ?')) {
      setContentPlan(contentPlan.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Themes Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Thèmes de contenu</h2>
            <p className="text-sm text-gray-500">
              Définissez les thèmes principaux de votre stratégie de contenu
            </p>
          </div>
          <button
            onClick={handleAddTheme}
            className="btn btn-primary"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nouveau thème
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{theme.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    theme.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : theme.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {theme.priority === 'high' ? 'Priorité haute'
                      : theme.priority === 'medium' ? 'Priorité moyenne'
                      : 'Priorité basse'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditTheme(theme)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <MessageSquare className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteTheme(theme.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{theme.description}</p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Mots-clés</h4>
                  <div className="flex flex-wrap gap-2">
                    {theme.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        <Hash className="h-3 w-3 mr-1" />
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Messages clés</h4>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    {theme.messages.map((message, index) => (
                      <li key={index} className="list-disc">{message}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Calendar */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Calendrier de contenu</h2>
            <p className="text-sm text-gray-500">
              Planifiez et organisez votre contenu
            </p>
          </div>
          <button
            onClick={handleAddContent}
            className="btn btn-primary"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nouveau contenu
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thème
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Canal
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contentPlan.map((content) => (
                <tr key={content.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(content.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {content.theme}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {content.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {content.channel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      content.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : content.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-800'
                        : content.status === 'planned'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {content.status === 'published' ? 'Publié'
                        : content.status === 'in_progress' ? 'En cours'
                        : content.status === 'planned' ? 'Planifié'
                        : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditContent(content)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <MessageSquare className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteContent(content.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContentStrategy;