
// User/Operator Types
export enum UserRole {
  // Executive Leaders
  CEO = "CEO",
  CFO = "CFO", 
  COO = "COO",
  
  // HQ Management
  HQ_MANAGER = "HQ Manager",
  
  // Branch Management
  BRANCH_MANAGER = "Branch Manager",
  
  // Department Roles
  SUPERVISOR_HEAD = "Supervisor/Head",
  SENIOR_OFFICER = "Senior Officer",
  JUNIOR_OFFICER = "Junior Officer",
  INTERN = "Intern",
  
  // Additional Roles
  OPERATOR = "Operator",
  SUPERVISOR = "Supervisor"
}

export enum Department {
  HR = "Human Resources",
  OPERATIONS = "Operations", 
  FINANCE = "Finance",
  SALES_MARKETING = "Sales and Marketing",
  IT = "Information Technology",
  PROCUREMENT = "Procurement"
}

export enum CertificateStatus {
  REGULAR = "Regular",
  WARNING = "Próximo do Vencimento",
  EXPIRED = "Vencido"
}

// Forklift Types (legacy)
export enum ForkliftType {
  GAS = "Gás",
  ELECTRIC = "Elétrica",
  RETRACTABLE = "Retrátil"
}

export enum ForkliftStatus {
  OPERATIONAL = "Em Operação",
  STOPPED = "Parada",
  MAINTENANCE = "Aguardando Manutenção"
}

export interface Forklift {
  id: string;
  model: string;
  type: ForkliftType;
  capacity: string;
  acquisitionDate: string;
  lastMaintenance: string;
  status: ForkliftStatus;
  hourMeter: number;
}

// Branch Management
export interface Branch {
  id: string;
  name: string;
  location: string;
  manager: string;
  status: "Active" | "Inactive";
  employeeCount: number;
  departments: Department[];
}

// Employee Management
export interface Employee {
  id: string;
  name: string;
  role: UserRole;
  department: Department;
  branchId: string;
  email: string;
  phone: string;
  startDate: string;
  asoExpirationDate?: string;
  nrExpirationDate?: string;
  asoStatus: CertificateStatus;
  nrStatus: CertificateStatus;
  isActive: boolean;
}

// Project Management
export interface Project {
  id: string;
  name: string;
  description: string;
  branchId: string;
  department: Department;
  managerId: string;
  managerName: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: "Planning" | "Active" | "On Hold" | "Completed";
  progress: number;
}

// Task Management
export interface Task {
  id: string;
  title: string;
  description: string;
  projectId?: string;
  assignedTo: string;
  assignedBy: string;
  branchId: string;
  department: Department;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Todo" | "In Progress" | "Review" | "Completed";
  dueDate: string;
  createdDate: string;
}

// Financial Management
export interface Transaction {
  id: string;
  type: "Income" | "Expense";
  amount: number;
  description: string;
  category: string;
  branchId: string;
  department: Department;
  date: string;
  approvedBy?: string;
  status: "Pending" | "Approved" | "Rejected";
}

// CRM
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  branchId: string;
  assignedTo: string;
  status: "Lead" | "Prospect" | "Active" | "Inactive";
  value: number;
  lastContact: string;
}

// Reporting
export interface Report {
  id: string;
  title: string;
  type: "Financial" | "Project" | "HR" | "Sales" | "Operational";
  branchId: string;
  department: Department;
  submittedBy: string;
  submittedDate: string;
  status: "Draft" | "Submitted" | "Under Review" | "Approved" | "Rejected";
  approvers: string[];
  signatures: ReportSignature[];
  data: any;
}

export interface ReportSignature {
  userId: string;
  userName: string;
  role: UserRole;
  signedDate: string;
  signature: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalBranches: number;
  activeBranches: number;
  totalEmployees: number;
  activeProjects: number;
  pendingTasks: number;
  monthlyRevenue: number;
  pendingReports: number;
  employeesWithExpiredCertificates: number;
  employeesWithValidCertificates: number;
  employeesWithWarningCertificates: number;
}

// Component Props
export interface StatusCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  status?: "success" | "warning" | "danger" | "info" | "neutral";
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
}

// Legacy types (keeping for compatibility)
export enum ForkliftType {
  GAS = "Gás",
  ELECTRIC = "Elétrica", 
  RETRACTABLE = "Retrátil"
}

export enum ForkliftStatus {
  OPERATIONAL = "Em Operação",
  STOPPED = "Parada",
  MAINTENANCE = "Aguardando Manutenção"
}

export interface Forklift {
  id: string;
  model: string;
  type: ForkliftType;
  capacity: string;
  acquisitionDate: string;
  lastMaintenance: string;
  status: ForkliftStatus;
  hourMeter: number;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  cpf: string;
  contact: string;
  shift: string;
  registrationDate: string;
  asoExpirationDate: string;
  nrExpirationDate: string;
  asoStatus: CertificateStatus;
  nrStatus: CertificateStatus;
}

export interface Operation {
  id: string;
  operatorId: string;
  operatorName: string;
  forkliftId: string;
  forkliftModel: string;
  sector: string;
  initialHourMeter: number;
  currentHourMeter?: number;
  gasConsumption?: number;
  startTime: string;
  endTime?: string;
  status: "active" | "completed";
}

export enum MaintenanceStatus {
  WAITING = "Aguardando",
  IN_PROGRESS = "Em andamento", 
  COMPLETED = "Concluído"
}

export interface Maintenance {
  id: string;
  forkliftId: string;
  forkliftModel: string;
  issue: string;
  reportedBy: string;
  reportedDate: string;
  status: MaintenanceStatus;
  completedDate?: string;
}

export interface GasSupply {
  id: string;
  date: string;
  forkliftId: string;
  forkliftModel: string;
  quantity: number;
  hourMeterBefore: number;
  hourMeterAfter: number;
  operator: string;
}
