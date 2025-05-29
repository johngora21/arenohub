import { Branch, Project, Department } from '@/types';

export const mockBranches: Branch[] = [
  {
    id: 'BR001',
    name: 'Dar es Salaam HQ',
    location: 'Dar es Salaam, Tanzania',
    manager: 'John Mwalimu',
    status: 'Active',
    employeeCount: 156,
    departments: [Department.HR, Department.FINANCE, Department.OPERATIONS, Department.SALES_MARKETING, Department.IT, Department.PROCUREMENT]
  },
  {
    id: 'BR002', 
    name: 'Arusha Branch',
    location: 'Arusha, Tanzania',
    manager: 'Sarah Kilimanjaro',
    status: 'Active',
    employeeCount: 89,
    departments: [Department.HR, Department.FINANCE, Department.OPERATIONS, Department.SALES_MARKETING]
  },
  {
    id: 'BR003',
    name: 'Mwanza Branch', 
    location: 'Mwanza, Tanzania',
    manager: 'David Nyerere',
    status: 'Active',
    employeeCount: 67,
    departments: [Department.HR, Department.FINANCE, Department.OPERATIONS, Department.PROCUREMENT]
  },
  {
    id: 'BR004',
    name: 'Dodoma Branch',
    location: 'Dodoma, Tanzania', 
    manager: 'Grace Magufuli',
    status: 'Active',
    employeeCount: 45,
    departments: [Department.HR, Department.FINANCE, Department.OPERATIONS]
  }
];

export const mockProjects: Project[] = [
  {
    id: 'PRJ001',
    name: 'Digital Transformation Initiative',
    description: 'Implementing new digital systems across all branches',
    branchId: 'BR001',
    department: Department.IT,
    managerId: 'EMP001',
    managerName: 'Michael Hassan',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    budget: 250000,
    status: 'Active',
    progress: 65
  },
  {
    id: 'PRJ002', 
    name: 'Employee Training Program',
    description: 'Comprehensive skills development program',
    branchId: 'BR002',
    department: Department.HR,
    managerId: 'EMP002',
    managerName: 'Fatima Said',
    startDate: '2024-03-01',
    endDate: '2024-08-30',
    budget: 85000,
    status: 'Active',
    progress: 40
  },
  {
    id: 'PRJ003',
    name: 'Infrastructure Expansion',
    description: 'Expanding warehouse and office facilities',
    branchId: 'BR003',
    department: Department.OPERATIONS,
    managerId: 'EMP003', 
    managerName: 'James Mbeki',
    startDate: '2024-02-10',
    endDate: '2024-10-15',
    budget: 180000,
    status: 'Active',
    progress: 25
  }
];

export const allEmployees = [
  { id: 'EMP001', name: 'Amani Mwema', email: 'amani@areno.co.tz', role: 'CEO', branchId: 'BR001' },
  { id: 'EMP002', name: 'Fatima Said', email: 'fatima@areno.co.tz', role: 'HR Manager', branchId: 'BR002' },
  { id: 'EMP003', name: 'Michael Hassan', email: 'michael@areno.co.tz', role: 'IT Manager', branchId: 'BR001' },
  { id: 'EMP004', name: 'Sarah Kilimanjaro', email: 'sarah@areno.co.tz', role: 'Branch Manager', branchId: 'BR002' },
  { id: 'EMP005', name: 'David Nyerere', email: 'david@areno.co.tz', role: 'Operations Manager', branchId: 'BR003' },
  { id: 'EMP006', name: 'Grace Magufuli', email: 'grace@areno.co.tz', role: 'Branch Manager', branchId: 'BR004' },
  { id: 'EMP007', name: 'James Mbeki', email: 'james@areno.co.tz', role: 'Project Manager', branchId: 'BR003' }
]; 