import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Branch, Project, Department } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building2, 
  Users, 
  Briefcase, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  ArrowUpRight,
  Activity
} from 'lucide-react';

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
        
        <main className="flex-1 p-4 md:p-6 space-y-8">
          {/* Key Metrics - Simplified */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Dashboard Overview</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                      <p className="text-xl font-bold">TSh 2.85M</p>
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +15%
                      </p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Employees</p>
                      <p className="text-xl font-bold">357</p>
                      <p className="text-xs text-blue-600">4 branches</p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Projects</p>
                      <p className="text-xl font-bold">23</p>
                      <p className="text-xs text-purple-600">Active</p>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Briefcase className="w-4 h-4 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Compliance</p>
                      <p className="text-xl font-bold">83%</p>
                      <p className="text-xs text-orange-600">3 expired</p>
                    </div>
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Branches Overview */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Active Branches</h3>
                <button className="text-sm text-primary hover:underline flex items-center gap-1">
                  View all <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockBranches.map((branch) => (
                  <Card
                    key={branch.id}
                    className="hover:shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => console.log(`Navigate to ${branch.name}`)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-primary" />
                          <div>
                            <CardTitle className="text-sm">{branch.name}</CardTitle>
                            <p className="text-xs text-muted-foreground">{branch.location}</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                          Active
                        </span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">Manager</span>
                          <p className="font-medium">{branch.manager}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Employees</span>
                          <p className="font-semibold">{branch.employeeCount}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <button className="w-full text-left p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Add Employee</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">Create Project</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">View Reports</span>
                    </div>
                  </button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-green-100 rounded-full">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium">Project completed</p>
                      <p className="text-xs text-muted-foreground">Digital Transformation - Arusha</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-blue-100 rounded-full">
                      <Users className="w-3 h-3 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium">New employee added</p>
                      <p className="text-xs text-muted-foreground">Sarah Mwema - HR Department</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-orange-100 rounded-full">
                      <AlertTriangle className="w-3 h-3 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium">Certificate expiring</p>
                      <p className="text-xs text-muted-foreground">3 employees - next week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Active Projects - Simplified */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Active Projects</h3>
              <button className="text-sm text-primary hover:underline flex items-center gap-1">
                View all <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockProjects.map((project) => (
                <Card
                  key={project.id}
                  className="hover:shadow-md transition-all duration-300 cursor-pointer"
                  onClick={() => console.log(`Navigate to ${project.name}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-sm">{project.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{project.department}</p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        {project.status}
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Budget</span>
                      <span className="font-semibold">TSh {(project.budget / 1000).toFixed(0)}K</span>
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
