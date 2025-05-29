import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building2, 
  Users, 
  Briefcase, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  ArrowUpRight,
  Activity,
  Plus,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { mockBranches, mockProjects, allEmployees } from '@/data/mockData';

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  // Dialog states
  const [newProjectDialog, setNewProjectDialog] = useState(false);
  const [newEmployeeDialog, setNewEmployeeDialog] = useState(false);
  const [newBranchDialog, setNewBranchDialog] = useState(false);
  const [reportDialog, setReportDialog] = useState(false);

  // Form states
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    department: '',
    startDate: '',
    endDate: '',
    budget: ''
  });

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    department: '',
    role: '',
    branch: ''
  });

  const [newBranch, setNewBranch] = useState({
    name: '',
    location: '',
    manager: '',
    departments: [] as string[]
  });

  const [reportConfig, setReportConfig] = useState({
    type: '',
    dateRange: '',
    format: 'PDF'
  });

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Header
          title="Areno Management Hub"
          mockBranches={mockBranches}
          allEmployees={allEmployees}
          mockProjects={mockProjects}
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
        </main>
      </div>
    </div>
  );
};

export default Index;
