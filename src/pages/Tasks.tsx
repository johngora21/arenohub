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

const Tasks = () => {
  const isMobile = useIsMobile();
  const [newTaskDialog, setNewTaskDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    dueDate: '',
    priority: ''
  });

  const handleNewTask = () => {
    // Validate form
    if (!newTask.title || !newTask.assignee || !newTask.dueDate || !newTask.priority) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Here you would typically make an API call to create the task
    console.log('Creating new task:', newTask);
    
    // Show success message
    toast.success('New task created successfully');
    
    // Reset form and close dialog
    setNewTask({
      title: '',
      description: '',
      assignee: '',
      dueDate: '',
      priority: ''
    });
    setNewTaskDialog(false);
  };

  // Mock tasks data
  const mockTasks = [
    {
      id: 'TASK001',
      title: 'Complete Project Documentation',
      description: 'Write comprehensive documentation for the new project',
      assignee: 'Michael Hassan',
      dueDate: '2024-03-20',
      priority: 'High',
      status: 'In Progress'
    },
    {
      id: 'TASK002',
      title: 'Review Employee Performance',
      description: 'Conduct quarterly performance reviews for team members',
      assignee: 'Fatima Said',
      dueDate: '2024-03-25',
      priority: 'Medium',
      status: 'Pending'
    },
    {
      id: 'TASK003',
      title: 'Update System Security',
      description: 'Implement latest security patches and updates',
      assignee: 'James Mbeki',
      dueDate: '2024-03-15',
      priority: 'High',
      status: 'Completed'
    }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Header
          title="Tasks"
          subtitle="Manage your tasks"
          mockBranches={mockBranches}
          allEmployees={allEmployees}
          mockProjects={mockProjects}
        />
        
        <main className="flex-1 p-4 md:p-6 space-y-8">
          {/* Task List */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Task List</h2>
              <Dialog open={newTaskDialog} onOpenChange={setNewTaskDialog}>
                <DialogTrigger asChild>
                  <Button>New Task</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Task Title</Label>
                      <Input
                        id="title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="assignee">Assignee</Label>
                      <Input
                        id="assignee"
                        value={newTask.assignee}
                        onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Input
                        id="priority"
                        value={newTask.priority}
                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleNewTask}>Create Task</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockTasks.map((task) => (
                <Card key={task.id}>
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    <p className="text-sm text-muted-foreground">Assignee: {task.assignee}</p>
                    <p className="text-sm text-muted-foreground">Due Date: {task.dueDate}</p>
                    <p className="text-sm text-muted-foreground">Priority: {task.priority}</p>
                    <p className="text-sm text-muted-foreground">Status: {task.status}</p>
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

export default Tasks;
