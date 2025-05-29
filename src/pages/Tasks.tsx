
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Task, Department } from '@/types';
import { CheckSquare, Search, Filter, Plus, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const mockTasks: Task[] = [
  {
    id: 'TSK001',
    title: 'Setup new database servers',
    description: 'Configure and deploy new database infrastructure for the digital transformation project',
    projectId: 'PRJ001',
    assignedTo: 'EMP005',
    assignedBy: 'EMP001',
    branchId: 'BR001',
    department: Department.IT,
    priority: 'High',
    status: 'In Progress',
    dueDate: '2024-02-15',
    createdDate: '2024-01-20'
  },
  {
    id: 'TSK002',
    title: 'Conduct employee interviews',
    description: 'Interview candidates for new positions in HR department',
    projectId: 'PRJ002',
    assignedTo: 'EMP006',
    assignedBy: 'EMP002',
    branchId: 'BR002',
    department: Department.HR,
    priority: 'Medium',
    status: 'Todo',
    dueDate: '2024-02-20',
    createdDate: '2024-01-25'
  },
  {
    id: 'TSK003',
    title: 'Site preparation for expansion',
    description: 'Prepare construction site for new warehouse facility',
    projectId: 'PRJ003',
    assignedTo: 'EMP007',
    assignedBy: 'EMP003',
    branchId: 'BR003',
    department: Department.OPERATIONS,
    priority: 'Critical',
    status: 'In Progress',
    dueDate: '2024-02-10',
    createdDate: '2024-01-15'
  },
  {
    id: 'TSK004',
    title: 'Market research analysis',
    description: 'Analyze competitor pricing and market trends for new campaign',
    projectId: 'PRJ004',
    assignedTo: 'EMP008',
    assignedBy: 'EMP004',
    branchId: 'BR001',
    department: Department.SALES_MARKETING,
    priority: 'Medium',
    status: 'Review',
    dueDate: '2024-02-25',
    createdDate: '2024-01-30'
  }
];

const Tasks = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filteredTasks = mockTasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Todo':
        return 'bg-gray-100 text-gray-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar 
          title="Task Management" 
          subtitle="Track and assign tasks across teams"
        />
        
        <main className="flex-1 px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Task Management</h1>
              <p className="text-muted-foreground">Assign and track tasks across departments</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Task
            </Button>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search tasks..."
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
            {filteredTasks.map((task) => (
              <div 
                key={task.id}
                className="glass-card glass-card-hover rounded-xl p-6 cursor-pointer transition-all duration-300"
                onClick={() => setSelectedTask(task)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CheckSquare className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">{task.id}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                      getPriorityColor(task.priority)
                    )}>
                      {task.priority}
                    </span>
                    {isOverdue(task.dueDate) && task.status !== 'Completed' && (
                      <div className="flex items-center gap-1 text-red-500">
                        <AlertCircle className="w-3 h-3" />
                        <span className="text-xs">Overdue</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {task.description}
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Department:</span>
                    <span>{task.department}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Due Date:</span>
                    <span className={cn(
                      isOverdue(task.dueDate) && task.status !== 'Completed' && 'text-red-500 font-medium'
                    )}>
                      {task.dueDate}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Assigned To:</span>
                    <span>{task.assignedTo}</span>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getStatusColor(task.status)
                      )}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedTask && (
            <div className="mt-8 glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Task Details: {selectedTask.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Task Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Task ID:</span>
                      <span className="text-sm">{selectedTask.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Project:</span>
                      <span className="text-sm">{selectedTask.projectId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Department:</span>
                      <span className="text-sm">{selectedTask.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Priority:</span>
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getPriorityColor(selectedTask.priority)
                      )}>
                        {selectedTask.priority}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Assignment & Timeline</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Assigned To:</span>
                      <span className="text-sm">{selectedTask.assignedTo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Assigned By:</span>
                      <span className="text-sm">{selectedTask.assignedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Created:</span>
                      <span className="text-sm">{selectedTask.createdDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Due Date:</span>
                      <span className="text-sm">{selectedTask.dueDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{selectedTask.description}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Tasks;
