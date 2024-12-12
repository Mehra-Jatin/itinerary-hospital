import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Send, X } from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock data - replace with your actual data fetching logic
const INITIAL_CONVERSATIONS = {
  admin: {
    'doctor_messages': [
      {
        id: '1',
        type: 'doctor_messages',
        user: {
          name: "Dr. Emily Rodriguez",
          avatar: "https://via.placeholder.com/150",
          email: "emily.rodriguez@example.com"
        },
        lastMessage: "Need assistance with patient records",
        timestamp: "2024-02-15T10:30:00Z",
        unreadCount: 3
      }
    ],
    'patient_messages': [
      {
        id: '2',
        type: 'patient_messages',
        user: {
          name: "Michael Chen",
          avatar: "https://via.placeholder.com/150",
          email: "michael.chen@example.com"
        },
        lastMessage: "Inquiry about upcoming treatment",
        timestamp: "2024-02-14T15:45:00Z",
        unreadCount: 1
      }
    ],
    'user_messages': [
      {
        id: '3',
        type: 'user_messages',
        user: {
          name: "Alex Thompson",
          avatar: "https://via.placeholder.com/150",
          email: "alex.thompson@example.com"
        },
        lastMessage: "General support inquiry",
        timestamp: "2024-02-13T12:15:00Z",
        unreadCount: 2
      }
    ]
  },
  doctor: {
    'patient_messages': [
      {
        id: '1',
        type: 'patient_messages',
        user: {
          name: "Sarah Johnson",
          avatar: "https://via.placeholder.com/150",
          email: "sarah.johnson@example.com"
        },
        lastMessage: "Follow-up on recent consultation",
        timestamp: "2024-02-14T14:30:00Z",
        unreadCount: 1
      },
      {
        id: '2',
        type: 'patient_messages',
        user: {
          name: "Michael Chen",
          avatar: "https://via.placeholder.com/150",
          email: "michael.chen@example.com"
        },
        lastMessage: "Question about prescribed medication",
        timestamp: "2024-02-13T11:15:00Z",
        unreadCount: 2
      }
    ],
    'admin_messages': [
      {
        id: '1',
        type: 'admin_messages',
        user: {
          name: "Admin Support",
          avatar: "https://via.placeholder.com/150",
          email: "admin@healthcare.com"
        },
        lastMessage: "Monthly performance review scheduled",
        timestamp: "2024-02-15T09:15:00Z",
        unreadCount: 1
      }
    ]
  }
};

const MESSAGE_TYPES = {
  admin: {
    '/admin-dashboard/doctor-messages': 'doctor_messages',
    '/admin-dashboard/patient-messages': 'patient_messages',
    '/admin-dashboard/user-messages': 'user_messages'
  },
  doctor: {
    '/doctor-dashboard/patient-messages': 'patient_messages',
    '/doctor-dashboard/admin-messages': 'admin_messages'
  }
};

const CONVERSATION_TITLES = {
    admin: {
      'doctor_messages': 'Doctor Conversations',
      'patient_messages': 'Patient Conversations',
      'user_messages': 'User Support Conversations'
    },
    doctor: {
        'patient_messages': 'Patient Conversations',
        'admin_messages': 'Admin Conversations'
      }
  };


const ChatLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileListVisible, setIsMobileListVisible] = useState(true);

  useEffect(() => {
    // Determine the active message type based on the URL and user role
    const messageTypeMap = MESSAGE_TYPES[user.role] || {};
    const currentType = messageTypeMap[location.pathname];

    if (currentType) {
      // Set initial conversations and active type
      const initialConvos = INITIAL_CONVERSATIONS[user.role][currentType] || [];
      setConversations(initialConvos);
      setActiveType(currentType);
    }
  }, [user.role, location.pathname]);

   const getConversationTitle = () => {
    const titleMap = CONVERSATION_TITLES[user.role] || {};
    return titleMap[activeType] || 'Conversations';
  };

  const filteredConversations = conversations.filter(conv => 
    conv.type === activeType &&
    conv.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderConversationList = () => {
    return (
      <div className={`
        ${isMobileListVisible ? 'block' : 'hidden'}
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
          <h2 className="text-2xl font-bold text-orange-600">{getConversationTitle()}</h2>
          
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
                  setIsMobileListVisible(false);
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
                  <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unreadCount > 0 && (
                  <span className="ml-2 bg-orange-500 text-white text-xs rounded-full px-2 py-1">
                    {conv.unreadCount}
                  </span>
                )}
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
          ${isMobileListVisible ? 'hidden' : 'flex'}
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
        ${isMobileListVisible ? 'hidden' : 'flex'}
        md:flex 
        flex-col 
        flex-grow 
        bg-white 
        h-full
      `}>
        {/* Conversation Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-4"
              onClick={() => setIsMobileListVisible(true)}
            >
              <X size={24} className="text-gray-600" />
            </button>
            <img 
              src={selectedConversation.user.avatar} 
              alt={selectedConversation.user.name} 
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {selectedConversation.user.name}
              </h2>
              <p className="text-xs text-gray-500">
                {selectedConversation.user.email}
              </p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-orange-100 rounded-full">
                <MoreVertical className="text-gray-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                Block User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Messages Area - Placeholder */}
        <div className="flex-grow p-4 overflow-y-auto">
          {/* Actual message rendering would happen here */}
          <div className="text-center text-gray-500">
            Messages for this conversation would be displayed here
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t flex items-center space-x-2">
          <input 
            type="text" 
            placeholder="Type your message..." 
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
    <div className="flex flex-col md:flex-row h-[85vh] bg-white rounded-lg shadow-sm">
      {renderConversationList()}
      {renderConversationDetail()}
    </div>
  );
};

export default ChatLayout;