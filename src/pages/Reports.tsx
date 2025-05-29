
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ChartBarSquare, Download, Filter, Calendar, 
  TrendingUp, TrendingDown, Users, Building2,
  DollarSign, Briefcase, FileText, BarChart3,
  PieChart, LineChart, Activity
} from 'lucide-react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  BarChart, Bar, LineChart as RechartsLineChart, Line,
  PieChart as RechartsPieChart, Cell, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

const ReportsPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for charts
  const monthlyRevenue = [
    { month: 'Jan', revenue: 45000, expenses: 32000 },
    { month: 'Feb', revenue: 52000, expenses: 35000 },
    { month: 'Mar', revenue: 48000, expenses: 31000 },
    { month: 'Apr', revenue: 61000, expenses: 42000 },
    { month: 'May', revenue: 55000, expenses: 38000 },
    { month: 'Jun', revenue: 67000, expenses: 45000 },
  ];

  const branchPerformance = [
    { name: 'Dar es Salaam HQ', projects: 12, employees: 45, revenue: 125000 },
    { name: 'Arusha Branch', projects: 8, employees: 28, revenue: 89000 },
    { name: 'Mwanza Branch', projects: 6, employees: 22, revenue: 67000 },
    { name: 'Dodoma Branch', projects: 4, employees: 18, revenue: 54000 },
  ];

  const departmentData = [
    { name: 'Operations', value: 35, color: '#3b82f6' },
    { name: 'Finance', value: 20, color: '#10b981' },
    { name: 'HR', value: 15, color: '#f59e0b' },
    { name: 'Sales & Marketing', value: 20, color: '#ef4444' },
    { name: 'IT', value: 10, color: '#8b5cf6' },
  ];

  const projectStatus = [
    { status: 'Completed', count: 24, percentage: 60 },
    { status: 'Active', count: 12, percentage: 30 },
    { status: 'Planning', count: 3, percentage: 7.5 },
    { status: 'On Hold', count: 1, percentage: 2.5 },
  ];

  const chartConfig = {
    revenue: { label: 'Revenue', color: '#3b82f6' },
    expenses: { label: 'Expenses', color: '#ef4444' },
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar 
          title="Reports & Analytics" 
          subtitle="Comprehensive business insights and performance metrics"
        />
        
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Business Analytics</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Track performance across all branches and departments
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Date Range</span>
              </Button>
              <Button size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Revenue</p>
                    <p className="text-lg font-bold">$337K</p>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12.5%
                    </div>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Active Projects</p>
                    <p className="text-lg font-bold">40</p>
                    <div className="flex items-center text-xs text-blue-600 mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +8.3%
                    </div>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Employees</p>
                    <p className="text-lg font-bold">113</p>
                    <div className="flex items-center text-xs text-purple-600 mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +5.2%
                    </div>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Branches</p>
                    <p className="text-lg font-bold">4</p>
                    <div className="flex items-center text-xs text-orange-600 mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +0%
                    </div>
                  </div>
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Building2 className="w-4 h-4 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="overview" className="text-xs md:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="financial" className="text-xs md:text-sm">Financial</TabsTrigger>
              <TabsTrigger value="projects" className="text-xs md:text-sm">Projects</TabsTrigger>
              <TabsTrigger value="hr" className="text-xs md:text-sm">HR Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue vs Expenses Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Revenue vs Expenses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-64">
                      <BarChart data={monthlyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="revenue" fill="var(--color-revenue)" />
                        <Bar dataKey="expenses" fill="var(--color-expenses)" />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Department Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Department Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <ChartTooltip />
                          <RechartsPieChart.Pie
                            data={departmentData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                          >
                            {departmentData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </RechartsPieChart.Pie>
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Branch Performance Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Branch Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Branch</th>
                          <th className="text-left p-2">Projects</th>
                          <th className="text-left p-2">Employees</th>
                          <th className="text-left p-2">Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        {branchPerformance.map((branch, index) => (
                          <tr key={index} className="border-b hover:bg-muted/50">
                            <td className="p-2 font-medium">{branch.name}</td>
                            <td className="p-2">{branch.projects}</td>
                            <td className="p-2">{branch.employees}</td>
                            <td className="p-2">${branch.revenue.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Revenue Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-64">
                      <RechartsLineChart data={monthlyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
                      </RechartsLineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Expense Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Salaries</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                          <span className="text-sm font-medium">60%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Operations</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                          </div>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Equipment</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                          </div>
                          <span className="text-sm font-medium">15%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Project Status Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {projectStatus.map((status, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Badge variant={status.status === 'Completed' ? 'default' : 'secondary'}>
                              {status.status}
                            </Badge>
                            <span className="text-sm">{status.count} projects</span>
                          </div>
                          <span className="text-sm font-medium">{status.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Project Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                        <span className="text-sm">Q1 2024</span>
                        <span className="text-sm font-medium">12 completed</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                        <span className="text-sm">Q2 2024</span>
                        <span className="text-sm font-medium">15 active</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                        <span className="text-sm">Q3 2024</span>
                        <span className="text-sm font-medium">8 planned</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="hr" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Employee Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">+15</div>
                      <p className="text-sm text-muted-foreground">New employees this quarter</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Certificate Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Valid</span>
                        <span className="text-sm font-medium text-green-600">85</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Expiring Soon</span>
                        <span className="text-sm font-medium text-yellow-600">20</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Expired</span>
                        <span className="text-sm font-medium text-red-600">8</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Attendance Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">94.5%</div>
                      <p className="text-sm text-muted-foreground">Average attendance</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default ReportsPage;
