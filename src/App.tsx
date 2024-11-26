import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/Layout/DashboardLayout';
import DashboardHome from './pages/Dashboard/DashboardHome';
import TemplatesHome from './pages/Dashboard/Templates/TemplatesHome';
import CreateTemplate from './pages/Dashboard/Templates/CreateTemplate';
import EditTemplate from './pages/Dashboard/Templates/EditTemplate';
import UseTemplate from './pages/Dashboard/Templates/UseTemplate';
import LandingPage from './pages/Landing';
import RoadmapHome from './pages/Dashboard/Roadmap/RoadmapHome';
import ProjectDetails from './pages/Dashboard/Roadmap/ProjectDetails';
import CreateProject from './pages/Dashboard/Roadmap/CreateProject';
import AssetsHome from './pages/Dashboard/Assets/AssetsHome';
import NewAsset from './pages/Dashboard/Assets/NewAsset';
import AssetDetail from './pages/Dashboard/Assets/AssetDetail';
import CompanyHome from './pages/Dashboard/Company/CompanyHome';
import SettingsHome from './pages/Dashboard/Settings/SettingsHome';
import HelpHome from './pages/Dashboard/Help/HelpHome';
import AnalyticsHome from './pages/Dashboard/Analytics/AnalyticsHome';
import ProfileOverview from './pages/Profile/ProfileOverview';
import ProfileSettings from './pages/Profile/ProfileSettings';
import ProfileSecurity from './pages/Profile/ProfileSecurity';

// Mock data for profile pages
const mockProfile = {
  id: '1',
  email: 'sarah.martin@example.com',
  firstName: 'Sarah',
  lastName: 'Martin',
  role: 'manager' as const,
  department: 'Marketing',
  title: 'Marketing Manager',
  bio: 'Passionate about creating impactful marketing campaigns and driving growth.',
  skills: ['Content Strategy', 'Social Media', 'Analytics', 'Team Leadership'],
  timezone: 'Europe/Paris',
  language: 'fr',
  notifications: {
    email: {
      newComments: true,
      taskAssignments: true,
      projectUpdates: true,
      templateChanges: false,
      weeklyDigest: true
    },
    inApp: {
      newComments: true,
      taskAssignments: true,
      projectUpdates: true,
      templateChanges: true
    }
  },
  createdAt: '2023-01-15T00:00:00Z',
  updatedAt: '2024-03-15T00:00:00Z'
};

const mockStats = {
  templatesCreated: 24,
  templatesUsed: 147,
  projectsManaged: 12,
  assetsCreated: 89,
  totalTimeSpent: 12480,
  averageResponseTime: 45,
  completionRate: 94
};

const mockActivity = [
  {
    id: '1',
    type: 'template_created' as const,
    description: 'Created new email campaign template',
    timestamp: '2024-03-15T10:30:00Z',
    metadata: {
      entityId: 'template-1',
      entityType: 'template',
      entityTitle: 'Q1 Newsletter Template'
    }
  },
  {
    id: '2',
    type: 'asset_created' as const,
    description: 'Created new social media post',
    timestamp: '2024-03-14T15:45:00Z',
    metadata: {
      entityId: 'asset-1',
      entityType: 'asset',
      entityTitle: 'Product Launch Post'
    }
  }
];

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout><DashboardHome /></DashboardLayout>} />
        
        {/* Analytics Routes */}
        <Route path="/dashboard/analytics" element={<DashboardLayout><AnalyticsHome /></DashboardLayout>} />
        
        {/* Roadmap Routes */}
        <Route path="/dashboard/roadmap" element={<DashboardLayout><RoadmapHome /></DashboardLayout>} />
        <Route path="/dashboard/roadmap/projects/new" element={<DashboardLayout><CreateProject /></DashboardLayout>} />
        <Route path="/dashboard/roadmap/projects/:id" element={<DashboardLayout><ProjectDetails /></DashboardLayout>} />
        
        {/* Templates Routes */}
        <Route path="/dashboard/templates" element={<DashboardLayout><TemplatesHome /></DashboardLayout>} />
        <Route path="/dashboard/templates/new" element={<DashboardLayout><CreateTemplate /></DashboardLayout>} />
        <Route path="/dashboard/templates/:id/edit" element={<DashboardLayout><EditTemplate /></DashboardLayout>} />
        <Route path="/dashboard/templates/:id/use" element={<DashboardLayout><UseTemplate /></DashboardLayout>} />
        
        {/* Assets Routes */}
        <Route path="/dashboard/assets" element={<DashboardLayout><AssetsHome /></DashboardLayout>} />
        <Route path="/dashboard/assets/new" element={<DashboardLayout><NewAsset /></DashboardLayout>} />
        <Route path="/dashboard/assets/:id" element={<DashboardLayout><AssetDetail /></DashboardLayout>} />
        
        {/* Company Routes */}
        <Route path="/dashboard/company" element={<DashboardLayout><CompanyHome /></DashboardLayout>} />
        
        {/* Settings Routes */}
        <Route path="/dashboard/settings" element={<DashboardLayout><SettingsHome /></DashboardLayout>} />
        
        {/* Help Routes */}
        <Route path="/dashboard/help" element={<DashboardLayout><HelpHome /></DashboardLayout>} />

        {/* Profile Routes */}
        <Route path="/profile" element={
          <DashboardLayout>
            <ProfileOverview profile={mockProfile} stats={mockStats} recentActivity={mockActivity} />
          </DashboardLayout>
        } />
        <Route path="/profile/settings" element={
          <DashboardLayout>
            <ProfileSettings 
              profile={mockProfile}
              onUpdateProfile={async () => {}}
              onUpdateNotifications={async () => {}}
            />
          </DashboardLayout>
        } />
        <Route path="/profile/security" element={
          <DashboardLayout>
            <ProfileSecurity />
          </DashboardLayout>
        } />
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;