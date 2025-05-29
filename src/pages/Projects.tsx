
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Project, Department } from '@/types';
import { Briefcase, Search, Filter, Plus, Calendar, DollarSign, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
  },
  {
    id: 'PRJ004',
    name: 'Marketing Campaign Launch',
    description: 'New product marketing across East Africa',
    branchId: 'BR001',
    department: Department.SALES_MARKETING,
    managerId: 'EMP004',
    managerName: 'Sarah Johnson',
    startDate: '2024-04-01',
    endDate: '2024-09-30',
    budget: 120000,
    status: 'Planning',
    progress: 10
  }
];

const Projects = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = mockProjects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Planning':
        return 'bg-blue-100 text-blue-800';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar 
          title="Project Management" 
          subtitle="Oversee projects across all branches"
        />
        
        <main className="flex-1 px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Project Management</h1>
              <p className="text-muted-foreground">Track and manage projects across departments</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search projects..."
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
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="glass-card glass-card-hover rounded-xl p-6 cursor-pointer transition-all duration-300"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.id}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                    getStatusColor(project.status)
                  )}>
                    {project.status}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Manager:</span>
                    <span>{project.managerName}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Department:</span>
                    <span>{project.department}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="font-semibold">TSh {project.budget.toLocaleString()}</span>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-semibold">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedProject && (
            <div className="mt-8 glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Project Details: {selectedProject.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Project Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Project ID:</span>
                      <span className="text-sm">{selectedProject.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Department:</span>
                      <span className="text-sm">{selectedProject.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Manager:</span>
                      <span className="text-sm">{selectedProject.managerName}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Timeline & Budget</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Start Date:</span>
                      <span className="text-sm">{selectedProject.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">End Date:</span>
                      <span className="text-sm">{selectedProject.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Budget:</span>
                      <span className="text-sm font-semibold">TSh {selectedProject.budget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{selectedProject.description}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Projects;
