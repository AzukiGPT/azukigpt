import React from 'react';

const categories = [
  'All',
  'Social Media',
  'Email',
  'Blog',
  'Marketing',
  'Technical',
];

const writingStyles = [
  'All',
  'Professional',
  'Casual',
  'Technical',
  'Creative',
  'Formal',
];

const TemplateFilters = () => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Categories */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Writing Styles */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Writing Styles</h3>
          <div className="space-y-2">
            {writingStyles.map((style) => (
              <label key={style} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">{style}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Filters */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Other Filters</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Favorites Only</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">My Templates</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateFilters;