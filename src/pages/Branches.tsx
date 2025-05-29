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

const Branches = () => {
  const isMobile = useIsMobile();
  const [newBranchDialog, setNewBranchDialog] = useState(false);
  const [newBranch, setNewBranch] = useState({
    name: '',
    location: '',
    manager: '',
    departments: [] as string[]
  });

  const handleNewBranch = () => {
    // Validate form
    if (!newBranch.name || !newBranch.location || !newBranch.manager || newBranch.departments.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Here you would typically make an API call to create the branch
    console.log('Creating new branch:', newBranch);
    
    // Show success message
    toast.success('New branch created successfully');
    
    // Reset form and close dialog
    setNewBranch({
      name: '',
      location: '',
      manager: '',
      departments: []
    });
    setNewBranchDialog(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Header
          title="Branches"
          subtitle="Manage your branches"
          mockBranches={mockBranches}
          allEmployees={allEmployees}
          mockProjects={mockProjects}
        />
        
        <main className="flex-1 p-4 md:p-6 space-y-8">
          {/* Branch List */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Branch List</h2>
              <Dialog open={newBranchDialog} onOpenChange={setNewBranchDialog}>
                <DialogTrigger asChild>
                  <Button>Add Branch</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Branch</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Branch Name</Label>
                      <Input
                        id="name"
                        value={newBranch.name}
                        onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newBranch.location}
                        onChange={(e) => setNewBranch({ ...newBranch, location: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="manager">Manager</Label>
                      <Input
                        id="manager"
                        value={newBranch.manager}
                        onChange={(e) => setNewBranch({ ...newBranch, manager: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleNewBranch}>Create Branch</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockBranches.map((branch) => (
                <Card key={branch.id}>
                  <CardHeader>
                    <CardTitle>{branch.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{branch.location}</p>
                    <p className="text-sm text-muted-foreground">Manager: {branch.manager}</p>
                    <p className="text-sm text-muted-foreground">Employees: {branch.employeeCount}</p>
                    <p className="text-sm text-muted-foreground">Departments: {branch.departments.join(', ')}</p>
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

export default Branches;
