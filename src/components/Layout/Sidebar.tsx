import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  FolderArchive, 
  Settings, 
  Building2,
  Command,
  CalendarDays,
  HelpCircle,
  X
} from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

const navigation = [
  { name: 'Accueil', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Feuille de Route', href: '/dashboard/roadmap', icon: CalendarDays },
  { name: 'Templates', href: '/dashboard/templates', icon: FileText },
  { name: 'Assets', href: '/dashboard/assets', icon: FolderArchive },
  { name: 'Entreprise', href: '/dashboard/company', icon: Building2 },
  { name: 'Paramètres', href: '/dashboard/settings', icon: Settings },
  { name: 'Aide & Support', href: '/dashboard/help', icon: HelpCircle },
];

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r-2 border-gray-100 bg-white px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center justify-between">
        <Link to="/dashboard" className="flex items-center">
          <Command className="h-8 w-8 text-primary" />
          <span className="ml-2 text-xl font-bold text-gray-900">MarketingGPT</span>
        </Link>
        {onClose && (
          <button
            type="button"
            className="lg:hidden -m-2.5 p-2.5 text-gray-700 hover:text-gray-900"
            onClick={onClose}
          >
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        )}
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || 
                               (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className={`
                        group flex gap-x-3 rounded-xl p-3 text-sm font-medium 
                        transition-all duration-200
                        ${isActive
                          ? 'bg-primary/5 text-primary shadow-sm'
                          : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                        }
                      `}
                    >
                      <item.icon className={`h-6 w-6 shrink-0 ${
                        isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary/60'
                      }`} />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;