import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { User, ChevronDown, Calendar, Settings, LogOut, Menu, Home, FileText, Stethoscope, BookOpen, ShoppingBag, PhoneCall, LayoutDashboard, CalendarSearch, MessageSquareText, History } from 'lucide-react'
import logoImg from '../components/Images/logo-header.png'
import { useAuth } from '@/hooks/useAuth'

export default function Navbar() {
  const { user, logout } = useAuth();  // Replace with your logout function

  const menuItems = [
    { name: "Home", path: "/", icon: Home, hasDropdown: false },
    { name: "Pages", path: "/pages", icon: FileText, hasDropdown: true },
    { name: "Doctor", path: "/doctor", icon: Stethoscope, hasDropdown: false },
    { name: "Blog", path: "/blog", icon: BookOpen, hasDropdown: false },
    { name: "Shop", path: "/shop", icon: ShoppingBag, hasDropdown: true },
    { name: "Contacts", path: "/contacts", icon: PhoneCall, hasDropdown: false },
  ]

  // console.log(user);


  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-lg">
      <Link to="/" className="flex items-center space-x-2">
        <img src={logoImg} alt="PawsCare Logo" className="h-16" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-2">
        {menuItems.map((item) => (
          item.hasDropdown ? (
            <DropdownMenu key={item.name}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-semibold group">
                  {item.name}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer">Submenu 1</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Submenu 2</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Submenu 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link key={item.name} to={item.path}>
              <Button variant="ghost" className="font-semibold">
                {item.name}
              </Button>
            </Link>
          )
        ))}
      </div>

      {/* User Menu or Sign Up Button */}
      <div>
        {user ? (
          <>
            {user.role === 'admin' ? (
              <div className='flex items-center space-x-2'>
                <Link to="/admin-dashboard">
                  <Button className="bg-orange-600 hover:bg-orange-800 text-white">Go to Dashboard</Button>
                </Link>
                <Button onClick={handleLogout} variant="outline" className="border-orange-600 text-black hover:bg-orange-100">Log out</Button>
              </div>

            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="font-semibold group">
                    <User className="mr-2 h-4 w-4" /> Welcome, {user.role === 'doctor' ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : user.FirstName}
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.role === 'doctor' ? (
                    <>
                      <NavLink to="/doctor-profile" className="flex items-center hover:bg-gray-100 rounded-sm transition duration-150 cursor-pointer">
                        <DropdownMenuItem className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" /> Profile
                        </DropdownMenuItem>
                      </NavLink>
                      <NavLink to="/doctor-dashboard" className="flex items-center hover:bg-gray-100 rounded-sm transition duration-150 cursor-pointer">
                        <DropdownMenuItem className="cursor-pointer">
                          <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard
                        </DropdownMenuItem>
                      </NavLink>
                      <NavLink to="/doctor-dashboard/appointements" className="flex items-center hover:bg-gray-100 rounded-sm transition duration-150 cursor-pointer">
                        <DropdownMenuItem className="cursor-pointer">
                          <Calendar className="mr-2 h-4 w-4" /> Manage Appoientments
                        </DropdownMenuItem>
                      </NavLink>
                      <NavLink to="/doctor-dashboard/schedules" className="flex items-center hover:bg-gray-100 rounded-sm transition duration-150 cursor-pointer">
                        <DropdownMenuItem className="cursor-pointer">
                          <CalendarSearch className="mr-2 h-4 w-4" /> My Schedules
                        </DropdownMenuItem>
                      </NavLink>
                      <NavLink to="/doctor-dashboard/chats" className="flex items-center hover:bg-gray-100 rounded-sm transition duration-150 cursor-pointer">
                        <DropdownMenuItem className="cursor-pointer">
                          <MessageSquareText className="mr-2 h-4 w-4" /> Chats
                        </DropdownMenuItem>
                      </NavLink>
                      <NavLink to="/doctor-dashboard/settings" className="flex items-center hover:bg-gray-100 rounded-sm transition duration-150 cursor-pointer">
                        <DropdownMenuItem className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" /> Settings
                        </DropdownMenuItem>
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem className="cursor-pointer">
                        <NavLink to="/profile" className="flex items-center"><User className="mr-2 h-4 w-4" /> Profile</NavLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <NavLink to="/profile/appointements" className="flex items-center"><Calendar className="mr-2 h-4 w-4" />My Appointments</NavLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <NavLink to="/profile/history" className="flex items-center"><History className="mr-2 h-4 w-4" />My History</NavLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <NavLink to="/profile/settings" className="flex items-center"><Settings className="mr-2 h-4 w-4" /> Settings </NavLink>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </>
        ) : (
          <Link to="/auth/register">
            <Button className="bg-orange-600 hover:bg-orange-800 text-white">Create an account</Button>
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-8 w-8" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px] sm:w-[500px]">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-orange-500">Menu</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-2 text-lg border-b border-gray-200 py-2 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200"
              >
                <Button variant="outline" size="icon" className="w-10 h-10">
                  <item.icon className="h-5 w-5" />
                </Button>
                <span>{item.name}</span>
              </Link>
            ))}

          </div>
          {!user && (
            <div className="mt-6">
              <Link to="/auth/register" className="w-full">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Create an account</Button>
              </Link>
            </div>
          )}
          <div className='absolute bottom-4'>
            <p className="text-xs text-gray-500">© 2024 PawsCare. All rights reserved.</p>
            <img src={logoImg} alt="PawsCare Logo" className="h-12" />
          </div>
        </SheetContent>

      </Sheet>


    </nav>
  )
}