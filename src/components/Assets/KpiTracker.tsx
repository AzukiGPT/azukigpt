import React from 'react';
import { BarChart, ArrowUp, ArrowDown, Minus, Link as LinkIcon } from 'lucide-react';
import type { AssetKpi } from '../../types/asset';

interface KpiTrackerProps {
  kpis: AssetKpi[];
  onAddKpi?: () => void;
  onRemoveKpi?: (id: string) => void;
  readonly?: boolean;
}

const KpiTracker: React.FC<KpiTrackerProps> = ({ 
  kpis, 
  onAddKpi, 
  onRemoveKpi,
  readonly = false 
}) => {
  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">KPIs</h3>
        {!readonly && onAddKpi && (
          <button
            onClick={onAddKpi}
            className="btn btn-secondary"
          >
            Ajouter un KPI
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 relative group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-gray-400" />
                <span className="font-medium text-gray-900">{kpi.name}</span>
              </div>
              {getTrendIcon(kpi.trend)}
            </div>

            <div className="text-2xl font-semibold text-gray-900">
              {kpi.value}
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {new Date(kpi.timestamp).toLocaleDateString()}
              </div>
              {kpi.sourceUrl && (
                <a
                  href={kpi.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  <LinkIcon className="h-4 w-4" />
                  Source
                </a>
              )}
            </div>

            {!readonly && onRemoveKpi && (
              <button
                onClick={() => onRemoveKpi(kpi.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                &times;
              </button>
            )}
          </div>
        ))}

        {kpis.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            Aucun KPI enregistré
          </div>
        )}
      </div>
    </div>
  );
};

export default KpiTracker;