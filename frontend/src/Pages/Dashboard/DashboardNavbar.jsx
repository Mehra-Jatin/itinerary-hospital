import React, { useEffect } from 'react'
import { Bell, MoreVertical, LogOut, Settings, SquareArrowOutUpLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { useAuth } from '@/hooks/useAuth'
import { Link } from 'react-router-dom'
import logoImg from '../../components/Images/logo-header.png'
import { useAdmin } from '@/contexts/AdminContext'


function DashboardNavbar({ role }) {
  const { logout } = useAuth()
  const { notifications, getNotifications } = useAdmin()

  useEffect(() => {
    if (role === 'admin') {
      getNotifications()
    }
  }, [role, getNotifications])

  const unreadCount = notifications.filter(notif => !notif.read).length

  return (
    <div className="flex items-center justify-between w-full p-4 bg-white">
      <p className='font-semibold text-lg'>
        <span className="text-orange-500 capitalize">{role}</span> Dashboard
      </p>
      <div className="flex items-center space-x-4">
        <Button variant="outline" asChild className="hidden md:flex">
          <Link to="/" title='Back to Home'>
            <SquareArrowOutUpLeft className="mr-2 h-4 w-4" />
            <img src={logoImg} alt="PawsCare Logo" className="w-20" />
          </Link>
        </Button>

        {role === 'admin' && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    {notifications.length > 0 
                      ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}.`
                      : 'You have no notifications.'}
                  </p>
                </div>
                {notifications.length > 0 ? (
                  <div className="grid gap-2">
                    {notifications.slice(0, 3).map(notification => (
                      <div key={notification._id} className="flex items-center">
                        <Bell className="mr-2 h-4 w-4" />
                        <span className="text-sm">{notification.title}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-20 text-muted-foreground">
                    <Bell className="h-8 w-8 mb-2" />
                    <p className="text-sm">You have no notifications</p>
                  </div>
                )}
                <Button asChild className="w-full">
                  <Link to="/admin-dashboard/notifications">View All Notifications</Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to="/admin-dashboard/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout} className="flex items-center text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex md:hidden">
              <Button variant="outline" asChild className="flex md:hidden">
                <Link to="/" title='Back to Home'>
                  <SquareArrowOutUpLeft className="mr-2 h-4 w-4" />
                  <img src={logoImg} alt="PawsCare Logo" className="w-20" />
                </Link>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default DashboardNavbar

