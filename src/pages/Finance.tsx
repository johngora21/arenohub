import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Transaction, Department } from '@/types';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Building2,
  FileText,
  Download,
  Upload,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Receipt,
  CreditCard,
  Wallet,
  BarChart3,
  PieChart,
  LineChart,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { mockBranches, mockProjects, allEmployees } from '@/data/mockData';

const mockTransactions: Transaction[] = [
  {
    id: 'TXN001',
    type: 'Income',
    amount: 150000,
    description: 'Project payment from client ABC',
    category: 'Project Revenue',
    branchId: 'BR001',
    department: Department.FINANCE,
    date: '2024-01-15',
    approvedBy: 'EMP001',
    status: 'Approved'
  },
  {
    id: 'TXN002',
    type: 'Expense',
    amount: 25000,
    description: 'Office supplies and equipment',
    category: 'Office Expenses',
    branchId: 'BR002',
    department: Department.OPERATIONS,
    date: '2024-01-20',
    status: 'Pending'
  },
  {
    id: 'TXN003',
    type: 'Income',
    amount: 80000,
    description: 'Consulting services revenue',
    category: 'Service Revenue',
    branchId: 'BR003',
    department: Department.FINANCE,
    date: '2024-01-25',
    approvedBy: 'EMP002',
    status: 'Approved'
  }
];

const Finance = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isNewTransactionDialogOpen, setIsNewTransactionDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [newTransaction, setNewTransaction] = useState({
    type: 'Income',
    amount: '',
    description: '',
    category: '',
    branchId: '',
    department: Department.FINANCE
  });

  const filteredTransactions = mockTransactions.filter(transaction =>
    (transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedType === 'all' || transaction.type === selectedType) &&
    (selectedBranch === 'all' || transaction.branchId === selectedBranch) &&
    (selectedStatus === 'all' || transaction.status === selectedStatus)
  );

  const totalIncome = mockTransactions.filter(t => t.type === 'Income' && t.status === 'Approved').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = mockTransactions.filter(t => t.type === 'Expense' && t.status === 'Approved').reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalIncome - totalExpenses;
  const pendingTransactions = mockTransactions.filter(t => t.status === 'Pending').length;

  const incomeChange = 12.5; // Mock percentage change
  const expensesChange = -8.3; // Mock percentage change
  const profitChange = 15.7; // Mock percentage change

  const handleNewTransaction = () => {
    // Here you would typically make an API call to create the transaction
    toast.success('Transaction added successfully');
    setIsNewTransactionDialogOpen(false);
    setNewTransaction({
      type: 'Income',
      amount: '',
      description: '',
      category: '',
      branchId: '',
      department: Department.FINANCE
    });
  };

  const handleExport = () => {
    // Here you would typically handle the export logic
    toast.success('Report exported successfully');
    setIsExportDialogOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Header
          title="Financial Management"
          subtitle="Track finances across all branches"
          mockBranches={mockBranches}
          allEmployees={allEmployees}
          mockProjects={mockProjects}
        />
        
        <main className="flex-1 p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {incomeChange > 0 ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      {incomeChange}%
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1">
                      <ArrowDownRight className="w-3 h-3" />
                      {Math.abs(incomeChange)}%
                    </span>
                  )}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">TSh {(totalIncome / 1000000).toFixed(1)}M</h3>
              <p className="text-sm text-muted-foreground">Total Income</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {expensesChange > 0 ? (
                    <span className="text-red-600 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      {expensesChange}%
                    </span>
                  ) : (
                    <span className="text-green-600 flex items-center gap-1">
                      <ArrowDownRight className="w-3 h-3" />
                      {Math.abs(expensesChange)}%
                    </span>
                  )}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">TSh {(totalExpenses / 1000000).toFixed(1)}M</h3>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {profitChange > 0 ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      {profitChange}%
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1">
                      <ArrowDownRight className="w-3 h-3" />
                      {Math.abs(profitChange)}%
                    </span>
                  )}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">TSh {(netProfit / 1000000).toFixed(1)}M</h3>
              <p className="text-sm text-muted-foreground">Net Profit</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Receipt className="w-5 h-5 text-yellow-600" />
                </div>
                <Badge variant="outline" className="text-xs">
                  Pending
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{pendingTransactions}</h3>
              <p className="text-sm text-muted-foreground">Pending Transactions</p>
            </Card>
          </div>

          {/* Actions and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon" aria-label="Filter" onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Dialog open={isNewTransactionDialogOpen} onOpenChange={setIsNewTransactionDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Transaction
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Transaction</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Transaction Type</Label>
                      <Select
                        value={newTransaction.type}
                        onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Income">Income</SelectItem>
                          <SelectItem value="Expense">Expense</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Amount</Label>
                      <Input
                        type="number"
                        value={newTransaction.amount}
                        onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                        placeholder="Enter amount"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={newTransaction.description}
                        onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                        placeholder="Enter transaction description"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Input
                        value={newTransaction.category}
                        onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                        placeholder="Enter category"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Branch</Label>
                      <Select
                        value={newTransaction.branchId}
                        onValueChange={(value) => setNewTransaction({ ...newTransaction, branchId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BR001">Headquarters</SelectItem>
                          <SelectItem value="BR002">Mbeya Branch</SelectItem>
                          <SelectItem value="BR003">Mwanza Branch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewTransactionDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleNewTransaction}>
                      Add Transaction
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Export Financial Report</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Report Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income">Income Statement</SelectItem>
                          <SelectItem value="expense">Expense Report</SelectItem>
                          <SelectItem value="profit">Profit & Loss</SelectItem>
                          <SelectItem value="all">Complete Financial Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Date Range</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Input type="date" placeholder="Start Date" />
                        <Input type="date" placeholder="End Date" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Format</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleExport}>
                      Export Report
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="my-4 p-4 bg-muted rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Transaction Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Income">Income</SelectItem>
                    <SelectItem value="Expense">Expense</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="BR001">Headquarters</SelectItem>
                    <SelectItem value="BR002">Mbeya Branch</SelectItem>
                    <SelectItem value="BR003">Mwanza Branch</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Tabs defaultValue="all" className="w-[400px]">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="income">Income</TabsTrigger>
                    <TabsTrigger value="expense">Expense</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-2 text-xs font-medium">ID</th>
                      <th className="text-left py-2 px-2 text-xs font-medium">Type</th>
                      <th className="text-left py-2 px-2 text-xs font-medium">Description</th>
                      <th className="text-left py-2 px-2 text-xs font-medium">Category</th>
                      <th className="text-left py-2 px-2 text-xs font-medium">Amount</th>
                      <th className="text-left py-2 px-2 text-xs font-medium">Date</th>
                      <th className="text-left py-2 px-2 text-xs font-medium">Status</th>
                      <th className="text-left py-2 px-2 text-xs font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-border hover:bg-muted/30">
                        <td className="py-3 px-2 text-xs font-medium">{transaction.id}</td>
                        <td className="py-3 px-2">
                          <Badge variant={transaction.type === 'Income' ? 'success' : 'destructive'}>
                            {transaction.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-xs">{transaction.description}</td>
                        <td className="py-3 px-2 text-xs">{transaction.category}</td>
                        <td className="py-3 px-2 text-xs font-semibold">
                          TSh {transaction.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-2 text-xs">{transaction.date}</td>
                        <td className="py-3 px-2">
                          <Badge
                            variant={
                              transaction.status === 'Approved' ? 'success' :
                              transaction.status === 'Pending' ? 'warning' :
                              'destructive'
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <FileText className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Finance;
