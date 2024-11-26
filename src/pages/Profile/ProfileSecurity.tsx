import React, { useState } from 'react';
import { Shield, Key, Smartphone, History } from 'lucide-react';

interface SecuritySession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  current: boolean;
}

const mockSessions: SecuritySession[] = [
  {
    id: '1',
    device: 'MacBook Pro',
    browser: 'Chrome 98.0.4758',
    location: 'Paris, France',
    ip: '192.168.1.1',
    lastActive: '2024-03-15T10:00:00Z',
    current: true
  },
  {
    id: '2',
    device: 'iPhone 12',
    browser: 'Safari Mobile 15.0',
    location: 'Lyon, France',
    ip: '192.168.1.2',
    lastActive: '2024-03-14T15:30:00Z',
    current: false
  }
];

const ProfileSecurity: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessions] = useState<SecuritySession[]>(mockSessions);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Password change logic here
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // 2FA toggle logic here
  };

  const handleRevokeSession = (sessionId: string) => {
    // Session revocation logic here
  };

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <Key className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-900">Change Password</h2>
            <p className="text-sm text-gray-500">
              Ensure your account is using a long, random password to stay secure.
            </p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <Smartphone className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h2>
            <p className="text-sm text-gray-500">
              Add additional security to your account using two-factor authentication.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">
              {twoFactorEnabled ? 'Enabled' : 'Not Enabled'}
            </p>
            <p className="text-sm text-gray-500">
              {twoFactorEnabled
                ? 'Two-factor authentication is currently enabled on your account.'
                : 'When two-factor authentication is enabled, you will be prompted for a secure, random token during authentication.'}
            </p>
          </div>
          <button
            onClick={handleToggle2FA}
            className={`btn ${twoFactorEnabled ? 'btn-secondary' : 'btn-primary'}`}
          >
            {twoFactorEnabled ? 'Disable' : 'Enable'}
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <History className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-900">Active Sessions</h2>
            <p className="text-sm text-gray-500">
              Manage and logout from your active sessions on other browsers and devices.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">
                  {session.device} {session.current && '(Current)'}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{session.browser}</span>
                  <span className="mx-2">•</span>
                  <span>{session.location}</span>
                  <span className="mx-2">•</span>
                  <span>{session.ip}</span>
                </div>
                <p className="text-xs text-gray-500">
                  Last active: {new Date(session.lastActive).toLocaleString()}
                </p>
              </div>
              {!session.current && (
                <button
                  onClick={() => handleRevokeSession(session.id)}
                  className="btn btn-secondary"
                >
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSecurity;