import { BarChart3, Bell, FileText, Search } from "lucide-react";

export const SidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, active: true },
    { id: "contracts", label: "My Contracts", icon: FileText },
    { id: "browse", label: "Browse Tenders", icon: Search },
    { id: "notifications", label: "Notifications", icon: Bell, badge: "12" },
  ];