
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
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

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
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  type: 'text' | 'image' | 'file';
}

const mockChats: Chat[] = [
  {
    id: '1',
    type: 'group',
    name: 'IT Team',
    lastMessage: 'System maintenance scheduled for tonight',
    timestamp: '14:30',
    unread: 3,
    isPinned: true,
    participants: 8
  },
  {
    id: '2',
    type: 'direct',
    name: 'Michael Hassan',
    lastMessage: 'Can we schedule a meeting tomorrow?',
    timestamp: '13:45',
    unread: 1,
    isOnline: true
  },
  {
    id: '3',
    type: 'announcement',
    name: 'Company Announcements',
    lastMessage: 'New branch opening in Mbeya',
    timestamp: '12:20',
    unread: 0,
    participants: 357
  },
  {
    id: '4',
    type: 'email',
    name: 'HR Department',
    lastMessage: 'Q1 Performance review documents',
    timestamp: '11:15',
    unread: 2
  },
  {
    id: '5',
    type: 'group',
    name: 'Branch Managers',
    lastMessage: 'Monthly reports due next week',
    timestamp: '10:30',
    unread: 0,
    participants: 5
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
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar 
          title="Communication" 
          subtitle="Team collaboration and messaging"
        />
        
        <main className="flex-1 flex">
          {/* Chat List Sidebar */}
          <div className={cn(
            "w-full md:w-80 border-r bg-background flex flex-col",
            isMobile && selectedChat && "hidden"
          )}>
            {/* Header */}
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold mb-3">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Chat List */}
            <ScrollArea className="flex-1">
              <div className="p-2">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors relative",
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
                      {chat.participants && chat.type === 'group' && (
                        <p className="text-xs text-muted-foreground mt-1">{chat.participants} members</p>
                      )}
                    </div>

                    {chat.unread > 0 && (
                      <div className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
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
                        <Button variant="ghost" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
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
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && newMessage.trim()) {
                          // Handle send message
                          console.log('Sending:', newMessage);
                          setNewMessage('');
                        }
                      }}
                    />
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
