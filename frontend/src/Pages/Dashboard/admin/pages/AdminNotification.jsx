import React, { useState } from 'react';
import { 
  Bell, 
  Check, 
  X, 
  MessageSquare, 
  UserPlus, 
  CalendarCheck, 
  AlertCircle 
} from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Define notification types and icons
const NotificationIcons = {
  message: MessageSquare,
  newUser: UserPlus,
  appointment: CalendarCheck,
  alert: AlertCircle
};

const AdminNotification = () => {
  // Static notifications for demonstration
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'message',
      title: 'New Message',
      description: 'Dr. Smith sent a message about patient John Doe',
      timestamp: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'newUser',
      title: 'Doctor Verification',
      description: 'New doctor profile needs verification',
      timestamp: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'appointment',
      title: 'Appointment Conflict',
      description: 'Overlapping appointments detected for Dr. Johnson',
      timestamp: '3 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'alert',
      title: 'System Update',
      description: 'Scheduled maintenance tomorrow at 2 AM',
      timestamp: 'Yesterday',
      read: true
    }
  ]);

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  // Remove a specific notification
  const removeNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  // Count of unread notifications
  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-6 h-6 text-orange-500" />
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
              {unreadCount}
            </span>
          )}
        </CardTitle>
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={markAllAsRead}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Mark all as read
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[68vh] pr-4">
          {notifications.map((notification) => {
            const NotificationIcon = NotificationIcons[notification.type];
            return (
              <div 
                key={notification.id}
                className={`flex items-start p-4 border-b last:border-b-0 ${
                  !notification.read ? 'bg-orange-50' : 'bg-white'
                } hover:bg-gray-50 transition-colors`}
              >
                <div className="mr-4">
                  <NotificationIcon 
                    className={`w-6 h-6 ${
                      notification.type === 'message' ? 'text-blue-500' :
                      notification.type === 'newUser' ? 'text-green-500' :
                      notification.type === 'appointment' ? 'text-yellow-500' :
                      'text-red-500'
                    }`} 
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                  <p className="text-sm text-gray-600">{notification.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeNotification(notification.id)}
                  >
                    <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
                  </Button>
                  {!notification.read && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => {
                        setNotifications(notifications.map(notif => 
                          notif.id === notification.id ? { ...notif, read: true } : notif
                        ));
                      }}
                    >
                      <Check className="w-4 h-4 text-green-500" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Notifications
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminNotification;