import React from 'react';
import { UserProfile, UserStats, UserActivity } from '../../types/user';
import { 
  User, Mail, Building2, Clock, MapPin, Globe, 
  Calendar, BarChart2, FileText, MessageSquare,
  Star, Target, Zap, Users
} from 'lucide-react';
import AchievementBadges from '../../components/Profile/AchievementBadges';

interface ProfileOverviewProps {
  profile: UserProfile;
  stats: UserStats;
  recentActivity: UserActivity[];
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({
  profile,
  stats,
  recentActivity
}) => {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start gap-6">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="h-24 w-24 rounded-full"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-2xl font-medium text-indigo-600">
                {profile.firstName[0]}{profile.lastName[0]}
              </span>
            </div>
          )}

          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-lg text-gray-500">{profile.title}</p>
              </div>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {profile.role}
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center text-sm text-gray-500">
                <Mail className="h-4 w-4 mr-2" />
                {profile.email}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Building2 className="h-4 w-4 mr-2" />
                {profile.department}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Globe className="h-4 w-4 mr-2" />
                {profile.timezone}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                Last active: {new Date(profile.lastActive || '').toLocaleString()}
              </div>
            </div>

            {profile.bio && (
              <p className="mt-4 text-sm text-gray-600">{profile.bio}</p>
            )}

            {profile.skills.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-indigo-100">
              <FileText className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Templates Created</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.templatesCreated}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Projects Managed</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.projectsManaged}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100">
              <Zap className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Time Saved</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.floor(stats.totalTimeSpent / 60)}h
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completion Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.completionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Achievements</h2>
        <AchievementBadges />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
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
                      <span className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        {activity.type === 'template_created' ? (
                          <FileText className="h-4 w-4 text-indigo-600" />
                        ) : activity.type === 'asset_created' ? (
                          <Star className="h-4 w-4 text-indigo-600" />
                        ) : (
                          <MessageSquare className="h-4 w-4 text-indigo-600" />
                        )}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <p className="text-sm text-gray-500">
                          {activity.description}
                        </p>
                        <p className="mt-0.5 text-sm text-gray-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;