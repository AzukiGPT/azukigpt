import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, MessageSquare, Paperclip } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Analyse de marché', status: 'completed', assignee: 'Sarah M.' },
    { id: 2, title: 'Création des personas', status: 'in_progress', assignee: 'Thomas D.' },
    { id: 3, title: 'Plan de communication', status: 'pending', assignee: 'Marie L.' },
  ]);

  // Mock project data - would normally come from an API
  const project = {
    id,
    name: 'Campagne Marketing Q1 2024',
    description: 'Lancement de la nouvelle gamme de produits avec focus sur l\'innovation et la durabilité.',
    status: 'in_progress',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    progress: 45,
    team: ['Sarah M.', 'Thomas D.', 'Marie L.'],
    category: 'marketing',
    updates: [
      { id: 1, user: 'Sarah M.', content: 'Analyse de marché terminée', date: '2024-01-15' },
      { id: 2, user: 'Thomas D.', content: 'Début de la création des personas', date: '2024-01-16' },
    ]
  };

  const handleTaskStatusChange = (taskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: task.status === 'completed' ? 'in_progress' : 'completed'
        };
      }
      return task;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/dashboard/roadmap')}
          className="btn btn-secondary"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500">{project.category}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Project Overview */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Vue d'ensemble</h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date de début</h3>
                <p className="text-gray-900">{project.startDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date de fin</h3>
                <p className="text-gray-900">{project.endDate}</p>
              </div>
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Tâches</h2>
              <button className="btn btn-secondary">
                Ajouter une tâche
              </button>
            </div>
            
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={task.status === 'completed'}
                      onChange={() => handleTaskStatusChange(task.id)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-gray-900">{task.title}</span>
                  </div>
                  <span className="text-sm text-gray-500">{task.assignee}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Updates */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Mises à jour</h2>
            <div className="space-y-4">
              {project.updates.map((update) => (
                <div key={update.id} className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{update.user}</p>
                      <p className="text-gray-600">{update.content}</p>
                    </div>
                    <span className="text-sm text-gray-500">{update.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Progression</h2>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${project.progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                />
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold inline-block text-indigo-600">
                  {project.progress}%
                </span>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Équipe</h2>
              <button className="text-indigo-600 hover:text-indigo-700">
                <Users className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              {project.team.map((member, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs font-medium">
                      {member.split(' ')[0][0]}{member.split(' ')[1][0]}
                    </span>
                  </div>
                  <span className="text-gray-900">{member}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h2>
            <div className="space-y-2">
              <button className="w-full btn btn-secondary">
                <MessageSquare className="h-5 w-5 mr-2" />
                Ajouter un commentaire
              </button>
              <button className="w-full btn btn-secondary">
                <Paperclip className="h-5 w-5 mr-2" />
                Joindre un fichier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;