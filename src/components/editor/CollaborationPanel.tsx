import React, { useState } from 'react';
import { Users, UserPlus, MessageSquare, Send } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { User } from '../../types';

interface Message {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '3',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    user: mockUsers[1],
    text: 'I think we should use a different color for the header.',
    timestamp: '2025-05-15T10:30:00Z',
  },
  {
    id: '2',
    user: mockUsers[0],
    text: 'Good idea! What color do you suggest?',
    timestamp: '2025-05-15T10:32:00Z',
  },
  {
    id: '3',
    user: mockUsers[2],
    text: 'Maybe a darker blue to increase contrast?',
    timestamp: '2025-05-15T10:35:00Z',
  },
];

const CollaborationPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'users'>('chat');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [inviteEmail, setInviteEmail] = useState('');
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      user: mockUsers[0],
      text: message,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };
  
  const handleInviteUser = () => {
    if (!inviteEmail.trim()) return;
    
    // In a real implementation, this would send an invitation
    alert(`Invitation sent to ${inviteEmail}`);
    setInviteEmail('');
  };
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium ${
            activeTab === 'chat'
              ? 'text-indigo-600 border-b-2 border-indigo-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('chat')}
        >
          <div className="flex items-center justify-center">
            <MessageSquare size={16} className="mr-2" />
            Chat
          </div>
        </button>
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium ${
            activeTab === 'users'
              ? 'text-indigo-600 border-b-2 border-indigo-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('users')}
        >
          <div className="flex items-center justify-center">
            <Users size={16} className="mr-2" />
            Collaborators
          </div>
        </button>
      </div>
      
      {activeTab === 'chat' ? (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.user.id === mockUsers[0].id ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.user.id === mockUsers[0].id
                      ? 'bg-indigo-100 text-indigo-900'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    <img
                      src={msg.user.avatar}
                      alt={msg.user.name}
                      className="w-5 h-5 rounded-full mr-2"
                    />
                    <span className="text-xs font-medium">{msg.user.name}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t border-gray-200">
            <div className="flex">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 mr-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <Button onClick={handleSendMessage}>
                <Send size={16} />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Invite Collaborators</h3>
            <div className="flex">
              <Input
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 mr-2"
              />
              <Button onClick={handleInviteUser} leftIcon={<UserPlus size={16} />}>
                Invite
              </Button>
            </div>
          </div>
          
          <h3 className="text-sm font-medium text-gray-700 mb-2">Current Collaborators</h3>
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200"
              >
                <div className="flex items-center">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                {user.id === mockUsers[0].id && (
                  <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                    You
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationPanel;