import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, SortDesc } from 'lucide-react';
import TemplateCard from '../../../components/Templates/TemplateCard';
import TemplateFilters from '../../../components/Templates/TemplateFilters';
import { Template } from '../../../types/template';

const mockTemplates: Template[] = [
  {
    id: '1',
    title: 'Social Media Campaign',
    description: 'Complete workflow for social media content creation',
    category: 'Social Media',
    writingStyle: 'Casual',
    steps: 5,
    estimatedTime: '30 mins',
    author: 'Sarah Smith',
    isFavorite: true,
    tags: ['social', 'marketing', 'content'],
  },
  {
    id: '2',
    title: 'Email Newsletter',
    description: 'Professional email newsletter template',
    category: 'Email',
    writingStyle: 'Professional',
    steps: 3,
    estimatedTime: '15 mins',
    author: 'John Doe',
    isFavorite: false,
    tags: ['email', 'newsletter'],
  },
];

const TemplatesHome = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [templates, setTemplates] = useState(mockTemplates);

  const handleCreateTemplate = () => {
    navigate('/dashboard/templates/new');
  };

  const handleUseTemplate = (templateId: string) => {
    navigate(`/dashboard/templates/${templateId}/use`);
  };

  const handleEditTemplate = (templateId: string) => {
    navigate(`/dashboard/templates/${templateId}/edit`);
  };

  const handleToggleFavorite = (templateId: string) => {
    setTemplates(prevTemplates =>
      prevTemplates.map(template =>
        template.id === templateId
          ? { ...template, isFavorite: !template.isFavorite }
          : template
      )
    );
  };

  const filteredTemplates = templates.filter(template =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Templates</h1>
        <button 
          className="btn btn-primary"
          onClick={handleCreateTemplate}
        >
          <Plus className="h-5 w-5 mr-2" />
          New Template
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-secondary"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
          <button className="btn btn-secondary">
            <SortDesc className="h-5 w-5 mr-2" />
            Sort
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && <TemplateFilters />}

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <TemplateCard 
              key={template.id} 
              template={template}
              onUse={() => handleUseTemplate(template.id)}
              onEdit={() => handleEditTemplate(template.id)}
              onToggleFavorite={() => handleToggleFavorite(template.id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No templates found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesHome;