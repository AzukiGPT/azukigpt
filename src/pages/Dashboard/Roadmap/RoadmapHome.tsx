import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  List, 
  Filter,
  Clock,
  AlertCircle,
  CheckCircle,
  Pause,
  Users,
  X
} from 'lucide-react';
import ProjectList from '../../../components/Roadmap/ProjectList';
import ProjectCalendar from '../../../components/Roadmap/ProjectCalendar';
import ProjectFilters, { FilterState } from '../../../components/Roadmap/ProjectFilters';

type ViewMode = 'list' | 'calendar';

const RoadmapHome = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    statuses: [],
    team: [],
    dateRange: {
      start: '',
      end: ''
    }
  });

  const hasActiveFilters = () => {
    return filters.categories.length > 0 || 
           filters.statuses.length > 0 || 
           filters.team.length > 0 ||
           filters.dateRange.start !== '' ||
           filters.dateRange.end !== '';
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      statuses: [],
      team: [],
      dateRange: {
        start: '',
        end: ''
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Feuille de Route</h1>
        <Link 
          to="/dashboard/roadmap/projects/new"
          className="btn btn-primary"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouveau Projet
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Projets en Cours', value: '12', icon: Clock, color: 'bg-blue-500' },
          { label: 'En Attente', value: '5', icon: Pause, color: 'bg-yellow-500' },
          { label: 'Terminés', value: '28', icon: CheckCircle, color: 'bg-green-500' },
          { label: 'En Retard', value: '3', icon: AlertCircle, color: 'bg-red-500' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* View Toggle */}
        <div className="flex gap-2 bg-white rounded-lg shadow p-1">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center px-4 py-2 rounded-md ${
              viewMode === 'list'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <List className="h-5 w-5 mr-2" />
            Liste
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center px-4 py-2 rounded-md ${
              viewMode === 'calendar'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <CalendarIcon className="h-5 w-5 mr-2" />
            Calendrier
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Filter className="h-5 w-5 mr-2" />
            Filtres
            {hasActiveFilters() && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-indigo-200 text-indigo-800 rounded-full">
                {filters.categories.length + filters.statuses.length + filters.team.length}
              </span>
            )}
          </button>

          {hasActiveFilters() && (
            <button
              onClick={clearFilters}
              className="btn btn-secondary"
              title="Clear all filters"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="flex flex-wrap gap-2">
          {filters.categories.map((category) => (
            <span
              key={category}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
            >
              {category}
              <button
                onClick={() => setFilters({
                  ...filters,
                  categories: filters.categories.filter(c => c !== category)
                })}
                className="ml-2 text-indigo-600 hover:text-indigo-800"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
          {filters.statuses.map((status) => (
            <span
              key={status}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
            >
              {status.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
              <button
                onClick={() => setFilters({
                  ...filters,
                  statuses: filters.statuses.filter(s => s !== status)
                })}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
          {filters.team.map((member) => (
            <span
              key={member}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
            >
              {member}
              <button
                onClick={() => setFilters({
                  ...filters,
                  team: filters.team.filter(m => m !== member)
                })}
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
          {(filters.dateRange.start || filters.dateRange.end) && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              {filters.dateRange.start && filters.dateRange.end
                ? `${filters.dateRange.start} - ${filters.dateRange.end}`
                : filters.dateRange.start
                ? `From ${filters.dateRange.start}`
                : `Until ${filters.dateRange.end}`}
              <button
                onClick={() => setFilters({
                  ...filters,
                  dateRange: { start: '', end: '' }
                })}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Filters Panel */}
      <ProjectFilters
        isOpen={showFilters}
        filters={filters}
        onClose={() => setShowFilters(false)}
        onFilterChange={setFilters}
      />

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow">
        {viewMode === 'list' ? (
          <ProjectList />
        ) : (
          <ProjectCalendar />
        )}
      </div>
    </div>
  );
};

export default RoadmapHome;