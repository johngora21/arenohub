import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Client } from '@/types';
import { 
  UserCheck, 
  Plus, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Building, 
  MoreVertical,
  Calendar,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  X,
  Star,
  StarOff,
  FileText,
  MessageSquare,
  History,
  UserPlus,
  Send,
  Megaphone,
  Check,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import { mockBranches, mockProjects, allEmployees } from '@/data/mockData';

const mockClients: Client[] = [
  {
    id: 'CLI001',
    name: 'John Smith',
    email: 'john.smith@techcorp.com',
    phone: '+255 700 123 456',
    company: 'TechCorp Tanzania',
    branchId: 'BR001',
    assignedTo: 'EMP008',
    status: 'Active',
    value: 250000,
    lastContact: '2024-01-20',
    isFavorite: true,
    notes: 'Key decision maker, interested in enterprise solutions',
    interactions: [
      { type: 'call', date: '2024-01-20', notes: 'Discussed new product features' },
      { type: 'meeting', date: '2024-01-15', notes: 'Product demonstration' }
    ]
  },
  {
    id: 'CLI002',
    name: 'Maria Rodriguez',
    email: 'maria@innovateafrica.org',
    phone: '+255 701 234 567',
    company: 'Innovate Africa',
    branchId: 'BR002',
    assignedTo: 'EMP009',
    status: 'Prospect',
    value: 150000,
    lastContact: '2024-01-25',
    isFavorite: false,
    notes: 'Looking for scalable solutions',
    interactions: [
      { type: 'email', date: '2024-01-25', notes: 'Sent proposal' }
    ]
  },
  {
    id: 'CLI003',
    name: 'Ahmed Hassan',
    email: 'ahmed@eastafricaltd.co.tz',
    phone: '+255 702 345 678',
    company: 'East Africa Ltd',
    branchId: 'BR003',
    assignedTo: 'EMP010',
    status: 'Lead',
    value: 80000,
    lastContact: '2024-01-30',
    isFavorite: true,
    notes: 'Interested in mobile solutions',
    interactions: [
      { type: 'meeting', date: '2024-01-30', notes: 'Initial consultation' }
    ]
  }
];

const CRM = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isNewClientDialogOpen, setIsNewClientDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddContactDialogOpen, setIsAddContactDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isBroadcastDialogOpen, setIsBroadcastDialogOpen] = useState(false);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    branchId: '',
    status: 'Lead'
  });

  const filteredClients = mockClients.filter(client =>
    (client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedStatus === 'all' || client.status === selectedStatus) &&
    (selectedBranch === 'all' || client.branchId === selectedBranch)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Prospect':
        return 'bg-blue-100 text-blue-800';
      case 'Lead':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalClients = mockClients.length;
  const activeClients = mockClients.filter(c => c.status === 'Active').length;
  const totalValue = mockClients.reduce((sum, c) => sum + c.value, 0);
  const averageValue = totalValue / totalClients;

  const valueChange = 12.5; // Mock value change percentage
  const clientChange = 8.3; // Mock client change percentage

  const handleAddContact = () => {
    // Here you would typically make an API call to add the contact
    toast.success('Contact added successfully');
    setIsAddContactDialogOpen(false);
    setNewContact({
      name: '',
      email: '',
      phone: '',
      company: '',
      branchId: '',
      status: 'Lead'
    });
  };

  const handleSendEmail = () => {
    // Here you would typically make an API call to send the email
    toast.success('Email sent successfully');
    setIsEmailDialogOpen(false);
    setEmailSubject('');
    setEmailContent('');
    setSelectedClients([]);
  };

  const handleSendBroadcast = () => {
    // Here you would typically make an API call to send the broadcast
    toast.success('Broadcast message sent successfully');
    setIsBroadcastDialogOpen(false);
    setBroadcastMessage('');
    setSelectedClients([]);
  };

  const toggleClientSelection = (clientId: string) => {
    setSelectedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Header
          title="CRM"
          subtitle="Customer Relationship Management"
          mockBranches={mockBranches}
          allEmployees={allEmployees}
          mockProjects={mockProjects}
        />
        
        <main className="flex-1 p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {valueChange > 0 ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      {valueChange}%
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1">
                      <ArrowDownRight className="w-3 h-3" />
                      {Math.abs(valueChange)}%
                    </span>
                  )}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{totalClients}</h3>
              <p className="text-sm text-muted-foreground">Total Clients</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserCheck className="w-5 h-5 text-green-600" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {clientChange > 0 ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      {clientChange}%
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1">
                      <ArrowDownRight className="w-3 h-3" />
                      {Math.abs(clientChange)}%
                    </span>
                  )}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{activeClients}</h3>
              <p className="text-sm text-muted-foreground">Active Clients</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {valueChange > 0 ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      {valueChange}%
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1">
                      <ArrowDownRight className="w-3 h-3" />
                      {Math.abs(valueChange)}%
                    </span>
                  )}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">TSh {totalValue.toLocaleString()}</h3>
              <p className="text-sm text-muted-foreground">Total Value</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {valueChange > 0 ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      {valueChange}%
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1">
                      <ArrowDownRight className="w-3 h-3" />
                      {Math.abs(valueChange)}%
                    </span>
                  )}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">TSh {averageValue.toLocaleString()}</h3>
              <p className="text-sm text-muted-foreground">Average Value</p>
            </Card>
          </div>

          {/* Actions and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search clients..."
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
              <Dialog open={isAddContactDialogOpen} onOpenChange={setIsAddContactDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Add Contact
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Contact</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newContact.name}
                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newContact.email}
                        onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={newContact.phone}
                        onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={newContact.company}
                        onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch</Label>
                      <Select
                        value={newContact.branchId}
                        onValueChange={(value) => setNewContact({ ...newContact, branchId: value })}
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
                    <Button variant="outline" onClick={() => setIsAddContactDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddContact}>
                      Add Contact
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Email
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Send Email to Selected Clients</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Selected Clients ({selectedClients.length})</Label>
                      <ScrollArea className="h-32 border rounded-md p-2">
                        {filteredClients.map(client => (
                          <div key={client.id} className="flex items-center space-x-2 py-2">
                            <Checkbox
                              id={client.id}
                              checked={selectedClients.includes(client.id)}
                              onCheckedChange={() => toggleClientSelection(client.id)}
                            />
                            <Label htmlFor={client.id} className="flex-1">
                              {client.name} ({client.email})
                            </Label>
                          </div>
                        ))}
                      </ScrollArea>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                        className="min-h-[200px]"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSendEmail}>
                      Send Email
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isBroadcastDialogOpen} onOpenChange={setIsBroadcastDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Megaphone className="w-4 h-4" />
                    Broadcast
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Send Broadcast Message</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Selected Clients ({selectedClients.length})</Label>
                      <ScrollArea className="h-32 border rounded-md p-2">
                        {filteredClients.map(client => (
                          <div key={client.id} className="flex items-center space-x-2 py-2">
                            <Checkbox
                              id={client.id}
                              checked={selectedClients.includes(client.id)}
                              onCheckedChange={() => toggleClientSelection(client.id)}
                            />
                            <Label htmlFor={client.id} className="flex-1">
                              {client.name} ({client.email})
                            </Label>
                          </div>
                        ))}
                      </ScrollArea>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="broadcast">Message</Label>
                      <Textarea
                        id="broadcast"
                        value={broadcastMessage}
                        onChange={(e) => setBroadcastMessage(e.target.value)}
                        className="min-h-[200px]"
                        placeholder="Enter your broadcast message..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsBroadcastDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSendBroadcast}>
                      Send Broadcast
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Prospect">Prospect</SelectItem>
                  <SelectItem value="Lead">Lead</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
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
            </div>
          )}

          {/* Client List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <Card 
                key={client.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{client.name}</h3>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Toggle favorite
                                  }}
                                >
                                  {client.isFavorite ? (
                                    <Star className="w-4 h-4 text-yellow-500" />
                                  ) : (
                                    <StarOff className="w-4 h-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{client.isFavorite ? 'Remove from favorites' : 'Add to favorites'}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <p className="text-sm text-muted-foreground">{client.company}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{client.email}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{client.phone}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Branch {client.branchId}</span>
                    </div>

                    <Separator className="my-3" />

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Value</p>
                        <p className="font-semibold">TSh {client.value.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Contact</p>
                        <p className="font-semibold">{client.lastContact}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Send message</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <History className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View history</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <FileText className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>More options</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CRM;
