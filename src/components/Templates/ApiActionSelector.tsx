import React from 'react';
import { ApiAction } from '../../types/template';
import { Globe, Linkedin, Twitter, Settings, Link } from 'lucide-react';

interface ApiActionSelectorProps {
  value: ApiAction;
  onChange: (action: ApiAction) => void;
}

const ApiActionSelector: React.FC<ApiActionSelectorProps> = ({ value, onChange }) => {
  const predefinedActions = [
    {
      type: 'linkedin_post_stats',
      icon: Linkedin,
      label: 'Statistiques Post LinkedIn',
      description: 'Récupérer les statistiques d\'engagement d\'un post LinkedIn',
      requiredInputs: [
        {
          name: 'postUrl',
          label: 'URL du post LinkedIn',
          type: 'url',
          placeholder: 'https://www.linkedin.com/posts/...',
          description: 'Collez l\'URL du post LinkedIn dont vous souhaitez analyser les statistiques'
        }
      ]
    },
    {
      type: 'twitter_engagement',
      icon: Twitter,
      label: 'Engagement Twitter',
      description: 'Analyser l\'engagement d\'un tweet ou d\'un compte',
      requiredInputs: [
        {
          name: 'tweetUrl',
          label: 'URL du tweet',
          type: 'url',
          placeholder: 'https://twitter.com/username/status/...',
          description: 'Collez l\'URL du tweet dont vous souhaitez analyser l\'engagement'
        }
      ]
    },
    {
      type: 'custom',
      icon: Settings,
      label: 'API Personnalisée',
      description: 'Configurer un appel API personnalisé',
      requiredInputs: []
    }
  ] as const;

  const handleCustomApiChange = (field: keyof ApiAction, fieldValue: any) => {
    onChange({
      ...value,
      [field]: fieldValue
    });
  };

  const selectedAction = predefinedActions.find(action => action.type === value.type);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {predefinedActions.map(({ type, icon: Icon, label, description }) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange({ 
              type, 
              method: 'GET',
              requiredInputs: predefinedActions.find(a => a.type === type)?.requiredInputs || []
            })}
            className={`p-4 border rounded-lg text-left transition-all hover:shadow-md ${
              value.type === type
                ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Icon className={`h-6 w-6 ${
              value.type === type ? 'text-indigo-600' : 'text-gray-400'
            }`} />
            <h3 className={`mt-2 font-medium ${
              value.type === type ? 'text-indigo-600' : 'text-gray-900'
            }`}>
              {label}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </button>
        ))}
      </div>

      {selectedAction && selectedAction.requiredInputs.length > 0 && (
        <div className="p-4 border rounded-lg bg-blue-50 border-blue-100">
          <h4 className="text-sm font-medium text-blue-900 mb-4">
            Informations requises
          </h4>
          <div className="space-y-4">
            {selectedAction.requiredInputs.map((input) => (
              <div key={input.name}>
                <label className="block text-sm font-medium text-blue-800">
                  {input.label}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Link className="h-4 w-4 text-blue-400" />
                  </div>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    className="block w-full pl-10 pr-3 py-2 border border-blue-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm"
                  />
                </div>
                {input.description && (
                  <p className="mt-1 text-sm text-blue-600">
                    {input.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {value.type === 'custom' && (
        <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              URL de l'API
            </label>
            <input
              type="text"
              value={value.endpoint || ''}
              onChange={(e) => handleCustomApiChange('endpoint', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="https://api.example.com/endpoint"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Méthode
            </label>
            <select
              value={value.method}
              onChange={(e) => handleCustomApiChange('method', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Headers (JSON)
            </label>
            <textarea
              value={value.headers ? JSON.stringify(value.headers, null, 2) : ''}
              onChange={(e) => {
                try {
                  const headers = JSON.parse(e.target.value);
                  handleCustomApiChange('headers', headers);
                } catch (error) {
                  // Handle invalid JSON
                }
              }}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono text-sm"
              placeholder={'{\n  "Authorization": "Bearer token"\n}'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Body (JSON)
            </label>
            <textarea
              value={value.body ? JSON.stringify(value.body, null, 2) : ''}
              onChange={(e) => {
                try {
                  const body = JSON.parse(e.target.value);
                  handleCustomApiChange('body', body);
                } catch (error) {
                  // Handle invalid JSON
                }
              }}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono text-sm"
              placeholder={'{\n  "key": "value"\n}'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiActionSelector;