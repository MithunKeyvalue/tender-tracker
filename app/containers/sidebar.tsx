import { Badge, User, Settings, LogOut, ChevronDown } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { SidebarItems } from '~/constants/sidenav'

interface SidebarProps {
  setActiveTab: (tab: string) => void;
  activeTab: string;
  user?: {
    firstName: string;
    lastName: string;
    role: string;
  };
}

export const Sidebar = ({ setActiveTab, activeTab, user }: SidebarProps) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear session and redirect to login
    window.location.href = "/logout";
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-sidebar shadow-sm border-r border-sidebar-border flex flex-col z-50">
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sidebar-primary to-sidebar-primary/60 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
              <span className="text-sidebar-primary-foreground font-bold text-lg">TF</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-sidebar-primary to-sidebar-primary/70 bg-clip-text text-transparent">
              TenderFlow
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {SidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                item.id === activeTab
                  ? "bg-gradient-to-r from-sidebar-primary to-sidebar-primary/70 text-sidebar-primary-foreground shadow-md"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full font-medium">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border relative" ref={dropdownRef}>
          <div 
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-sidebar-accent transition-colors duration-200 cursor-pointer"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-sidebar-primary to-sidebar-primary/60 rounded-full flex items-center justify-center shadow-md">
              <User className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sidebar-foreground">
                {user ? `${user.firstName} ${user.lastName}` : 'User'}
              </p>
              <p className="text-sm text-sidebar-foreground/70">
                {user?.role === 'contractor' ? 'Contractor' : user?.role === 'admin' ? 'Admin' : 'User'}
              </p>
            </div>
            <ChevronDown className={`w-4 h-4 text-sidebar-foreground/70 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} />
          </div>

          {/* Dropdown Menu */}
          {showProfileDropdown && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
              <button
                onClick={() => {
                  setActiveTab('settings');
                  setShowProfileDropdown(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-accent transition-colors duration-200 cursor-pointer"
              >
                <Settings className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Settings</span>
              </button>
              <div className="border-t border-border" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-destructive/10 text-destructive transition-colors duration-200 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
  )
}
