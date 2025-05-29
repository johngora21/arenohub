import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { 
  MessageSquare, 
  Search, 
  Send, 
  Phone, 
  Video,
  MoreVertical,
  Users,
  Bell,
  Mail,
  Pin,
  Archive,
  Star,
  Plus,
  UserPlus,
  Users2,
  Megaphone,
  Building2,
  Filter,
  ChevronDown,
  X,
  FileText,
  Image as ImageIcon,
  Paperclip,
  SlidersHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Header from '@/components/layout/Header';
import { mockBranches, mockProjects, allEmployees } from '@/data/mockData';

interface Chat {
  id: string;
  type: 'direct' | 'group' | 'announcement' | 'email';
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar?: string;
  isOnline?: boolean;
  isPinned?: boolean;
  participants?: number;
  department?: string;
  branch?: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  type: 'text' | 'image' | 'file';
}

interface Contact {
  id: string;
  name: string;
  email: string;
  department: string;
  branch: string;
  role: string;
  isOnline: boolean;
  avatar?: string;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Michael Hassan',
    email: 'michael.hassan@company.com',
    department: 'IT',
    branch: 'HQ',
    role: 'IT Manager',
    isOnline: true
  },
  {
    id: '2',
    name: 'Sarah Ahmed',
    email: 'sarah.ahmed@company.com',
    department: 'HR',
    branch: 'HQ',
    role: 'HR Director',
    isOnline: false
  },
  // Add more mock contacts as needed
];

const mockChats: Chat[] = [
  {
    id: '1',
    type: 'group',
    name: 'IT Team',
    lastMessage: 'System maintenance scheduled for tonight',
    timestamp: '14:30',
    unread: 3,
    isPinned: true,
    participants: 8,
    department: 'IT',
    branch: 'HQ'
  },
  {
    id: '2',
    type: 'direct',
    name: 'Michael Hassan',
    lastMessage: 'Can we schedule a meeting tomorrow?',
    timestamp: '13:45',
    unread: 1,
    isOnline: true,
    department: 'IT',
    branch: 'HQ'
  },
  {
    id: '3',
    type: 'announcement',
    name: 'Company Announcements',
    lastMessage: 'New branch opening in Mbeya',
    timestamp: '12:20',
    unread: 0,
    participants: 357,
    branch: 'All'
  },
  {
    id: '4',
    type: 'email',
    name: 'HR Department',
    lastMessage: 'Q1 Performance review documents',
    timestamp: '11:15',
    unread: 2,
    department: 'HR',
    branch: 'HQ'
  },
  {
    id: '5',
    type: 'group',
    name: 'Branch Managers',
    lastMessage: 'Monthly reports due next week',
    timestamp: '10:30',
    unread: 0,
    participants: 5,
    branch: 'All'
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Michael Hassan',
    content: 'Good morning team! Ready for today\'s system update?',
    timestamp: '09:00',
    isOwn: false,
    type: 'text'
  },
  {
    id: '2',
    sender: 'You',
    content: 'Yes, all preparations are complete. The maintenance window starts at 10 PM.',
    timestamp: '09:05',
    isOwn: true,
    type: 'text'
  },
  {
    id: '3',
    sender: 'Sarah Ahmed',
    content: 'I\'ve backed up all critical data. We\'re good to go!',
    timestamp: '09:10',
    isOwn: false,
    type: 'text'
  }
];

const Communication = () => {
  const isMobile = useIsMobile();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewGroupDialogOpen, setIsNewGroupDialogOpen] = useState(false);
  const [isNewAnnouncementDialogOpen, setIsNewAnnouncementDialogOpen] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');
  const [announcementContent, setAnnouncementContent] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'group':
        return <Users className="w-4 h-4" />;
      case 'announcement':
        return <Bell className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'group':
        return 'text-blue-600';
      case 'announcement':
        return 'text-orange-600';
      case 'email':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedBranch === 'all' || chat.branch === selectedBranch) &&
    (selectedDepartment === 'all' || chat.department === selectedDepartment)
  );

  const handleCreateGroup = () => {
    // Handle group creation logic
    console.log('Creating group:', { name: groupName, members: selectedContacts });
    setIsNewGroupDialogOpen(false);
    setGroupName('');
    setSelectedContacts([]);
  };

  const handleCreateAnnouncement = () => {
    // Handle announcement creation logic
    console.log('Creating announcement:', { content: announcementContent, branch: selectedBranch });
    setIsNewAnnouncementDialogOpen(false);
    setAnnouncementContent('');
    setSelectedBranch('all');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Header
          title="Communication"
          subtitle="Internal and external communications"
          mockBranches={mockBranches}
          allEmployees={allEmployees}
          mockProjects={mockProjects}
        />
        
        <main className="flex-1 flex">
          {/* Left Sidebar */}
          <div className={cn(
            "w-full md:w-96 border-r bg-background flex flex-col",
            isMobile && selectedChat && "hidden"
          )}>
            {/* Header */}
            <div className="p-4 border-b space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Messages</h2>
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" aria-label="Filter" onClick={() => setShowFilters(!showFilters)}>
                          <SlidersHorizontal className="w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Toggle filters</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Dialog open={isNewGroupDialogOpen} onOpenChange={setIsNewGroupDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        New Chat
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Start a New Conversation</DialogTitle>
                      </DialogHeader>
                      <Tabs defaultValue="direct" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="direct">Direct Message</TabsTrigger>
                          <TabsTrigger value="group">Group Chat</TabsTrigger>
                          <TabsTrigger value="announcement">Announcement</TabsTrigger>
                        </TabsList>
                        <TabsContent value="direct" className="space-y-4">
                          <div className="space-y-2">
                            <Label>Search Contacts</Label>
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                              <Input placeholder="Search by name or email" className="pl-9" />
                            </div>
                          </div>
                          <ScrollArea className="h-[300px] border rounded-md">
                            {mockContacts.map((contact) => (
                              <div key={contact.id} className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer">
                                <Avatar>
                                  <AvatarFallback>{contact.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{contact.name}</p>
                                  <p className="text-sm text-muted-foreground">{contact.role}</p>
                                </div>
                              </div>
                            ))}
                          </ScrollArea>
                        </TabsContent>
                        <TabsContent value="group" className="space-y-4">
                          <div className="space-y-2">
                            <Label>Group Name</Label>
                            <Input
                              placeholder="Enter group name"
                              value={groupName}
                              onChange={(e) => setGroupName(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Select Members</Label>
                            <ScrollArea className="h-[300px] border rounded-md">
                              {mockContacts.map((contact) => (
                                <div key={contact.id} className="flex items-center gap-3 p-3 hover:bg-muted/50">
                                  <Checkbox
                                    id={contact.id}
                                    checked={selectedContacts.includes(contact.id)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setSelectedContacts([...selectedContacts, contact.id]);
                                      } else {
                                        setSelectedContacts(selectedContacts.filter(id => id !== contact.id));
                                      }
                                    }}
                                  />
                                  <Label htmlFor={contact.id} className="flex items-center gap-2 flex-1 cursor-pointer">
                                    <Avatar className="w-8 h-8">
                                      <AvatarFallback>{contact.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium">{contact.name}</p>
                                      <p className="text-sm text-muted-foreground">{contact.role}</p>
                                    </div>
                                  </Label>
                                </div>
                              ))}
                            </ScrollArea>
                          </div>
                        </TabsContent>
                        <TabsContent value="announcement" className="space-y-4">
                          <div className="space-y-2">
                            <Label>Target Audience</Label>
                            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select branch" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Branches</SelectItem>
                                <SelectItem value="HQ">Headquarters</SelectItem>
                                <SelectItem value="MBEYA">Mbeya Branch</SelectItem>
                                <SelectItem value="MWANZA">Mwanza Branch</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Announcement</Label>
                            <Textarea
                              placeholder="Enter your announcement..."
                              value={announcementContent}
                              onChange={(e) => setAnnouncementContent(e.target.value)}
                              className="min-h-[200px]"
                            />
                          </div>
                        </TabsContent>
                      </Tabs>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewGroupDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button>
                          Start Conversation
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="direct">Direct</TabsTrigger>
                  <TabsTrigger value="group">Groups</TabsTrigger>
                  <TabsTrigger value="announcement">Announcements</TabsTrigger>
                </TabsList>
              </Tabs>

              {showFilters && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Filters</Label>
                    <Button variant="ghost" size="sm" onClick={() => {
                      setSelectedBranch('all');
                      setSelectedDepartment('all');
                    }}>
                      <X className="w-4 h-4 mr-1" />
                      Clear
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                      <SelectTrigger>
                        <SelectValue placeholder="Branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Branches</SelectItem>
                        <SelectItem value="HQ">Headquarters</SelectItem>
                        <SelectItem value="MBEYA">Mbeya Branch</SelectItem>
                        <SelectItem value="MWANZA">Mwanza Branch</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="SALES">Sales</SelectItem>
                        <SelectItem value="OPS">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            {/* Chat List */}
            <ScrollArea className="flex-1">
              <div className="p-2">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors relative group",
                      selectedChat?.id === chat.id && "bg-muted"
                    )}
                  >
                    {chat.isPinned && (
                      <Pin className="absolute top-2 right-2 w-3 h-3 text-muted-foreground" />
                    )}
                    
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={chat.avatar} />
                        <AvatarFallback className={getTypeColor(chat.type)}>
                          {getTypeIcon(chat.type)}
                        </AvatarFallback>
                      </Avatar>
                      {chat.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium truncate">{chat.name}</h3>
                        <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {chat.type === 'group' && (
                          <Badge variant="outline" className="text-xs">
                            {chat.participants} members
                          </Badge>
                        )}
                        {chat.department && (
                          <Badge variant="outline" className="text-xs">
                            {chat.department}
                          </Badge>
                        )}
                        {chat.branch && chat.branch !== 'All' && (
                          <Badge variant="outline" className="text-xs">
                            {chat.branch}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {chat.unread > 0 && (
                      <div className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}

                    <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className={cn(
            "flex-1 flex flex-col",
            isMobile && !selectedChat && "hidden"
          )}>
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between bg-background">
                  <div className="flex items-center gap-3">
                    {isMobile && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedChat(null)}
                        className="p-1"
                      >
                        ←
                      </Button>
                    )}
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedChat.avatar} />
                      <AvatarFallback className={getTypeColor(selectedChat.type)}>
                        {getTypeIcon(selectedChat.type)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedChat.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedChat.type === 'direct' ? (
                          selectedChat.isOnline ? 'Online' : 'Last seen recently'
                        ) : selectedChat.type === 'group' ? (
                          `${selectedChat.participants} members`
                        ) : (
                          selectedChat.type === 'announcement' ? 'Company wide' : 'Department'
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {selectedChat.type === 'direct' && (
                      <>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Phone className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Start voice call</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Video className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Start video call</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </>
                    )}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>More options</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {mockMessages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-2 max-w-[80%]",
                          message.isOwn ? "ml-auto flex-row-reverse" : ""
                        )}
                      >
                        {!message.isOwn && (
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                              {message.sender.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={cn(
                            "rounded-lg p-3 max-w-xs lg:max-w-md",
                            message.isOwn
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}
                        >
                          {!message.isOwn && (
                            <p className="text-xs font-medium mb-1">{message.sender}</p>
                          )}
                          <p className="text-sm">{message.content}</p>
                          <p className={cn(
                            "text-xs mt-1",
                            message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                          )}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t bg-background">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Attach file</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                              <ImageIcon className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Send image</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && newMessage.trim()) {
                            console.log('Sending:', newMessage);
                            setNewMessage('');
                          }
                        }}
                      />
                    </div>
                    <Button 
                      size="sm" 
                      disabled={!newMessage.trim()}
                      onClick={() => {
                        if (newMessage.trim()) {
                          console.log('Sending:', newMessage);
                          setNewMessage('');
                        }
                      }}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-muted/20">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">Choose a chat from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Communication;
