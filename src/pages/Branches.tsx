
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Branch, Department } from '@/types';
import { Building2, Users, MapPin, Plus, Search, Filter, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        
        <main className="flex-1 p-4 md:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Branch Management</h1>
              <p className="text-sm text-muted-foreground">Oversee all branch operations and performance</p>
            </div>
            <Button className="flex items-center gap-2 w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              Add New Branch
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search branches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredBranches.map((branch) => (
              <Card 
                key={branch.id}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-primary"
                onClick={() => setSelectedBranch(branch)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{branch.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{branch.id}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      {branch.status}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs">{branch.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs">{branch.employeeCount} employees</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs">{branch.departments.length} departments</span>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Manager</span>
                      <span className="text-xs font-medium">{branch.manager}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedBranch && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Branch Details: {selectedBranch.name}</CardTitle>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Full Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3 text-sm">Departments</h3>
                    <div className="space-y-2">
                      {selectedBranch.departments.map((dept) => (
                        <div key={dept} className="flex items-center justify-between p-2 bg-muted/30 rounded text-xs">
                          <span>{dept}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3 text-sm">Quick Stats</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Total Employees</span>
                        <span className="font-medium">{selectedBranch.employeeCount}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Active Projects</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Pending Tasks</span>
                        <span className="font-medium">45</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Branches;
