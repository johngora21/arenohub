import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { mockBranches, mockProjects, allEmployees } from '@/data/mockData';

const Projects = () => {
  const isMobile = useIsMobile();
  const [newProjectDialog, setNewProjectDialog] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    department: '',
    startDate: '',
    endDate: '',
    budget: ''
  });

  const handleNewProject = () => {
    // Validate form
    if (!newProject.name || !newProject.department || !newProject.startDate || !newProject.endDate || !newProject.budget) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Here you would typically make an API call to create the project
    console.log('Creating new project:', newProject);
    
    // Show success message
    toast.success('New project created successfully');
    
    // Reset form and close dialog
    setNewProject({
      name: '',
      description: '',
      department: '',
      startDate: '',
      endDate: '',
      budget: ''
    });
    setNewProjectDialog(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Header
          title="Projects"
          subtitle="Manage your projects"
          mockBranches={mockBranches}
          allEmployees={allEmployees}
          mockProjects={mockProjects}
        />
        
        <main className="flex-1 p-4 md:p-6 space-y-8">
          {/* Project List */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Project List</h2>
              <Dialog open={newProjectDialog} onOpenChange={setNewProjectDialog}>
                <DialogTrigger asChild>
                  <Button>New Project</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Project Name</Label>
                      <Input
                        id="name"
                        value={newProject.name}
                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={newProject.department}
                        onChange={(e) => setNewProject({ ...newProject, department: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newProject.startDate}
                        onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={newProject.endDate}
                        onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget</Label>
                      <Input
                        id="budget"
                        type="number"
                        value={newProject.budget}
                        onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleNewProject}>Create Project</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <p className="text-sm text-muted-foreground">Department: {project.department}</p>
                    <p className="text-sm text-muted-foreground">Manager: {project.managerName}</p>
                    <p className="text-sm text-muted-foreground">Budget: TSh {(project.budget / 1000).toFixed(0)}K</p>
                    <p className="text-sm text-muted-foreground">Progress: {project.progress}%</p>
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

export default Projects;
