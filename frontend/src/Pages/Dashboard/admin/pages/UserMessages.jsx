import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Trash2, 
  MoreVertical,
  Send,
  X,
  CheckCircle2
} from 'lucide-react';
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent 
} from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock Data
const INITIAL_CONVERSATIONS = [
  {
    id: '1',
    user: {
      name: "Emily Rodriguez",
      avatar: "https://via.placeholder.com/150",
      email: "emily.rodriguez@example.com"
    },
    lastMessage: "I'm having trouble with my recent order.",
    status: "open",
    priority: "high",
    timestamp: "2024-02-15T10:30:00Z",
    unreadCount: 3
  },
  {
    id: '2',
    user: {
      name: "Michael Chen",
      avatar: "https://via.placeholder.com/150",
      email: "michael.chen@example.com"
    },
    lastMessage: "Can you help me with a refund?",
    status: "pending",
    priority: "medium",
    timestamp: "2024-02-14T15:45:00Z",
    unreadCount: 1
  },
  {
    id: '3',
    user: {
      name: "Sarah Thompson",
      avatar: "https://via.placeholder.com/150",
      email: "sarah.thompson@example.com"
    },
    lastMessage: "Everything looks good, thank you!",
    status: "resolved",
    priority: "low",
    timestamp: "2024-02-13T09:15:00Z",
    unreadCount: 0
  }
];

const STATUS_OPTIONS = [
  { value: 'open', label: 'Open', color: 'text-red-600' },
  { value: 'pending', label: 'Pending', color: 'text-yellow-600' },
  { value: 'resolved', label: 'Resolved', color: 'text-green-600' }
];

const UserMessages = () => {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileConversationListVisible, setIsMobileConversationListVisible] = useState(true);

  const handleDeleteConversation = (id) => {
    const updatedConversations = conversations.filter(conv => conv.id !== id);
    setConversations(updatedConversations);
    
    if (selectedConversation?.id === id) {
      setSelectedConversation(null);
    }
  };

  const filteredConversations = useMemo(() => {
    return conversations.filter(conv => 
      (filterStatus === 'all' || conv.status === filterStatus) &&
      conv.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [conversations, filterStatus, searchTerm]);

  const renderConversationList = () => {
    return (
      <div className={`
        ${isMobileConversationListVisible ? 'block' : 'hidden'}
        md:block 
        w-full md:w-96 
        bg-white 
        md:border-r 
        p-4 
        md:shadow-sm 
        h-full 
        overflow-y-auto
      `}>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-orange-600">User Messages  </h2>
            <button 
              className="p-2 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={18} className="text-orange-600" />
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search conversations" 
              className="pl-8 pr-2 py-2 rounded-lg border w-full focus:ring-2 focus:ring-orange-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-2 top-3 text-gray-400" size={18} />
          </div>

          {/* Filters */}
          {isFilterOpen && (
            <div className="flex space-x-2 overflow-x-auto">
              {['All', 'Open', 'Pending', 'Resolved'].map(status => (
                <button
                  key={status}
                  className={`
                    px-3 py-1 
                    rounded-full 
                    text-sm 
                    whitespace-nowrap 
                    transition 
                    ${filterStatus.toLowerCase() === status.toLowerCase()
                      ? 'bg-orange-500 text-white'
                      : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                    }
                  `}
                  onClick={() => {
                    setFilterStatus(status === 'All' ? 'all' : status.toLowerCase());
                    setIsFilterOpen(false);
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          )}

          {/* Conversation List */}
          <div className="space-y-2">
            {filteredConversations.map(conv => (
              <div 
                key={conv.id}
                className={`
                  flex items-center 
                  p-3 
                  rounded-lg 
                  cursor-pointer 
                  group 
                  ${selectedConversation?.id === conv.id 
                    ? 'bg-orange-50 border border-orange-200' 
                    : 'hover:bg-orange-50 transition'
                  }
                `}
                onClick={() => {
                  setSelectedConversation(conv);
                  setIsMobileConversationListVisible(false);
                }}
              >
                <img 
                  src={conv.user.avatar} 
                  alt={conv.user.name} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-800">{conv.user.name}</h3>
                    <span className="text-xs text-gray-500">
                      {new Date(conv.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  {/* <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p> */}
                </div>
                <div className="ml-2 flex items-center">
                  <span 
                    className={`
                      px-2 py-1 
                      rounded-full 
                      text-xs 
                      mr-2 
                      ${conv.status === 'open' 
                        ? 'bg-red-100 text-red-600'
                        : conv.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-green-100 text-green-600'
                      }
                    `}
                  >
                    {conv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderConversationDetail = () => {
    if (!selectedConversation) {
      return (
        <div className={`
          ${isMobileConversationListVisible ? 'hidden' : 'flex'}
          md:flex 
          flex-grow 
          items-center 
          justify-center 
          bg-orange-50 
          text-gray-500
        `}>
          Select a conversation to view details
        </div>
      );
    }

    return (
      <div className={`
        ${isMobileConversationListVisible ? 'hidden' : 'flex'}
        md:flex 
        flex-col 
        flex-grow 
        bg-white 
        h-full
      `}>
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-4"
              onClick={() => setIsMobileConversationListVisible(true)}
            >
              <X size={24} className="text-gray-600" />
            </button>
            <img 
              src={selectedConversation.user.avatar} 
              alt={selectedConversation.user.name} 
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{selectedConversation.user.name}</h2>
              <p className="text-xs text-gray-500">{selectedConversation.user.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-orange-100 rounded-full">
                  <MoreVertical className="text-gray-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {/* Status Update Options */}
                <div className="px-2 py-1 text-xs text-gray-500">Update Status</div>
                {STATUS_OPTIONS.map((status) => (
                  <DropdownMenuItem 
                    key={status.value}
                    className={`
                      cursor-pointer 
                      flex items-center 
                      ${selectedConversation.status === status.value 
                        ? 'bg-orange-100 text-orange-600' 
                        : 'hover:bg-orange-50'
                      }
                    `}
                    onSelect={() => handleUpdateStatus(status.value)}
                  >
                    {selectedConversation.status === status.value && (
                      <CheckCircle2 size={16} className="mr-2 text-orange-600" />
                    )}
                    <span className={status.color}>{status.label}</span>
                  </DropdownMenuItem>
                ))}
                
                {/* Delete Conversation Option */}
                <DropdownMenuItem 
                  className="text-red-500 hover:bg-red-50 cursor-pointer"
                  onSelect={() => handleDeleteConversation(selectedConversation.id)}
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete Conversation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Placeholder for conversation messages */}
        <div className="flex-grow flex items-center justify-center text-gray-500">
          Conversation messages would be displayed here.
        </div>

        <div className="p-4 border-t flex items-center space-x-2">
          <input 
            type="text" 
            placeholder="Type your response..." 
            className="flex-grow p-2 border rounded-lg focus:ring-2 focus:ring-orange-300"
          />
          <button className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition">
            <Send size={20} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
    <div>
      <br />
      Need Backend Api endPoient for this, fetch all appointments</div>
    <div className="flex flex-col md:flex-row h-[85vh] ">

      {renderConversationList()}
      {renderConversationDetail()}
    </div>
    </>
  );
};

export default UserMessages;