import React, { useState } from 'react';
import { TemplateVariable, TemplateStep } from '../../types/template';
import { Database, FileText, Search, Bot, ChevronRight, FolderOpen } from 'lucide-react';

interface VariableSelectorProps {
  previousSteps: TemplateStep[];
  companyAssets: Array<{
    id: string;
    name: string;
    type: string;
    fields: Array<{ name: string; type: string }>;
  }>;
  onSelectVariable: (variable: TemplateVariable) => void;
}

const VariableSelector: React.FC<VariableSelectorProps> = ({
  previousSteps,
  companyAssets,
  onSelectVariable
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedAssets, setExpandedAssets] = useState<string[]>([]);

  const toggleAsset = (assetId: string) => {
    setExpandedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const filterItems = (text: string) => {
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Search Bar */}
      <div className="p-3 border-b bg-gray-50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une variable..."
            className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="divide-y">
        {/* Previous Steps Variables */}
        {previousSteps.length > 0 && (
          <div className="p-3">
            <h3 className="flex items-center text-sm font-medium text-gray-900 mb-3">
              <Bot className="h-4 w-4 mr-2 text-indigo-500" />
              Variables des étapes précédentes
            </h3>
            <div className="space-y-2 pl-6">
              {previousSteps.map((step) => (
                filterItems(step.title) && (
                  <div key={step.id} className="group">
                    <div className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FileText className="h-4 w-4 mr-2 text-gray-400" />
                      {step.title}
                    </div>
                    <div className="space-y-1 pl-6">
                      {step.output && filterItems(step.output.name) && (
                        <button
                          type="button"
                          onClick={() => onSelectVariable({
                            id: `${step.id}_output`,
                            name: 'output',
                            type: 'text',
                            source: 'previous_step',
                            sourceId: step.id,
                            required: true,
                            description: `Sortie de l'étape "${step.title}"`
                          })}
                          className="flex items-center w-full px-2 py-1 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded group"
                        >
                          <ChevronRight className="h-4 w-4 mr-1 text-gray-400 group-hover:text-indigo-500" />
                          <span>Sortie</span>
                        </button>
                      )}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Company Assets */}
        <div className="p-3">
          <h3 className="flex items-center text-sm font-medium text-gray-900 mb-3">
            <Database className="h-4 w-4 mr-2 text-indigo-500" />
            Assets de l'entreprise
          </h3>
          <div className="space-y-2 pl-6">
            {companyAssets.map((asset) => (
              filterItems(asset.name) && (
                <div key={asset.id} className="group">
                  <button
                    type="button"
                    onClick={() => toggleAsset(asset.id)}
                    className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-indigo-600 group"
                  >
                    <div className="flex items-center">
                      <FolderOpen className="h-4 w-4 mr-2 text-gray-400 group-hover:text-indigo-500" />
                      {asset.name}
                    </div>
                    <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform ${
                      expandedAssets.includes(asset.id) ? 'rotate-90' : ''
                    }`} />
                  </button>
                  {expandedAssets.includes(asset.id) && (
                    <div className="mt-1 space-y-1 pl-6">
                      {asset.fields.map((field) => (
                        filterItems(field.name) && (
                          <button
                            key={`${asset.id}_${field.name}`}
                            type="button"
                            onClick={() => onSelectVariable({
                              id: `${asset.id}_${field.name}`,
                              name: field.name,
                              type: field.type as any,
                              source: 'company_asset',
                              sourceId: asset.id,
                              required: true,
                              description: `${asset.name} - ${field.name}`
                            })}
                            className="flex items-center w-full px-2 py-1 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded group"
                          >
                            <ChevronRight className="h-4 w-4 mr-1 text-gray-400 group-hover:text-indigo-500" />
                            <span>{field.name}</span>
                          </button>
                        )
                      ))}
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {searchQuery && !companyAssets.some(asset => filterItems(asset.name)) && 
       !previousSteps.some(step => filterItems(step.title)) && (
        <div className="p-4 text-center text-sm text-gray-500">
          Aucune variable ne correspond à votre recherche
        </div>
      )}
    </div>
  );
};

export default VariableSelector;