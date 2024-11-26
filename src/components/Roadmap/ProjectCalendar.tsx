import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, Calendar, Clock, User, ArrowRight } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'in_progress' | 'pending' | 'completed' | 'delayed';
  team: string[];
  category: string;
  progress: number;
  responsible: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Q4 Marketing Campaign',
    startDate: '2023-11-15',
    endDate: '2023-12-31',
    status: 'in_progress',
    team: ['Sarah M.', 'Thomas D.', 'Marie L.'],
    category: 'marketing',
    progress: 45,
    responsible: 'Sarah M.'
  },
  {
    id: '2',
    name: 'Website Redesign',
    startDate: '2023-12-01',
    endDate: '2023-12-15',
    status: 'completed',
    team: ['Paul R.', 'Julie B.'],
    category: 'design',
    progress: 100,
    responsible: 'Paul R.'
  },
  {
    id: '3',
    name: 'End of Year Report',
    startDate: '2023-12-15',
    endDate: '2023-12-30',
    status: 'pending',
    team: ['Marie L.', 'Sarah M.'],
    category: 'reporting',
    progress: 0,
    responsible: 'Marie L.'
  }
];

const ProjectCalendar: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'in_progress':
        return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
      case 'completed':
        return 'bg-green-50 border-green-200 hover:bg-green-100';
      case 'pending':
        return 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100';
      case 'delayed':
        return 'bg-red-50 border-red-200 hover:bg-red-100';
      default:
        return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
    }
  };

  const getStatusTextColor = (status: Project['status']) => {
    switch (status) {
      case 'in_progress':
        return 'text-blue-700';
      case 'completed':
        return 'text-green-700';
      case 'pending':
        return 'text-yellow-700';
      case 'delayed':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };

  const getStatusBadgeColor = (status: Project['status']) => {
    switch (status) {
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate the start and end dates for the Gantt chart
  const startDate = new Date(Math.min(...mockProjects.map(p => new Date(p.startDate).getTime())));
  const endDate = new Date(Math.max(...mockProjects.map(p => new Date(p.endDate).getTime())));
  
  // Calculate the total number of days to display
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  // Generate array of dates for the timeline
  const dates = Array.from({ length: totalDays }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return date;
  });

  const getProjectPosition = (project: Project) => {
    const projectStart = new Date(project.startDate);
    const projectEnd = new Date(project.endDate);
    
    const startOffset = Math.ceil((projectStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const duration = Math.ceil((projectEnd.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    return {
      left: `${(startOffset / totalDays) * 100}%`,
      width: `${(duration / totalDays) * 100}%`
    };
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/dashboard/roadmap/projects/${projectId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Project Timeline</h2>
      </div>

      <div className="min-w-full">
        {/* Timeline Header */}
        <div className="flex border-b sticky top-0 bg-white z-10">
          <div className="w-64 flex-shrink-0 px-6 py-3 bg-gray-50 border-r">
            <span className="text-sm font-medium text-gray-500">Project Name</span>
          </div>
          <div className="flex-grow">
            <div className="flex">
              {dates.map((date, index) => (
                <div
                  key={index}
                  className="flex-1 min-w-[50px] px-2 py-3 text-center border-r text-sm font-medium text-gray-500 bg-gray-50"
                >
                  {date.getDate()}
                  <div className="text-xs text-gray-400">
                    {date.toLocaleString('default', { month: 'short' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="relative">
          {mockProjects.map((project) => (
            <div
              key={project.id}
              className="flex border-b hover:bg-gray-50"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="w-64 flex-shrink-0 px-6 py-4 border-r">
                <div className="space-y-1">
                  <div className="font-medium text-gray-900">{project.name}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="h-4 w-4" />
                    <span>{project.responsible}</span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(project.status)}`}>
                    {project.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                </div>
              </div>
              <div className="flex-grow relative h-20">
                {/* Project Bar */}
                <button
                  onClick={() => handleProjectClick(project.id)}
                  className={`absolute top-3 h-14 ${getStatusColor(project.status)} border-2 rounded-lg transition-all cursor-pointer ${
                    hoveredProject === project.id ? 'shadow-md scale-[1.02]' : ''
                  }`}
                  style={getProjectPosition(project)}
                >
                  <div className="px-4 py-2 h-full">
                    <div className="flex flex-col justify-between h-full">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium truncate mr-2">
                          {project.name}
                        </div>
                        <ArrowRight className={`h-4 w-4 ${getStatusTextColor(project.status)} opacity-0 group-hover:opacity-100 transition-opacity`} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3 text-gray-500" />
                          <span className="text-xs text-gray-600">
                            {project.responsible}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-gray-200 rounded-full">
                            <div
                              className={`h-full rounded-full ${
                                project.status === 'completed' ? 'bg-green-500' :
                                project.status === 'in_progress' ? 'bg-blue-500' :
                                'bg-gray-400'
                              }`}
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${getStatusTextColor(project.status)}`}>
                            {project.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCalendar;