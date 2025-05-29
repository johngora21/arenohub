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

const Reports = () => {
  const isMobile = useIsMobile();
  const [newReportDialog, setNewReportDialog] = useState(false);
  const [newReport, setNewReport] = useState({
    title: '',
    description: '',
    type: '',
    date: ''
  });

  const handleNewReport = () => {
    // Validate form
    if (!newReport.title || !newReport.type || !newReport.date) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Here you would typically make an API call to create the report
    console.log('Creating new report:', newReport);
    
    // Show success message
    toast.success('New report created successfully');
    
    // Reset form and close dialog
    setNewReport({
      title: '',
      description: '',
      type: '',
      date: ''
    });
    setNewReportDialog(false);
  };

  // Mock reports data
  const mockReports = [
    {
      id: 'REP001',
      title: 'Monthly Sales Report',
      type: 'Sales',
      date: '2024-03-01',
      status: 'Approved',
      submittedBy: 'Michael Hassan',
      branch: 'Dar es Salaam HQ'
    },
    {
      id: 'REP002',
      title: 'Employee Performance Review',
      type: 'HR',
      date: '2024-03-05',
      status: 'Pending',
      submittedBy: 'Fatima Said',
      branch: 'Arusha Branch'
    },
    {
      id: 'REP003',
      title: 'Project Progress Report',
      type: 'Project',
      date: '2024-03-10',
      status: 'Rejected',
      submittedBy: 'James Mbeki',
      branch: 'Mwanza Branch'
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
          title="Reports"
          subtitle="Manage and generate reports"
          mockBranches={mockBranches}
          allEmployees={allEmployees}
          mockProjects={mockProjects}
        />
        
        <main className="flex-1 p-4 md:p-6 space-y-8">
          {/* Report List */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Report List</h2>
              <Dialog open={newReportDialog} onOpenChange={setNewReportDialog}>
                <DialogTrigger asChild>
                  <Button>New Report</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Report</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Report Title</Label>
                      <Input
                        id="title"
                        value={newReport.title}
                        onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newReport.description}
                        onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Report Type</Label>
                      <Input
                        id="type"
                        value={newReport.type}
                        onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newReport.date}
                        onChange={(e) => setNewReport({ ...newReport, date: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleNewReport}>Create Report</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockReports.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <CardTitle>{report.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Type: {report.type}</p>
                    <p className="text-sm text-muted-foreground">Date: {report.date}</p>
                    <p className="text-sm text-muted-foreground">Status: {report.status}</p>
                    <p className="text-sm text-muted-foreground">Submitted by: {report.submittedBy}</p>
                    <p className="text-sm text-muted-foreground">Branch: {report.branch}</p>
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

export default Reports;
