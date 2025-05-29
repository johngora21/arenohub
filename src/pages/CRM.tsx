
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Client } from '@/types';
import { UserCheck, Plus, Search, Filter, Mail, Phone, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    lastContact: '2024-01-20'
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
    lastContact: '2024-01-25'
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
    lastContact: '2024-01-30'
  }
];

const CRM = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar 
          title="Customer Relationship Management" 
          subtitle="Manage client relationships and sales pipeline"
        />
        
        <main className="flex-1 px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">CRM Dashboard</h1>
              <p className="text-muted-foreground">Manage clients and track sales opportunities</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Client
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Clients</p>
                  <p className="text-2xl font-bold">{totalClients}</p>
                </div>
                <UserCheck className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Clients</p>
                  <p className="text-2xl font-bold text-green-600">{activeClients}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold text-primary">TSh {totalValue.toLocaleString()}</p>
                </div>
                <Building className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search clients..."
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

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <div 
                key={client.id}
                className="glass-card glass-card-hover rounded-xl p-6 cursor-pointer transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{client.name}</h3>
                      <p className="text-sm text-muted-foreground">{client.id}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                    getStatusColor(client.status)
                  )}>
                    {client.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span>{client.company}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{client.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{client.phone}</span>
                  </div>

                  <div className="pt-3 border-t border-border space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Value:</span>
                      <span className="text-sm font-semibold">TSh {client.value.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Last Contact:</span>
                      <span className="text-sm">{client.lastContact}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CRM;
