import { Outlet, Link, useLocation } from "react-router";
import { Bell, 
  LayoutDashboard, 
  Users, 
  FileText, 
  MessageSquare, 
  FileType, 
  Settings,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

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

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-border">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-5 border-b border-border">
            <h1 className="text-xl font-bold text-foreground">TenderHub Admin</h1>
            <p className="text-sm text-muted-foreground mt-1">Government Tender Management</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href === "/admin" && location.pathname === "/admin/");
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/admin" className="hover:text-foreground">Admin</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">
                {navigation.find(item => item.href === location.pathname)?.name || "Dashboard"}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-destructive rounded-full flex items-center justify-center text-[10px] text-destructive-foreground">
                  3
                </span>
              </button>

              {/* Profile */}
              <button className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">John Admin</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                  JA
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <Outlet />
        </main>
      </div>
    </div>
  );
}