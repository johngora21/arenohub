
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { MessageSquare, Plus, Search, Send, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  priority: 'Low' | 'Medium' | 'High';
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  department: string;
  branchId: string;
}

const mockMessages: Message[] = [
  {
    id: 'MSG001',
    from: 'Michael Hassan',
    to: 'IT Team',
    subject: 'System Update Schedule',
    content: 'Please be informed that we will be updating our systems this weekend...',
    timestamp: '2024-01-20 14:30',
    read: false,
    priority: 'High'
  },
  {
    id: 'MSG002',
    from: 'Fatima Said',
    to: 'All Staff',
    subject: 'Training Session Reminder',
    content: 'Reminder about the upcoming training session on project management...',
    timestamp: '2024-01-19 09:15',
    read: true,
    priority: 'Medium'
  }
];

const mockAnnouncements: Announcement[] = [
  {
    id: 'ANN001',
    title: 'New Branch Opening in Mbeya',
    content: 'We are excited to announce the opening of our new branch in Mbeya, which will serve the southern region of Tanzania.',
    author: 'CEO Office',
    date: '2024-01-25',
    department: 'Executive',
    branchId: 'ALL'
  },
  {
    id: 'ANN002',
    title: 'Q1 Performance Review Process',
    content: 'The Q1 performance review process will begin next month. Please prepare your self-assessments.',
    author: 'HR Department',
    date: '2024-01-22',
    department: 'HR',
    branchId: 'ALL'
  }
];

const Communication = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<'messages' | 'announcements' | 'compose'>('messages');
  const [newMessage, setNewMessage] = useState({ to: '', subject: '', content: '' });

  const unreadMessages = mockMessages.filter(msg => !msg.read).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
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
          title="Communication & Collaboration" 
          subtitle="Internal messaging and announcements"
        />
        
        <main className="flex-1 px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Communication Hub</h1>
              <p className="text-muted-foreground">Stay connected with your team</p>
            </div>
            <Button 
              className="flex items-center gap-2"
              onClick={() => setActiveTab('compose')}
            >
              <Plus className="w-4 h-4" />
              New Message
            </Button>
          </div>

          <div className="flex gap-1 mb-6">
            <Button 
              variant={activeTab === 'messages' ? 'default' : 'outline'}
              onClick={() => setActiveTab('messages')}
              className="flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Messages ({unreadMessages})
            </Button>
            <Button 
              variant={activeTab === 'announcements' ? 'default' : 'outline'}
              onClick={() => setActiveTab('announcements')}
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Announcements
            </Button>
          </div>

          {activeTab === 'messages' && (
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Messages</h2>
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div 
                    key={message.id}
                    className={cn(
                      "p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:bg-muted/50",
                      !message.read && "bg-blue-50 border-blue-200"
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                          {message.from.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium">{message.from}</div>
                          <div className="text-sm text-muted-foreground">To: {message.to}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          getPriorityColor(message.priority)
                        )}>
                          {message.priority}
                        </span>
                        <span className="text-sm text-muted-foreground">{message.timestamp}</span>
                      </div>
                    </div>
                    <h3 className="font-medium mb-2">{message.subject}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Company Announcements</h2>
              <div className="space-y-4">
                {mockAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{announcement.title}</h3>
                      <span className="text-sm text-muted-foreground">{announcement.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-muted-foreground">By: {announcement.author}</span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {announcement.department}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{announcement.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'compose' && (
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Compose Message</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">To:</label>
                  <Input 
                    placeholder="Enter recipient..."
                    value={newMessage.to}
                    onChange={(e) => setNewMessage({...newMessage, to: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject:</label>
                  <Input 
                    placeholder="Enter subject..."
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message:</label>
                  <Textarea 
                    placeholder="Type your message..."
                    rows={6}
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                  />
                </div>
                <div className="flex gap-2">
                  <Button className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('messages')}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Communication;
