import React from 'react';
import { X } from 'lucide-react';

export interface FilterState {
  categories: string[];
  statuses: string[];
  team: string[];
  dateRange: {
    start: string;
    end: string;
  };
}

interface ProjectFiltersProps {
  isOpen: boolean;
  filters: FilterState;
  onClose: () => void;
  onFilterChange: (filters: FilterState) => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  isOpen,
  filters,
  onClose,
  onFilterChange
}) => {
  if (!isOpen) return null;

  const categories = [
    'Marketing',
    'Design',
    'Development',
    'Content',
    'Social Media',
    'Analytics'
  ];

  const statuses = [
    'in_progress',
    'pending',
    'completed',
    'delayed'
  ];

  const teamMembers = [
    'Sarah M.',
    'Thomas D.',
    'Marie L.',
    'Paul R.',
    'Julie B.'
  ];

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFilterChange({
      ...filters,
      categories: newCategories
    });
  };

  const handleStatusChange = (status: string) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter(s => s !== status)
      : [...filters.statuses, status];
    
    onFilterChange({
      ...filters,
      statuses: newStatuses
    });
  };

  const handleTeamMemberChange = (member: string) => {
    const newTeam = filters.team.includes(member)
      ? filters.team.filter(m => m !== member)
      : [...filters.team, member];
    
    onFilterChange({
      ...filters,
      team: newTeam
    });
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    });
  };

  const clearFilters = () => {
    onFilterChange({
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
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Categories */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Status</h4>
          <div className="space-y-2">
            {statuses.map((status) => (
              <label key={status} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.statuses.includes(status)}
                  onChange={() => handleStatusChange(status)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {status.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Team Members</h4>
          <div className="space-y-2">
            {teamMembers.map((member) => (
              <label key={member} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.team.includes(member)}
                  onChange={() => handleTeamMemberChange(member)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">{member}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Date Range</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600">Start Date</label>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">End Date</label>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;