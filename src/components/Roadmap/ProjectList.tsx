import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Pause,
  ChevronRight,
  Users
} from 'lucide-react';

const mockProjects = [
  {
    id: '1',
    name: 'Campagne Marketing Q1 2024',
    description: 'Lancement de la nouvelle gamme de produits',
    status: 'in_progress',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    progress: 45,
    team: ['Sarah M.', 'Thomas D.', 'Marie L.'],
    category: 'marketing',
  },
  {
    id: '2',
    name: 'Refonte Newsletter',
    description: 'Optimisation du template et de la stratégie éditoriale',
    status: 'pending',
    startDate: '2024-02-01',
    endDate: '2024-02-15',
    progress: 0,
    team: ['Paul R.', 'Julie B.'],
    category: 'email',
  },
  {
    id: '3',
    name: 'Contenu Blog Février',
    description: 'Rédaction et publication des articles du mois',
    status: 'completed',
    startDate: '2024-02-01',
    endDate: '2024-02-29',
    progress: 100,
    team: ['Marie L.', 'Lucas P.'],
    category: 'content',
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'in_progress':
      return <Clock className="h-5 w-5 text-blue-500" />;
    case 'pending':
      return <Pause className="h-5 w-5 text-yellow-500" />;
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'delayed':
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'in_progress':
      return 'En cours';
    case 'pending':
      return 'En attente';
    case 'completed':
      return 'Terminé';
    case 'delayed':
      return 'En retard';
    default:
      return status;
  }
};

const ProjectList = () => {
  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {mockProjects.map((project) => (
          <li key={project.id} className="hover:bg-gray-50">
            <Link to={`/dashboard/roadmap/projects/${project.id}`} className="block">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(project.status)}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-500">{project.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {project.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {project.startDate} - {project.endDate}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex -space-x-2">
                      {project.team.map((member, index) => (
                        <div
                          key={index}
                          className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                          title={member}
                        >
                          <span className="text-xs font-medium">
                            {member.split(' ')[0][0]}{member.split(' ')[1][0]}
                          </span>
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {project.progress}%
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;