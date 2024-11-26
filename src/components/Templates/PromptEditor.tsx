import React, { useState, useRef, useEffect } from 'react';
import { Search, Bot, Database, Building2, ArrowRight, Info, X, Plus } from 'lucide-react';
import { TemplateVariable } from '../../types/template';

interface PromptEditorProps {
  content: string;
  variables: TemplateVariable[];
  availableVariables: Array<TemplateVariable & { 
    stepTitle?: string;
    assetName?: string;
  }>;
  onChange: (content: string, variables: TemplateVariable[]) => void;
  isUserInput?: boolean;
  isTemplateUsage?: boolean;
}

const PromptEditor: React.FC<PromptEditorProps> = ({
  content,
  variables,
  availableVariables,
  onChange,
  isUserInput = false,
  isTemplateUsage = false
}) => {
  const [showVariableMenu, setShowVariableMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'previous' | 'assets' | 'company'>(isTemplateUsage ? 'assets' : 'previous');
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleCloseModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCloseModal = () => {
    setShowVariableMenu(false);
    setSearchQuery('');
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Sur desktop uniquement, on garde le raccourci clavier {
    if (window.innerWidth >= 1024 && e.key === '{' && !showVariableMenu) {
      e.preventDefault();
      openVariableMenu();
    } else if (e.key === 'Escape' && showVariableMenu) {
      handleCloseModal();
    }
  };

  const openVariableMenu = () => {
    const textarea = editorRef.current;
    if (textarea) {
      setCursorPosition(textarea.selectionStart);
      setShowVariableMenu(true);
      
      // Focus search input after modal opens
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }
  };

  const insertVariable = (variable: TemplateVariable & { stepTitle?: string; assetName?: string }) => {
    const variableName = `{${variable.source === 'company_asset' ? 
      `${variable.assetName}.${variable.name}` : 
      `${variable.stepTitle ? `${variable.stepTitle}.` : ''}${variable.name}`}}`;
    
    const newContent = content.slice(0, cursorPosition) + 
      variableName + 
      content.slice(cursorPosition);

    onChange(newContent, [...variables, variable]);
    handleCloseModal();
  };

  const filteredVariables = availableVariables.filter(variable => {
    const searchTerms = searchQuery.toLowerCase().split(' ');
    const searchString = `${variable.name} ${variable.stepTitle || ''} ${variable.assetName || ''} ${variable.description}`.toLowerCase();
    return searchTerms.every(term => searchString.includes(term)) &&
      (activeTab === 'previous' && variable.source === 'previous_step' ||
       activeTab === 'assets' && variable.source === 'company_asset' ||
       activeTab === 'company' && variable.source === 'company_data');
  });

  return (
    <div className="relative">
      <div className="relative">
        <textarea
          ref={editorRef}
          value={content}
          onChange={(e) => onChange(e.target.value, variables)}
          onKeyDown={handleKeyDown}
          rows={6}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary font-mono text-sm"
          placeholder={isUserInput ? "Instructions pour l'utilisateur..." : "Écrivez votre prompt ici..."}
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          {/* Bouton mobile pour ouvrir la modale */}
          <button
            type="button"
            onClick={openVariableMenu}
            className="lg:hidden inline-flex items-center px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20"
          >
            <Plus className="h-3 w-3 mr-1" />
            Variable
          </button>
          {/* Info desktop */}
          <div className="hidden lg:flex items-center text-xs text-gray-500 gap-1">
            <Info className="h-4 w-4" />
            Tapez {'{'} pour insérer une variable
          </div>
        </div>
      </div>

      {showVariableMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div
            ref={menuRef}
            className="w-[90%] max-w-2xl h-[80vh] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900">Insérer une variable</h3>
              <button
                onClick={handleCloseModal}
                className="p-1 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search */}
            <div className="p-6 border-b bg-white">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une variable..."
                  className="w-full pl-10 pr-4 py-3 border-2 rounded-lg text-sm focus:border-primary focus:ring focus:ring-primary/10"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="px-6 pt-6 border-b bg-white">
              <div className="flex flex-wrap gap-2">
                {!isTemplateUsage && (
                  <button
                    onClick={() => setActiveTab('previous')}
                    className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                      activeTab === 'previous'
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Bot className="h-4 w-4 mr-2" />
                    Étapes précédentes
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('assets')}
                  className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                    activeTab === 'assets'
                      ? 'bg-success text-white shadow-lg shadow-success/20'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Database className="h-4 w-4 mr-2" />
                  Assets
                </button>
                <button
                  onClick={() => setActiveTab('company')}
                  className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                    activeTab === 'company'
                      ? 'bg-info text-white shadow-lg shadow-info/20'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Données Entreprise
                </button>
              </div>
            </div>

            {/* Variables list */}
            <div className="flex-1 overflow-y-auto p-6">
              {filteredVariables.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {filteredVariables.map((variable) => (
                    <button
                      key={`${variable.source}_${variable.sourceId}_${variable.name}`}
                      onClick={() => insertVariable(variable)}
                      className={`w-full text-left p-4 rounded-lg flex items-start gap-4 group hover:shadow-md transition-all ${
                        variable.source === 'previous_step'
                          ? 'hover:bg-primary/5 hover:border-primary/20'
                          : variable.source === 'company_asset'
                          ? 'hover:bg-success-light/5 hover:border-success/20'
                          : 'hover:bg-info-light/5 hover:border-info/20'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        variable.source === 'previous_step'
                          ? 'bg-primary/10'
                          : variable.source === 'company_asset'
                          ? 'bg-success-light/10'
                          : 'bg-info-light/10'
                      }`}>
                        {variable.source === 'previous_step' ? (
                          <Bot className="h-6 w-6 text-primary" />
                        ) : variable.source === 'company_asset' ? (
                          <Database className="h-6 w-6 text-success" />
                        ) : (
                          <Building2 className="h-6 w-6 text-info" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 flex items-center justify-between">
                          <span className="text-base">
                            {variable.source === 'previous_step'
                              ? `${variable.stepTitle} > ${variable.name}`
                              : variable.source === 'company_asset'
                              ? `${variable.assetName}.${variable.name}`
                              : variable.name}
                          </span>
                          <ArrowRight className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          {variable.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-sm text-gray-500">
                    Aucune variable ne correspond à votre recherche
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptEditor;