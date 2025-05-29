
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Package, Plus, Search, Filter, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  unit: string;
  cost: number;
  supplier: string;
  lastUpdated: string;
  branchId: string;
}

const mockInventory: InventoryItem[] = [
  {
    id: 'INV001',
    name: 'Office Chairs',
    category: 'Furniture',
    quantity: 45,
    minStock: 10,
    maxStock: 100,
    unit: 'pieces',
    cost: 150000,
    supplier: 'Tanzania Furniture Co.',
    lastUpdated: '2024-01-20',
    branchId: 'BR001'
  },
  {
    id: 'INV002',
    name: 'Laptop Computers',
    category: 'Electronics',
    quantity: 5,
    minStock: 8,
    maxStock: 25,
    unit: 'pieces',
    cost: 1200000,
    supplier: 'Tech Solutions Ltd',
    lastUpdated: '2024-01-25',
    branchId: 'BR001'
  },
  {
    id: 'INV003',
    name: 'Printer Paper',
    category: 'Office Supplies',
    quantity: 200,
    minStock: 50,
    maxStock: 500,
    unit: 'reams',
    cost: 15000,
    supplier: 'Office Supplies TZ',
    lastUpdated: '2024-01-30',
    branchId: 'BR002'
  }
];

const Inventory = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInventory = mockInventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (item: InventoryItem) => {
    if (item.quantity <= item.minStock) return 'low';
    if (item.quantity >= item.maxStock) return 'high';
    return 'normal';
  };

  const getStockColor = (status: string) => {
    switch (status) {
      case 'low':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-blue-100 text-blue-800';
      case 'normal':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const lowStockItems = mockInventory.filter(item => getStockStatus(item) === 'low').length;
  const totalItems = mockInventory.length;
  const totalValue = mockInventory.reduce((sum, item) => sum + (item.quantity * item.cost), 0);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar 
          title="Inventory Management" 
          subtitle="Track and manage inventory across branches"
        />
        
        <main className="flex-1 px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Inventory Management</h1>
              <p className="text-muted-foreground">Monitor stock levels and procurement</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-bold">{totalItems}</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Low Stock Alerts</p>
                  <p className="text-2xl font-bold text-red-600">{lowStockItems}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold text-primary">TSh {totalValue.toLocaleString()}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search inventory..."
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
              <h2 className="text-xl font-semibold mb-4">Inventory Items</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4">Item</th>
                      <th className="text-left py-3 px-4">Category</th>
                      <th className="text-left py-3 px-4">Stock</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Unit Cost</th>
                      <th className="text-left py-3 px-4">Supplier</th>
                      <th className="text-left py-3 px-4">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((item) => {
                      const status = getStockStatus(item);
                      return (
                        <tr key={item.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground">{item.id}</div>
                            </div>
                          </td>
                          <td className="py-4 px-4">{item.category}</td>
                          <td className="py-4 px-4">
                            <div className="font-medium">{item.quantity} {item.unit}</div>
                            <div className="text-sm text-muted-foreground">
                              Min: {item.minStock} | Max: {item.maxStock}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit",
                              getStockColor(status)
                            )}>
                              {status === 'low' && <AlertTriangle className="w-3 h-3" />}
                              {status === 'normal' && <CheckCircle className="w-3 h-3" />}
                              {status === 'high' && <Package className="w-3 h-3" />}
                              {status === 'low' ? 'Low Stock' : status === 'high' ? 'Overstocked' : 'Normal'}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-semibold">TSh {item.cost.toLocaleString()}</td>
                          <td className="py-4 px-4">{item.supplier}</td>
                          <td className="py-4 px-4">{item.lastUpdated}</td>
                        </tr>
                      );
                    })}
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

export default Inventory;
