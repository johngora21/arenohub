
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Transaction, Department } from '@/types';
import { DollarSign, TrendingUp, TrendingDown, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
        
        <main className="flex-1 px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Financial Management</h1>
              <p className="text-muted-foreground">Monitor financial performance and transactions</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Transaction
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Income</p>
                  <p className="text-2xl font-bold text-green-600">TSh {totalIncome.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-600">TSh {totalExpenses.toLocaleString()}</p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Net Profit</p>
                  <p className={cn(
                    "text-2xl font-bold",
                    netProfit >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    TSh {netProfit.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search transactions..."
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

          <div className="glass-card rounded-xl">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4">Transaction ID</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Description</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-4 px-4 font-medium">{transaction.id}</td>
                        <td className="py-4 px-4">
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            transaction.type === 'Income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          )}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className="py-4 px-4">{transaction.description}</td>
                        <td className="py-4 px-4 font-semibold">TSh {transaction.amount.toLocaleString()}</td>
                        <td className="py-4 px-4">{transaction.date}</td>
                        <td className="py-4 px-4">
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Finance;
