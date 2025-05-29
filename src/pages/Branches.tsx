
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Branch, Department } from '@/types';
import { Building2, Users, MapPin, Mail, Phone, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const mockBranches: Branch[] = [
  {
    id: 'BR001',
    name: 'Dar es Salaam HQ',
    location: 'Dar es Salaam, Tanzania',
    manager: 'John Mwalimu',
    status: 'Active',
    employeeCount: 156,
    departments: [Department.HR, Department.FINANCE, Department.OPERATIONS, Department.SALES_MARKETING, Department.IT, Department.PROCUREMENT]
  },
  {
    id: 'BR002', 
    name: 'Arusha Branch',
    location: 'Arusha, Tanzania',
    manager: 'Sarah Kilimanjaro',
    status: 'Active',
    employeeCount: 89,
    departments: [Department.HR, Department.FINANCE, Department.OPERATIONS, Department.SALES_MARKETING]
  },
  {
    id: 'BR003',
    name: 'Mwanza Branch', 
    location: 'Mwanza, Tanzania',
    manager: 'David Nyerere',
    status: 'Active',
    employeeCount: 67,
    departments: [Department.HR, Department.FINANCE, Department.OPERATIONS, Department.PROCUREMENT]
  },
  {
    id: 'BR004',
    name: 'Dodoma Branch',
    location: 'Dodoma, Tanzania', 
    manager: 'Grace Magufuli',
    status: 'Active',
    employeeCount: 45,
    departments: [Department.HR, Department.FINANCE, Department.OPERATIONS]
  }
];

const Branches = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const filteredBranches = mockBranches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar 
          title="Branch Management" 
          subtitle="Manage branches across Tanzania"
        />
        
        <main className="flex-1 px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Branch Management</h1>
              <p className="text-muted-foreground">Oversee all branch operations and performance</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Branch
            </Button>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search branches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBranches.map((branch) => (
              <div 
                key={branch.id}
                className="glass-card glass-card-hover rounded-xl p-6 cursor-pointer transition-all duration-300"
                onClick={() => setSelectedBranch(branch)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{branch.name}</h3>
                      <p className="text-sm text-muted-foreground">{branch.id}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-status-operational/10 px-2 py-1 text-xs font-medium text-status-operational">
                    {branch.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{branch.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{branch.employeeCount} employees</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span>{branch.departments.length} departments</span>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Manager</span>
                      <span className="text-sm font-medium">{branch.manager}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedBranch && (
            <div className="mt-8 glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Branch Details: {selectedBranch.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Departments</h3>
                  <div className="space-y-2">
                    {selectedBranch.departments.map((dept) => (
                      <div key={dept} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                        <span className="text-sm">{dept}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Quick Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Employees</span>
                      <span className="text-sm font-medium">{selectedBranch.employeeCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Active Projects</span>
                      <span className="text-sm font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Pending Tasks</span>
                      <span className="text-sm font-medium">45</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Branches;
