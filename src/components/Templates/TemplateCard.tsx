import React from 'react';
import { Star, Clock, ChevronRight, Pencil } from 'lucide-react';
import { Template } from '../../types/template';

interface TemplateCardProps {
  template: Template;
  onUse: () => void;
  onEdit: () => void;
  onToggleFavorite: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ 
  template, 
  onUse, 
  onEdit,
  onToggleFavorite 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{template.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{template.description}</p>
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
            className={`text-gray-400 hover:text-yellow-400 ${template.isFavorite ? 'text-yellow-400' : ''}`}
          >
            <Star className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {template.category}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {template.writingStyle}
          </span>
        </div>

        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>{template.estimatedTime}</span>
          <span className="mx-2">•</span>
          <span>{template.steps} steps</span>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            By {template.author}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onEdit}
              className="btn btn-secondary"
              title="Edit template"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button 
              onClick={onUse}
              className="btn btn-primary"
            >
              Use Template
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;