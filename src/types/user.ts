export type UserRole = 'admin' | 'manager' | 'editor' | 'viewer';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  title?: string;
  bio?: string;
  skills: string[];
  timezone: string;
  language: string;
  notifications: NotificationPreferences;
  lastActive?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPreferences {
  email: {
    newComments: boolean;
    taskAssignments: boolean;
    projectUpdates: boolean;
    templateChanges: boolean;
    weeklyDigest: boolean;
  };
  inApp: {
    newComments: boolean;
    taskAssignments: boolean;
    projectUpdates: boolean;
    templateChanges: boolean;
  };
}

export interface UserStats {
  templatesCreated: number;
  templatesUsed: number;
  projectsManaged: number;
  assetsCreated: number;
  totalTimeSpent: number; // in minutes
  averageResponseTime: number; // in minutes
  completionRate: number; // percentage
}

export interface UserActivity {
  id: string;
  type: 'template_created' | 'template_used' | 'project_updated' | 'asset_created' | 'comment_added';
  description: string;
  timestamp: string;
  metadata: {
    entityId: string;
    entityType: string;
    entityTitle: string;
  };
}