
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Transaction, Department } from '@/types';
import { DollarSign, TrendingUp, TrendingDown, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

  const filteredTransactions = mockTransactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalIncome = mockTransactions.filter(t => t.type === 'Income' && t.status === 'Approved').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = mockTransactions.filter(t => t.type === 'Expense' && t.status === 'Approved').reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar 
          title="Financial Management" 
          subtitle="Track finances across all branches"
        />
        
        <main className="flex-1 p-4 md:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Financial Management</h1>
              <p className="text-sm text-muted-foreground">Monitor financial performance and transactions</p>
            </div>
            <Button className="flex items-center gap-2 w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              New Transaction
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Income</p>
                    <p className="text-lg font-bold text-green-600">TSh {(totalIncome / 1000000).toFixed(1)}M</p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Expenses</p>
                    <p className="text-lg font-bold text-red-600">TSh {(totalExpenses / 1000).toFixed(0)}K</p>
                  </div>
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Net Profit</p>
                    <p className={cn(
                      "text-lg font-bold",
                      netProfit >= 0 ? "text-green-600" : "text-red-600"
                    )}>
                      TSh {(netProfit / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-2 text-xs font-medium">ID</th>
                      <th className="text-left py-2 px-2 text-xs font-medium">Type</th>
                      <th className="text-left py-2 px-2 text-xs font-medium">Description</th>
                      <th className="text-left py-2 px-2 text-xs font-medium">Amount</th>
                      <th className="text-left py-2 px-2 text-xs font-medium">Date</th>
                      <th className="text-left py-2 px-2 text-xs font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-border hover:bg-muted/30">
                        <td className="py-3 px-2 text-xs font-medium">{transaction.id}</td>
                        <td className="py-3 px-2">
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            transaction.type === 'Income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          )}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-xs">{transaction.description}</td>
                        <td className="py-3 px-2 text-xs font-semibold">TSh {transaction.amount.toLocaleString()}</td>
                        <td className="py-3 px-2 text-xs">{transaction.date}</td>
                        <td className="py-3 px-2">
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            transaction.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          )}>
                            {transaction.status}
                          </span>
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
