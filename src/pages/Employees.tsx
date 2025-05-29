
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Employee, UserRole, Department, CertificateStatus } from '@/types';
import { Users, Search, Filter, Plus, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const mockEmployees: Employee[] = [
  {
    id: 'EMP001',
    name: 'Michael Hassan',
    role: UserRole.SUPERVISOR_HEAD,
    department: Department.IT,
    branchId: 'BR001',
    email: 'michael.hassan@areno.co.tz',
    phone: '+255 123 456 789',
    startDate: '2023-01-15',
    asoExpirationDate: '2024-12-31',
    nrExpirationDate: '2024-11-30',
    asoStatus: CertificateStatus.REGULAR,
    nrStatus: CertificateStatus.WARNING,
    isActive: true
  },
  {
    id: 'EMP002',
    name: 'Fatima Said',
    role: UserRole.SUPERVISOR_HEAD,
    department: Department.HR,
    branchId: 'BR002',
    email: 'fatima.said@areno.co.tz',
    phone: '+255 234 567 890',
    startDate: '2022-03-20',
    asoExpirationDate: '2024-06-15',
    nrExpirationDate: '2024-08-20',
    asoStatus: CertificateStatus.EXPIRED,
    nrStatus: CertificateStatus.REGULAR,
    isActive: true
  },
  {
    id: 'EMP003',
    name: 'James Mbeki',
    role: UserRole.SENIOR_OFFICER,
    department: Department.OPERATIONS,
    branchId: 'BR003',
    email: 'james.mbeki@areno.co.tz',
    phone: '+255 345 678 901',
    startDate: '2023-06-10',
    asoExpirationDate: '2025-01-10',
    nrExpirationDate: '2025-02-15',
    asoStatus: CertificateStatus.REGULAR,
    nrStatus: CertificateStatus.REGULAR,
    isActive: true
  }
];

const Employees = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filteredEmployees = mockEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: CertificateStatus) => {
    switch (status) {
      case CertificateStatus.REGULAR:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case CertificateStatus.WARNING:
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case CertificateStatus.EXPIRED:
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: CertificateStatus) => {
    switch (status) {
      case CertificateStatus.REGULAR:
        return 'bg-green-100 text-green-800';
      case CertificateStatus.WARNING:
        return 'bg-yellow-100 text-yellow-800';
      case CertificateStatus.EXPIRED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar 
          title="Employee Management" 
          subtitle="Manage staff across all branches"
        />
        
        <main className="flex-1 px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Employee Management</h1>
              <p className="text-muted-foreground">Oversee staff records and compliance</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Employee
            </Button>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search employees..."
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
            {filteredEmployees.map((employee) => (
              <div 
                key={employee.id}
                className="glass-card glass-card-hover rounded-xl p-6 cursor-pointer transition-all duration-300"
                onClick={() => setSelectedEmployee(employee)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{employee.name}</h3>
                      <p className="text-sm text-muted-foreground">{employee.id}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                    employee.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  )}>
                    {employee.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Role:</span>
                    <span className="font-medium">{employee.role}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Department:</span>
                    <span>{employee.department}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Start Date:</span>
                    <span>{employee.startDate}</span>
                  </div>

                  <div className="pt-3 border-t border-border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">ASO Status:</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(employee.asoStatus)}
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          getStatusColor(employee.asoStatus)
                        )}>
                          {employee.asoStatus}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">NR Status:</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(employee.nrStatus)}
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          getStatusColor(employee.nrStatus)
                        )}>
                          {employee.nrStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedEmployee && (
            <div className="mt-8 glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Employee Details: {selectedEmployee.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Email:</span>
                      <span className="text-sm">{selectedEmployee.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Phone:</span>
                      <span className="text-sm">{selectedEmployee.phone}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Certificate Expiry Dates</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">ASO Expires:</span>
                      <span className="text-sm">{selectedEmployee.asoExpirationDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">NR Expires:</span>
                      <span className="text-sm">{selectedEmployee.nrExpirationDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Employees;
