import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  X,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Upload,
  FileText,
  BarChart3,
  PackageCheck,
  PackageX,
  PackageSearch,
  ChevronDown,
  Edit,
  Trash2,
  History,
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
import Header from '@/components/layout/Header';
import { mockBranches, mockProjects, allEmployees } from '@/data/mockData';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  quantity: number;
  unit: string;
  minStock: number;
  location: string;
  branchId: string;
  lastUpdated: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

interface StockMovement {
  id: string;
  itemId: string;
  type: 'In' | 'Out';
  quantity: number;
  date: string;
  reference: string;
  branchId: string;
  notes: string;
}

const mockInventory: InventoryItem[] = [
  {
    id: 'INV001',
    name: 'Office Chairs',
    category: 'Furniture',
    sku: 'FUR-CHAIR-001',
    quantity: 25,
    unit: 'pcs',
    minStock: 10,
    location: 'Warehouse A',
    branchId: 'BR001',
    lastUpdated: '2024-01-15',
    status: 'In Stock'
  },
  {
    id: 'INV002',
    name: 'Laptops',
    category: 'Electronics',
    sku: 'ELEC-LAP-001',
    quantity: 8,
    unit: 'pcs',
    minStock: 15,
    location: 'Warehouse B',
    branchId: 'BR002',
    lastUpdated: '2024-01-20',
    status: 'Low Stock'
  },
  {
    id: 'INV003',
    name: 'Printers',
    category: 'Electronics',
    sku: 'ELEC-PRT-001',
    quantity: 0,
    unit: 'pcs',
    minStock: 5,
    location: 'Warehouse A',
    branchId: 'BR001',
    lastUpdated: '2024-01-25',
    status: 'Out of Stock'
  }
];

const mockMovements: StockMovement[] = [
  {
    id: 'MOV001',
    itemId: 'INV001',
    type: 'In',
    quantity: 10,
    date: '2024-01-15',
    reference: 'PO-001',
    branchId: 'BR001',
    notes: 'New stock received'
  },
  {
    id: 'MOV002',
    itemId: 'INV002',
    type: 'Out',
    quantity: 5,
    date: '2024-01-20',
    reference: 'SO-001',
    branchId: 'BR002',
    notes: 'Order fulfillment'
  }
];

const Inventory = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isNewItemDialogOpen, setIsNewItemDialogOpen] = useState(false);
  const [isStockMovementDialogOpen, setIsStockMovementDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('inventory');
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    sku: '',
    quantity: '',
    unit: '',
    minStock: '',
    location: '',
    branchId: ''
  });

  const filteredInventory = mockInventory.filter(item =>
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'all' || item.category === selectedCategory) &&
    (selectedBranch === 'all' || item.branchId === selectedBranch) &&
    (selectedStatus === 'all' || item.status === selectedStatus)
  );

  const totalItems = mockInventory.length;
  const lowStockItems = mockInventory.filter(item => item.status === 'Low Stock').length;
  const outOfStockItems = mockInventory.filter(item => item.status === 'Out of Stock').length;
  const totalValue = mockInventory.reduce((sum, item) => sum + (item.quantity * 1000), 0); // Mock value calculation

  const handleNewItem = () => {
    // Here you would typically make an API call to create the item
    toast.success('Item added successfully');
    setIsNewItemDialogOpen(false);
    setNewItem({
      name: '',
      category: '',
      sku: '',
      quantity: '',
      unit: '',
      minStock: '',
      location: '',
      branchId: ''
    });
  };

  const handleStockMovement = () => {
    // Here you would typically make an API call to record the movement
    toast.success('Stock movement recorded successfully');
    setIsStockMovementDialogOpen(false);
  };

  const handleExport = () => {
    // Here you would typically handle the export logic
    toast.success('Inventory report exported successfully');
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
          title="Inventory Management"
          subtitle="Track and manage inventory"
          mockBranches={mockBranches}
          allEmployees={allEmployees}
          mockProjects={mockProjects}
        />
        
        <main className="flex-1 p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <Badge variant="outline" className="text-xs">
                  Total Items
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{totalItems}</h3>
              <p className="text-sm text-muted-foreground">Unique Products</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <Badge variant="outline" className="text-xs">
                  Low Stock
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{lowStockItems}</h3>
              <p className="text-sm text-muted-foreground">Items Need Attention</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <PackageX className="w-5 h-5 text-red-600" />
                </div>
                <Badge variant="outline" className="text-xs">
                  Out of Stock
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{outOfStockItems}</h3>
              <p className="text-sm text-muted-foreground">Items Need Reorder</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <PackageCheck className="w-5 h-5 text-green-600" />
                </div>
                <Badge variant="outline" className="text-xs">
                  Total Value
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">TSh {(totalValue / 1000000).toFixed(1)}M</h3>
              <p className="text-sm text-muted-foreground">Current Stock Value</p>
            </Card>
          </div>

          {/* Actions and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search inventory..."
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
              <Dialog open={isNewItemDialogOpen} onOpenChange={setIsNewItemDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Inventory Item</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Item Name</Label>
                      <Input
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        placeholder="Enter item name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select
                        value={newItem.category}
                        onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Furniture">Furniture</SelectItem>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>SKU</Label>
                      <Input
                        value={newItem.sku}
                        onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })}
                        placeholder="Enter SKU"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          value={newItem.quantity}
                          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                          placeholder="Enter quantity"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Unit</Label>
                        <Input
                          value={newItem.unit}
                          onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                          placeholder="Enter unit"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Minimum Stock Level</Label>
                      <Input
                        type="number"
                        value={newItem.minStock}
                        onChange={(e) => setNewItem({ ...newItem, minStock: e.target.value })}
                        placeholder="Enter minimum stock level"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={newItem.location}
                        onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                        placeholder="Enter storage location"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Branch</Label>
                      <Select
                        value={newItem.branchId}
                        onValueChange={(value) => setNewItem({ ...newItem, branchId: value })}
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
                    <Button variant="outline" onClick={() => setIsNewItemDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleNewItem}>
                      Add Item
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isStockMovementDialogOpen} onOpenChange={setIsStockMovementDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Stock Movement
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Record Stock Movement</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Item</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select item" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockInventory.map(item => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name} ({item.sku})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Movement Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="In">Stock In</SelectItem>
                          <SelectItem value="Out">Stock Out</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input type="number" placeholder="Enter quantity" />
                    </div>
                    <div className="space-y-2">
                      <Label>Reference</Label>
                      <Input placeholder="Enter reference number" />
                    </div>
                    <div className="space-y-2">
                      <Label>Notes</Label>
                      <Textarea placeholder="Enter movement notes" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsStockMovementDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleStockMovement}>
                      Record Movement
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
                    <DialogTitle>Export Inventory Report</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Report Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inventory">Current Inventory</SelectItem>
                          <SelectItem value="movements">Stock Movements</SelectItem>
                          <SelectItem value="low-stock">Low Stock Items</SelectItem>
                          <SelectItem value="all">Complete Inventory Report</SelectItem>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Furniture">Furniture</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Office Supplies">Office Supplies</SelectItem>
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
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Inventory Items</CardTitle>
                <Tabs defaultValue="all" className="w-[400px]">
                  <TabsList>
                    <TabsTrigger value="all">All Items</TabsTrigger>
                    <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
                    <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-2 text-xs font-medium">SKU</th>
                      <th className="text-left py-2 px-2 text-xs font-medium">Name</th>
                      <th className="text-left py-2 px-2 text-xs font-medium">Category</th>
                      <th className="text-left py-2 px-2 text-xs font-medium">Quantity</th>
                      <th className="text-left py-2 px-2 text-xs font-medium">Location</th>
                      <th className="text-left py-2 px-2 text-xs font-medium">Last Updated</th>
                      <th className="text-left py-2 px-2 text-xs font-medium">Status</th>
                      <th className="text-left py-2 px-2 text-xs font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((item) => (
                      <tr key={item.id} className="border-b border-border hover:bg-muted/30">
                        <td className="py-3 px-2 text-xs font-medium">{item.sku}</td>
                        <td className="py-3 px-2 text-xs">{item.name}</td>
                        <td className="py-3 px-2 text-xs">{item.category}</td>
                        <td className="py-3 px-2 text-xs">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="py-3 px-2 text-xs">{item.location}</td>
                        <td className="py-3 px-2 text-xs">{item.lastUpdated}</td>
                        <td className="py-3 px-2">
                          <Badge
                            variant={
                              item.status === 'In Stock' ? 'success' :
                              item.status === 'Low Stock' ? 'warning' :
                              'destructive'
                            }
                          >
                            {item.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <History className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Trash2 className="w-4 h-4" />
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

export default Inventory;
