import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { Branch } from '@/types';

interface HeaderProps {
  title: string;
  subtitle?: string;
  mockBranches: Branch[];
  allEmployees: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    branchId: string;
  }>;
  mockProjects: Array<{
    id: string;
    name: string;
    description: string;
  }>;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  mockBranches,
  allEmployees,
  mockProjects
}) => {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('BR001');
  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user] = useState({
    name: 'CEO Amani Mwema',
    role: 'CEO',
    initials: 'AM',
  });

  const filteredEmployees = allEmployees.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProjects = mockProjects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  }, []);

  // Handle branch selection
  const handleBranchSelect = (branchId: string) => {
    setSelectedBranch(branchId);
    setShowBranchMenu(false);
    const branch = mockBranches.find(b => b.id === branchId);
    if (branch) {
      toast.info(`Switched to ${branch.name}`);
    }
  };

  // Handle profile menu actions
  const handleViewProfile = () => {
    setShowProfileMenu(false);
    toast.info('View Profile clicked');
  };

  const handleLogout = () => {
    setShowProfileMenu(false);
    toast.info('Logout clicked');
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('#branch-menu') && !target.closest('#branch-button')) {
        setShowBranchMenu(false);
      }
      if (!target.closest('#profile-menu') && !target.closest('#profile-button')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="border-b">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle || `${currentDate} - Tanzania Operations`}</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Input
              placeholder="Search employees, projects..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <div className="absolute left-0 right-0 mt-2 bg-white border rounded shadow z-10 max-h-60 overflow-y-auto">
                {filteredEmployees.length > 0 && (
                  <div className="p-2 border-b text-xs text-muted-foreground">Employees</div>
                )}
                {filteredEmployees.map(emp => (
                  <div key={emp.id} className="p-2 hover:bg-muted cursor-pointer flex flex-col"
                    onClick={() => toast.info(`${emp.name} (${emp.role}) - ${emp.email}`)}>
                    <span className="font-medium">{emp.name}</span>
                    <span className="text-xs text-muted-foreground">{emp.email} &middot; {emp.role}</span>
                  </div>
                ))}
                {filteredProjects.length > 0 && (
                  <div className="p-2 border-b text-xs text-muted-foreground">Projects</div>
                )}
                {filteredProjects.map(proj => (
                  <div key={proj.id} className="p-2 hover:bg-muted cursor-pointer flex flex-col"
                    onClick={() => toast.info(`${proj.name}: ${proj.description}`)}>
                    <span className="font-medium">{proj.name}</span>
                    <span className="text-xs text-muted-foreground">{proj.description}</span>
                  </div>
                ))}
                {filteredEmployees.length === 0 && filteredProjects.length === 0 && (
                  <div className="p-2 text-xs text-muted-foreground">No results found.</div>
                )}
              </div>
            )}
          </div>

          {/* Branch Selector */}
          <div className="relative flex items-center gap-2">
            <button
              id="branch-button"
              className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-muted focus:outline-none"
              onClick={() => setShowBranchMenu(prev => !prev)}
              type="button"
            >
              <span className="font-medium">
                {mockBranches.find(b => b.id === selectedBranch)?.name || 'Select Branch'}
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {showBranchMenu && (
              <div 
                id="branch-menu"
                className="absolute top-full left-0 mt-1 w-[180px] bg-white border rounded-md shadow-lg z-20"
              >
                {mockBranches.map(branch => (
                  <button
                    key={branch.id}
                    className={`w-full text-left px-4 py-2 hover:bg-muted focus:outline-none ${
                      branch.id === selectedBranch ? 'bg-muted' : ''
                    }`}
                    onClick={() => handleBranchSelect(branch.id)}
                    type="button"
                  >
                    {branch.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative flex items-center gap-2">
            <button
              id="profile-button"
              className="flex items-center gap-2 cursor-pointer focus:outline-none"
              onClick={() => setShowProfileMenu(prev => !prev)}
              type="button"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                {user.initials}
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.role}</span>
              </div>
            </button>
            {showProfileMenu && (
              <div 
                id="profile-menu"
                className="absolute right-0 mt-12 w-40 bg-white border rounded shadow z-20"
              >
                <button
                  className="w-full text-left px-4 py-2 hover:bg-muted focus:outline-none"
                  onClick={handleViewProfile}
                  type="button"
                >
                  View Profile
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-muted focus:outline-none"
                  onClick={handleLogout}
                  type="button"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 