
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Branch, Project, Department } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, MapPin, Briefcase, TrendingUp } from 'lucide-react';

// Mock data for the Areno Management Hub
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

const mockProjects: Project[] = [
  {
    id: 'PRJ001',
    name: 'Digital Transformation Initiative',
    description: 'Implementing new digital systems across all branches',
    branchId: 'BR001',
    department: Department.IT,
    managerId: 'EMP001',
    managerName: 'Michael Hassan',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    budget: 250000,
    status: 'Active',
    progress: 65
  },
  {
    id: 'PRJ002', 
    name: 'Employee Training Program',
    description: 'Comprehensive skills development program',
    branchId: 'BR002',
    department: Department.HR,
    managerId: 'EMP002',
    managerName: 'Fatima Said',
    startDate: '2024-03-01',
    endDate: '2024-08-30',
    budget: 85000,
    status: 'Active',
    progress: 40
  },
  {
    id: 'PRJ003',
    name: 'Infrastructure Expansion',
    description: 'Expanding warehouse and office facilities',
    branchId: 'BR003',
    department: Department.OPERATIONS,
    managerId: 'EMP003', 
    managerName: 'James Mbeki',
    startDate: '2024-02-10',
    endDate: '2024-10-15',
    budget: 180000,
    status: 'Active',
    progress: 25
  }
];

const Index = () => {
  const isMobile = useIsMobile();
  const [currentDate, setCurrentDate] = useState<string>('');
  
  useEffect(() => {
    // Set current date in Swahili/English format
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar 
          title="Areno Management Hub" 
          subtitle={`${currentDate} - Tanzania Operations`}
        />
        
        <main className="flex-1 p-4 md:p-6 space-y-6">
          <DashboardOverview />
          
          <section className="slide-enter" style={{ animationDelay: '0.4s' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-semibold">Active Branches</h2>
              <button className="text-xs text-primary hover:underline">
                View all branches
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockBranches.map((branch) => (
                <Card
                  key={branch.id}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-primary"
                  onClick={() => console.log(`Navigate to ${branch.name}`)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-primary" />
                        <div>
                          <CardTitle className="text-sm">{branch.name}</CardTitle>
                          <p className="text-xs text-muted-foreground">{branch.location}</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        {branch.status}
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Manager:</span>
                      <span className="font-medium">{branch.manager}</span>
                    </div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Employees:</span>
                      <span className="font-semibold">{branch.employeeCount}</span>
                    </div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Departments:</span>
                      <span className="font-semibold">{branch.departments.length}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="slide-enter" style={{ animationDelay: '0.6s' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-semibold">Active Projects</h2>
              <button className="text-xs text-primary hover:underline">
                View all projects
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {mockProjects.map((project) => (
                <Card
                  key={project.id}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-blue-500"
                  onClick={() => console.log(`Navigate to ${project.name}`)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-blue-600" />
                        <div>
                          <CardTitle className="text-sm">{project.name}</CardTitle>
                          <p className="text-xs text-muted-foreground">{project.department}</p>
                        </div>
                      </div>
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                        project.status === 'Active' ? 'bg-green-100 text-green-700' :
                        project.status === 'Planning' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      )}>
                        {project.status}
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Manager:</span>
                      <span className="font-medium">{project.managerName}</span>
                    </div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Budget:</span>
                      <span className="font-semibold">TSh {(project.budget / 1000).toFixed(0)}K</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progress:</span>
                        <span className="font-semibold">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
