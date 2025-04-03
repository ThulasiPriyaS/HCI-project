import React, { useState } from 'react';
import { Send, Search, Bell, Users, UserPlus, Plus } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  content: string;
  type: string;
  priority?: string;
  groupId: string;
}

interface Group {
  id: string;
  name: string;
  members: string[];
  lastMessage?: string;
}

const ChatSystem: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([
    { id: 'team-general', name: 'Team General', members: ['Alice', 'Bob', 'Charlie', 'You'], lastMessage: 'Latest updates on the project' },
    { id: 'project-alpha', name: 'Project Alpha', members: ['Alice', 'You', 'David'], lastMessage: 'Sprint planning tomorrow' },
    { id: 'design-team', name: 'Design Team', members: ['Emma', 'You', 'Frank'], lastMessage: 'New mockups ready' },
  ]);

  const [activeGroup, setActiveGroup] = useState<string>('team-general');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'Alice', content: '@bob Can you review the latest PR?', type: 'mention', priority: 'high', groupId: 'team-general' },
    { id: 2, sender: 'Bob', content: "Sure, I'll take a look right away.", type: 'reply', groupId: 'team-general' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const botResponses = [
    "I'm here to help! What can I do for you?",
    "That's interesting! Tell me more.",
    "I understand. Let me know if you need anything else.",
    "Great question! I'll do my best to assist you.",
    "I'm processing your message...",
    "Thanks for sharing that with me!",
  ];

  const getBotResponse = () => {
    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex];
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'You',
      content: newMessage,
      type: 'message',
      groupId: activeGroup
    };

    const botMessage: Message = {
      id: messages.length + 2,
      sender: 'Bot',
      content: getBotResponse(),
      type: 'message',
      groupId: activeGroup
    };

    setMessages([...messages, userMessage, botMessage]);
    setNewMessage('');
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    setGroups(groups.map(group => {
      if (group.id === activeGroup && !group.members.includes(newMemberName)) {
        return {
          ...group,
          members: [...group.members, newMemberName]
        };
      }
      return group;
    }));

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: 'System',
        content: `${newMemberName} has joined the group`,
        type: 'system',
        groupId: activeGroup
      }
    ]);

    setNewMemberName('');
    setShowAddMember(false);
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const newGroup: Group = {
      id: `group-${Date.now()}`,
      name: newGroupName,
      members: ['You'],
      lastMessage: 'New group created'
    };

    setGroups([...groups, newGroup]);
    setActiveGroup(newGroup.id);
    setNewGroupName('');
    setShowNewGroup(false);
  };

  const filteredMessages = messages.filter(message => message.groupId === activeGroup);
  const activeGroupData = groups.find(group => group.id === activeGroup);

  return (
    <div className="h-full flex">
      {/* Chat List */}
      <div className="w-80 bg-white rounded-lg shadow-sm mr-6 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Groups</h2>
          <button
            onClick={() => setShowNewGroup(true)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {showNewGroup && (
          <form onSubmit={handleCreateGroup} className="mb-4">
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Enter group name..."
              className="w-full px-3 py-2 border rounded-lg mb-2"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowNewGroup(false)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </form>
        )}

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>

        <div className="space-y-2">
          {groups.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveGroup(group.id)}
              className={`w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                activeGroup === group.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-gray-800">{group.name}</h3>
                <span className="text-xs text-gray-500">{group.members.length} members</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{group.lastMessage}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-white rounded-lg shadow-sm flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{activeGroupData?.name}</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddMember(true)}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                <span className="text-sm">Add Member</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <Users className="w-5 h-5 mr-2" />
                <span className="text-sm">{activeGroupData?.members.length} members</span>
              </button>
            </div>
          </div>

          {showAddMember && (
            <form onSubmit={handleAddMember} className="mt-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Enter member name..."
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddMember(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg ${
                message.priority === 'high'
                  ? 'bg-red-50 border border-red-100'
                  : message.sender === 'You'
                  ? 'bg-blue-50 ml-auto'
                  : message.sender === 'Bot'
                  ? 'bg-green-50'
                  : message.sender === 'System'
                  ? 'bg-gray-100 text-center'
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center mb-1">
                <span className="font-medium text-gray-800">{message.sender}</span>
                {message.type === 'mention' && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                    Mention
                  </span>
                )}
              </div>
              <p className="text-gray-600">{message.content}</p>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full pl-4 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 text-blue-500 hover:text-blue-600"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;