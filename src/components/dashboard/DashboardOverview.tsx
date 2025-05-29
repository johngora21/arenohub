
import React from 'react';
import StatusCard from './StatusCard';
import { 
  Building2, Users, Briefcase, CheckCircle, 
  Clock, FileText, AlertTriangle, Calendar,
  TrendingUp, MapPin
} from 'lucide-react';
import { DashboardStats } from '@/types';

// Mock data for Areno Management Hub
const initialStats: DashboardStats = {
  totalBranches: 4,
  activeBranches: 4,
  totalEmployees: 357,
  activeProjects: 23,
  pendingTasks: 156,
  monthlyRevenue: 2850000, // TSh
  pendingReports: 8,
  employeesWithExpiredCertificates: 3,
  employeesWithValidCertificates: 298,
  employeesWithWarningCertificates: 12
};

interface DashboardOverviewProps {
  stats?: DashboardStats;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ 
  stats = initialStats 
}) => {
  return (
    <section className="space-y-6">
      <div className="slide-enter" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-2xl font-semibold mb-4">Branch Operations Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusCard 
            title="Total Branches" 
            value={stats.totalBranches} 
            icon={Building2} 
            status="info" 
          />
          <StatusCard 
            title="Active Branches" 
            value={stats.activeBranches} 
            icon={MapPin} 
            status="success"
            change={{ value: 8, trend: 'up' }}
          />
          <StatusCard 
            title="Total Employees" 
            value={stats.totalEmployees} 
            icon={Users} 
            status="info"
            change={{ value: 12, trend: 'up' }}
          />
          <StatusCard 
            title="Monthly Revenue" 
            value={Math.round(stats.monthlyRevenue / 1000000)} 
            icon={TrendingUp} 
            status="success"
            change={{ value: 15, trend: 'up' }}
          />
        </div>
      </div>

      <div className="slide-enter" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-2xl font-semibold mb-4">Employee Compliance Status</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusCard 
            title="Valid Certificates" 
            value={stats.employeesWithValidCertificates} 
            icon={CheckCircle} 
            status="success" 
          />
          <StatusCard 
            title="Expiring Soon" 
            value={stats.employeesWithWarningCertificates} 
            icon={AlertTriangle} 
            status="warning" 
          />
          <StatusCard 
            title="Expired Certificates" 
            value={stats.employeesWithExpiredCertificates} 
            icon={AlertTriangle} 
            status="danger" 
          />
          <StatusCard 
            title="Compliance Rate" 
            value={Math.round((stats.employeesWithValidCertificates / stats.totalEmployees) * 100)} 
            icon={Calendar} 
            status="success"
            change={{ value: 3, trend: 'up' }}
          />
        </div>
      </div>

      <div className="slide-enter" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-semibold mb-4">Operations Management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusCard 
            title="Active Projects" 
            value={stats.activeProjects} 
            icon={Briefcase} 
            status="success"
            change={{ value: 5, trend: 'up' }}
          />
          <StatusCard 
            title="Pending Tasks" 
            value={stats.pendingTasks} 
            icon={Clock} 
            status="warning" 
          />
          <StatusCard 
            title="Pending Reports" 
            value={stats.pendingReports} 
            icon={FileText} 
            status="warning" 
          />
          <StatusCard 
            title="Task Completion Rate" 
            value={78} 
            icon={CheckCircle} 
            status="success"
            change={{ value: 12, trend: 'up' }}
          />
        </div>
      </div>
    </section>
  );
};

export default DashboardOverview;
