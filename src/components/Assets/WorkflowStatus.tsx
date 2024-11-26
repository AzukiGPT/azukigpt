import React from 'react';
import { Clock, CheckCircle, AlertCircle, User } from 'lucide-react';
import type { WorkflowStatus } from '../../types/asset';

interface WorkflowStatusProps {
  status: WorkflowStatus;
  reviewers?: string[];
  onStatusChange?: (status: WorkflowStatus) => void;
  onAddReviewer?: () => void;
  onRemoveReviewer?: (reviewer: string) => void;
  readonly?: boolean;
}

const WorkflowStatus: React.FC<WorkflowStatusProps> = ({
  status,
  reviewers = [],
  onStatusChange,
  onAddReviewer,
  onRemoveReviewer,
  readonly = false
}) => {
  const getStatusColor = (status: WorkflowStatus) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'in_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'published':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: WorkflowStatus) => {
    switch (status) {
      case 'draft':
        return Clock;
      case 'in_review':
        return AlertCircle;
      case 'approved':
      case 'published':
        return CheckCircle;
      default:
        return Clock;
    }
  };

  const StatusIcon = getStatusIcon(status);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Workflow</h3>
        
        <div className="flex items-center gap-4">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
            <StatusIcon className="h-4 w-4 mr-2" />
            {status === 'draft' ? 'Brouillon' :
             status === 'in_review' ? 'En révision' :
             status === 'approved' ? 'Approuvé' :
             'Publié'}
          </div>

          {!readonly && onStatusChange && (
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value as WorkflowStatus)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="draft">Brouillon</option>
              <option value="in_review">En révision</option>
              <option value="approved">Approuvé</option>
              <option value="published">Publié</option>
            </select>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-gray-900">Réviseurs</h4>
          {!readonly && onAddReviewer && (
            <button
              onClick={onAddReviewer}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              + Ajouter un réviseur
            </button>
          )}
        </div>

        <div className="space-y-2">
          {reviewers.map((reviewer) => (
            <div
              key={reviewer}
              className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2"
            >
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-900">{reviewer}</span>
              </div>
              {!readonly && onRemoveReviewer && (
                <button
                  onClick={() => onRemoveReviewer(reviewer)}
                  className="text-gray-400 hover:text-red-500"
                >
                  &times;
                </button>
              )}
            </div>
          ))}

          {reviewers.length === 0 && (
            <div className="text-sm text-gray-500 text-center py-4">
              Aucun réviseur assigné
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowStatus;