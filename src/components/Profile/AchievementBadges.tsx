import React from 'react';
import { Award, Star, Zap, Target, Rocket, Trophy } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: typeof Award;
  color: string;
  earnedAt?: string;
  progress?: number;
  total?: number;
}

const badges: Badge[] = [
  {
    id: '1',
    name: 'Template Master',
    description: 'Created 50 templates with high usage rates',
    icon: Star,
    color: 'text-yellow-500',
    earnedAt: '2024-02-15'
  },
  {
    id: '2',
    name: 'Efficiency Expert',
    description: 'Saved over 100 hours for the team',
    icon: Zap,
    color: 'text-blue-500',
    earnedAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'Goal Crusher',
    description: 'Completed 25 projects ahead of schedule',
    icon: Target,
    color: 'text-green-500',
    progress: 20,
    total: 25
  },
  {
    id: '4',
    name: 'Innovation Pioneer',
    description: 'First to implement 10 new template types',
    icon: Rocket,
    color: 'text-purple-500',
    progress: 8,
    total: 10
  },
  {
    id: '5',
    name: 'Team Champion',
    description: 'Most used templates in the organization',
    icon: Trophy,
    color: 'text-indigo-500',
    earnedAt: '2024-03-01'
  }
];

const AchievementBadges: React.FC = () => {
  const earnedBadges = badges.filter(badge => badge.earnedAt);
  const inProgressBadges = badges.filter(badge => !badge.earnedAt);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Earned Badges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {earnedBadges.map(badge => (
            <div
              key={badge.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg bg-gray-50 ${badge.color}`}>
                  <badge.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{badge.name}</h4>
                  <p className="text-sm text-gray-500">{badge.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Earned on {new Date(badge.earnedAt!).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Badges in Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inProgressBadges.map(badge => (
            <div
              key={badge.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-gray-50 text-gray-400">
                  <badge.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{badge.name}</h4>
                  <p className="text-sm text-gray-500">{badge.description}</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{badge.progress} / {badge.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${(badge.progress! / badge.total!) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;