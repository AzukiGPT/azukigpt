import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, Shield, LogOut } from 'lucide-react';

const mockUser = {
  firstName: 'Sarah',
  lastName: 'Martin',
  email: 'sarah.martin@example.com',
  avatar: null
};

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center"
      >
        {mockUser.avatar ? (
          <img
            src={mockUser.avatar}
            alt={`${mockUser.firstName} ${mockUser.lastName}`}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {mockUser.firstName[0]}{mockUser.lastName[0]}
            </span>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 border-2 border-gray-100">
          <div className="py-1" role="menu">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">
                {mockUser.firstName} {mockUser.lastName}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {mockUser.email}
              </p>
            </div>

            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4 mr-3 text-gray-400" />
              Profile
            </Link>

            <Link
              to="/profile/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 mr-3 text-gray-400" />
              Settings
            </Link>

            <Link
              to="/profile/security"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <Shield className="h-4 w-4 mr-3 text-gray-400" />
              Security
            </Link>

            <button
              className="flex w-full items-center px-4 py-2 text-sm text-error hover:bg-error/5"
              onClick={() => {
                setIsOpen(false);
                // Logout logic here
              }}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;