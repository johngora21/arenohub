import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Settings as SettingsIcon, Users, Shield, Bell, User, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import Header from '@/components/layout/Header';
import { mockBranches, mockProjects, allEmployees } from '@/data/mockData';

const Settings = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<'profile' | 'users' | 'security' | 'notifications'>('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Header
          title="User Management"
          subtitle="Manage user accounts and permissions"
          mockBranches={mockBranches}
          allEmployees={allEmployees}
          mockProjects={mockProjects}
        />
        
        <main className="flex-1 px-6 py-6">
          <div className="flex gap-6">
            <div className="w-64 glass-card rounded-xl p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200",
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted/50"
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex-1 glass-card rounded-xl p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <Input defaultValue="Amani" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <Input defaultValue="Mwema" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input defaultValue="amani.mwema@areno.co.tz" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <Input defaultValue="+255 123 456 789" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Role</label>
                      <Input defaultValue="System Administrator" disabled />
                    </div>
                    <Button>Save Changes</Button>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">User Management</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-muted-foreground">Manage user accounts and permissions</p>
                      <Button>Add New User</Button>
                    </div>
                    <div className="border rounded-lg">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="text-left p-4">Name</th>
                            <th className="text-left p-4">Email</th>
                            <th className="text-left p-4">Role</th>
                            <th className="text-left p-4">Status</th>
                            <th className="text-left p-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-4">Michael Hassan</td>
                            <td className="p-4">michael.hassan@areno.co.tz</td>
                            <td className="p-4">IT Supervisor</td>
                            <td className="p-4">
                              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Active</span>
                            </td>
                            <td className="p-4">
                              <Button variant="outline" size="sm">Edit</Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-4">Fatima Said</td>
                            <td className="p-4">fatima.said@areno.co.tz</td>
                            <td className="p-4">HR Supervisor</td>
                            <td className="p-4">
                              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Active</span>
                            </td>
                            <td className="p-4">
                              <Button variant="outline" size="sm">Edit</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Password Requirements</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Minimum password length (8 characters)</label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Require uppercase letters</label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Require special characters</label>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-3">Session Management</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Auto-logout after inactivity (30 minutes)</label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Force password change every 90 days</label>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    <Button>Save Security Settings</Button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Email Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm">New task assignments</label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Project updates</label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm">System maintenance alerts</label>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-3">Push Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Urgent messages</label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Meeting reminders</label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Report approvals</label>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    <Button>Save Notification Settings</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
