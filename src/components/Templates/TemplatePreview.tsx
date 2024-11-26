import React from 'react';
import { FileText, Tag, Clock } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  content: string;
  order: number;
  variables: Array<{
    name: string;
    type: 'text' | 'number' | 'select' | 'boolean';
    defaultValue?: string | number | boolean;
    options?: string[];
  }>;
  outputFormat?: string;
  conditions?: Array<{
    if: string;
    then: string;
  }>;
}

interface TemplatePreviewProps {
  title: string;
  description: string;
  category: string;
  writingStyle: string;
  steps: Step[];
  tags: string[];
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  title,
  description,
  category,
  writingStyle,
  steps,
  tags
}) => {
  const estimatedTime = `${steps.length * 5} mins`;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Prévisualisation</h2>
        
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h3 className="text-lg font-medium text-gray-900">{title || 'Titre du template'}</h3>
            <p className="text-gray-500 mt-1">{description || 'Description du template'}</p>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-4">
            {category && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {category}
              </span>
            )}
            {writingStyle && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {writingStyle}
              </span>
            )}
            <span className="inline-flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {estimatedTime}
            </span>
          </div>

          {/* Steps Preview */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900">Étapes ({steps.length})</h4>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">
                      {step.title || `Étape ${index + 1}`}
                    </h5>
                    {step.variables.length > 0 && (
                      <div className="mt-1 text-xs text-gray-500">
                        Variables: {step.variables.map(v => v.name).join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;