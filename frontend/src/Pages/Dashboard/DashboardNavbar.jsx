import React, { useState } from 'react'
import { Bell, MoreVertical, LogOut, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { useAuth } from '@/hooks/useAuth'
import { Link } from 'react-router-dom'


function DashboardNavbar({ role }) {
  const { logout } = useAuth() // Assuming your AuthContext provides a logout function
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New message received' },
    { id: 2, message: 'Your report is ready' },
    { id: 3, message: 'Meeting scheduled for tomorrow' }
  ])

  return (
    <div className="flex items-center justify-between w-full p-4 bg-white">
      <p className='font-semibold text-lg'>
        <span className="text-orange-500 capitalize">{role}</span> Dashboard
      </p>
      <div className="flex items-center space-x-4">
        <Button variant="outline" asChild className="hidden md:flex">
          <Link to="/">Go to Main Website</Link>
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {notifications.length > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Notifications ({notifications.length})</h4>
                <p className="text-sm text-muted-foreground">Here are your latest notifications.</p>
              </div>
              <div className="grid gap-2">
                {notifications.map(notification => (
                  <div key={notification.id} className="flex items-center">
                    <Bell className="mr-2 h-4 w-4" />
                    <span className="text-sm">{notification.message}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="w-full">
                <a href="/admin-dashboard/notifications">View More Notifications</a>
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <a href="/admin-dashboard/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout} className="flex items-center text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex md:hidden">
              <Button variant="outline" asChild className="flex md:hidden">
                <Link to="/">Go to Main Website</Link>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default DashboardNavbar

