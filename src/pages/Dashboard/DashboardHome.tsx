import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowUp, 
  ArrowDown, 
  Users, 
  FileText, 
  Plus,
  Star,
  Clock,
  BarChart,
  MessageSquare
} from 'lucide-react';

const stats = [
  { 
    name: 'Templates Actifs', 
    value: '24', 
    change: '+4.75%',
    changeType: 'positive',
    icon: FileText 
  },
  { 
    name: 'Projets en Cours', 
    value: '12', 
    change: '+10.18%',
    changeType: 'positive',
    icon: Users 
  },
  { 
    name: 'Assets Créés', 
    value: '147', 
    change: '+12.5%',
    changeType: 'positive',
    icon: Star 
  },
  { 
    name: 'Temps Économisé', 
    value: '32h', 
    change: '+8.2%',
    changeType: 'positive',
    icon: Clock 
  },
];

const recentActivity = [
  {
    id: 1,
    user: 'Sarah Smith',
    action: 'a créé un nouveau template',
    template: 'Campagne Email Marketing',
    time: 'Il y a 3h',
    icon: FileText,
    link: '/dashboard/templates/1'
  },
  {
    id: 2,
    user: 'Thomas Dubois',
    action: 'a modifié le template',
    template: 'Post LinkedIn Entreprise',
    time: 'Il y a 5h',
    icon: MessageSquare,
    link: '/dashboard/templates/2'
  },
  {
    id: 3,
    user: 'Marie Laurent',
    action: 'a utilisé le template',
    template: 'Newsletter Hebdomadaire',
    time: 'Il y a 8h',
    icon: Star,
    link: '/dashboard/templates/3'
  }
];

const quickActions = [
  {
    title: 'Créer un Template',
    path: '/dashboard/templates/new',
    icon: Plus,
    color: 'bg-indigo-600'
  },
  {
    title: 'Nouveau Projet',
    path: '/dashboard/roadmap/projects/new',
    icon: FileText,
    color: 'bg-green-600'
  },
  {
    title: 'Gérer les Assets',
    path: '/dashboard/assets',
    icon: Star,
    color: 'bg-purple-600'
  },
  {
    title: 'Voir les Analytics',
    path: '/dashboard/analytics',
    icon: BarChart,
    color: 'bg-blue-600'
  }
];

const DashboardHome = () => {
  const navigate = useNavigate();

  const handleActivityClick = (link: string) => {
    navigate(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Tableau de Bord</h1>
        <Link 
          to="/dashboard/templates/new"
          className="btn btn-primary"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouveau Template
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'positive' ? 'text-green-600' : 
                  item.changeType === 'negative' ? 'text-red-600' : 
                  'text-gray-500'
                }`}
              >
                {item.changeType === 'positive' ? (
                  <ArrowUp className="h-4 w-4 flex-shrink-0 self-center text-green-500" />
                ) : item.changeType === 'negative' ? (
                  <ArrowDown className="h-4 w-4 flex-shrink-0 self-center text-red-500" />
                ) : null}
                <span className="ml-1">{item.change}</span>
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Activité Récente</h2>
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {recentActivity.map((activity, index) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {index !== recentActivity.length - 1 && (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                          <activity.icon className="h-4 w-4 text-white" />
                        </span>
                      </div>
                      <div 
                        className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5 cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                        onClick={() => handleActivityClick(activity.link)}
                      >
                        <div>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">{activity.user}</span> {activity.action}{' '}
                            <span className="font-medium text-indigo-600">{activity.template}</span>
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Actions Rapides</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.path}
                className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity`}
              >
                <action.icon className="h-6 w-6 mb-2" />
                <span className="font-medium">{action.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;