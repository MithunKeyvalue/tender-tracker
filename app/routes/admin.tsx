import { cn } from "@/lib/utils";
import {
  Bell,
  ChevronRight,
  FileText,
  FileType,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Sparkles,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Contractors", href: "/admin/contractors", icon: Users },
  { name: "Active Tenders", href: "/admin/active-tenders", icon: FileText },
  { name: "Messages Sent", href: "/admin/messages-sent", icon: MessageSquare },
  { name: "Templates", href: "/admin/templates", icon: FileType },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [notificationPulse, setNotificationPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationPulse(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Sidebar with glassmorphism */}
      <div 
        className={cn(
          "fixed left-0 top-0 h-screen w-64 z-50 transition-all duration-500 ease-out",
          "backdrop-blur-xl bg-white/80 border-r border-white/20 shadow-2xl"
        )}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        <div className="flex flex-col h-full relative">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
          
          {/* Logo with animation */}
          <div className="px-6 py-5 border-b border-white/20 relative">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-violet-600 animate-pulse" />
                <div className="absolute inset-0 bg-violet-600/20 rounded-full blur-lg animate-ping"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  TenderHub Admin
                </h1>
                <p className="text-sm text-slate-600 mt-1 transition-all duration-300 group-hover:text-violet-600">
                  Government Tender Management
                </p>
              </div>
            </div>
          </div>

          {/* Navigation with staggered animations */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto relative">
            <ul className="space-y-2">
              {navigation.map((item, index) => {
                const isActive = location.pathname === item.href || 
                  (item.href === "/admin" && location.pathname === "/admin/");
                return (
                  <li 
                    key={item.name}
                    className="animate-slide-in-left"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Link
                      to={item.href}
                      className={cn(
                        "group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden",
                        "hover:shadow-lg hover:scale-105 hover:-translate-y-1",
                        isActive
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25"
                          : "text-slate-600 hover:bg-white/60 hover:backdrop-blur-sm hover:text-violet-600"
                      )}
                    >
                      {/* Hover effect background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 to-indigo-600/0 group-hover:from-violet-600/10 group-hover:to-indigo-600/10 transition-all duration-300 rounded-xl"></div>
                      
                      <item.icon className={cn(
                        "h-5 w-5 transition-all duration-300 relative z-10",
                        isActive ? "text-white drop-shadow-sm" : "group-hover:scale-110 group-hover:rotate-12"
                      )} />
                      <span className="relative z-10">{item.name}</span>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse shadow-lg"></div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 h-screen flex flex-col">
        {/* Top Bar with glassmorphism */}
        <header className="backdrop-blur-xl bg-white/70 border-b border-white/20 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Link 
                to="/admin" 
                className="hover:text-violet-600 transition-colors duration-200 hover:scale-105 transform"
              >
                Admin
              </Link>
              <ChevronRight className="h-4 w-4 animate-pulse" />
              <span className="text-slate-900 font-medium bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                {navigation.find(item => item.href === location.pathname)?.name || "Dashboard"}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Notification Bell with animation */}
              <button className="relative p-3 hover:bg-white/60 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg group">
                <Bell className="h-5 w-5 text-slate-600 group-hover:text-violet-600 transition-colors duration-300" />
                <span className={cn(
                  "absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold shadow-lg",
                  notificationPulse ? "animate-ping" : ""
                )}>
                  3
                </span>
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                  3
                </div>
              </button>

              {/* Profile with hover animation */}
              <button className="flex items-center gap-3 p-3 hover:bg-white/60 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900 group-hover:text-violet-600 transition-colors duration-300">
                    John Admin
                  </p>
                  <p className="text-xs text-slate-600">Administrator</p>
                </div>
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-center font-semibold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    JA
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></div>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content with fade-in animation */}
        <main className="flex-1 overflow-y-auto relative">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}