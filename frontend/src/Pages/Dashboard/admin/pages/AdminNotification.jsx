import React, { useEffect } from 'react';
import { Bell, Check, X, MessageSquare, UserPlus, CalendarCheck, AlertCircle, Loader } from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAdmin } from '@/contexts/AdminContext';

// Define notification types and icons
const NotificationIcons = {
  message: MessageSquare,
  newUser: UserPlus,
  appointment: CalendarCheck,
  alert: AlertCircle
};

const AdminNotification = () => {
  const { 
    notifications, 
    // loading, 
    error, 
    getNotifications, 
    updateNotification, 
    deleteNotification 
  } = useAdmin();

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  // Mark all notifications as read
  const markAllAsRead = () => {
    notifications.forEach(notif => {
      if (!notif.read) {
        updateNotification(notif._id, true);
      }
    });
  };

  // Remove a specific notification
  const removeNotification = (id) => {
    deleteNotification(id);
  };

  // Count of unread notifications
  const unreadCount = notifications.filter(notif => !notif.read).length;

  // if (loading) {
  //   return (
  //     <Card className="w-full h-[80vh] flex items-center justify-center">
  //       <Loader className="w-8 h-8 animate-spin" />
  //     </Card>
  //   );
  // }

  if (error) {
    return (
      <Card className="w-full h-[80vh] flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </Card>
    );
  }

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
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Bell className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">You have no notifications</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const NotificationIcon = NotificationIcons[notification.type] || AlertCircle;
              return (
                <div 
                  key={notification._id}
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
                      onClick={() => removeNotification(notification._id)}
                    >
                      <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
                    </Button>
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => updateNotification(notification._id, true)}
                      >
                        <Check className="w-4 h-4 text-green-500" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={getNotifications}>
          Refresh Notifications
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminNotification;

