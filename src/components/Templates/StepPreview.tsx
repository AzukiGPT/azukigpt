import React, { useState } from 'react';
import { Check, RefreshCw, Edit, AlertCircle } from 'lucide-react';

interface StepPreviewProps {
  output: string;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  onValidate: () => void;
  onRegenerate: () => void;
  onEdit: () => void;
}

const StepPreview: React.FC<StepPreviewProps> = ({
  output,
  isLoading,
  isError,
  errorMessage,
  onValidate,
  onRegenerate,
  onEdit
}) => {
  return (
    <div className="space-y-4">
      {isError ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Une erreur est survenue
              </h3>
              <p className="mt-1 text-sm text-red-700">
                {errorMessage || "Impossible de générer le résultat. Veuillez réessayer."}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4">
            <div className="prose max-w-none">
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ) : (
                <pre className="text-sm text-gray-800 whitespace-pre-wrap bg-gray-50 rounded-lg p-4">
                  {output}
                </pre>
              )}
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 rounded-b-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={onEdit}
                  className="btn btn-secondary"
                  disabled={isLoading}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </button>
                <button
                  onClick={onRegenerate}
                  className="btn btn-secondary"
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Régénérer
                </button>
              </div>
              <button
                onClick={onValidate}
                className="btn btn-primary"
                disabled={isLoading}
              >
                <Check className="h-4 w-4 mr-2" />
                Valider
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepPreview;