import type { Route } from "./+types/dashboard";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Plus, BarChart3, FileText, Search, Settings as SettingsIcon } from "lucide-react";
import { Sidebar } from "~/containers/sidebar";
import { StatsCardSection } from "~/containers/stats-card-section";
import { MatchingContractsSection } from "~/containers/matching-contracts-section";
import { RecentNotifications } from "~/containers/recent-notifications";
import { MyContractsPage } from "~/containers/my-contracts-page";
import { BrowseTendersPage } from "~/containers/browse-tenders-page";
import { NotificationsPage } from "~/containers/notifications-page";
import { SettingsPage } from "~/containers/settings-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - TenderFlow" },
    { name: "description", content: "Your TenderFlow dashboard" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  // Check for login success from query params
  const url = new URL(request.url);
  const loginSuccess = url.searchParams.get("login") === "success";
  
  return { loginSuccess };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // Set login state if coming from successful login
    if (loaderData.loginSuccess) {
      sessionStorage.setItem("isLoggedIn", "true");
    }
    
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      window.location.href = "/login";
    }
  }, [loaderData.loginSuccess]);


  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Dashboard";
      case "contracts":
        return "My Contracts";
      case "browse":
        return "Browse Tenders";
      case "notifications":
        return "Notifications";
      case "settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  const getPageDescription = () => {
    switch (activeTab) {
      case "dashboard":
        return "Welcome back! Here's what's happening with your contracts.";
      case "contracts":
        return "Manage and track all your active and past contracts.";
      case "browse":
        return "Discover new tender opportunities matching your profile.";
      case "notifications":
        return "Stay updated with your tender alerts and contract updates.";
      case "settings":
        return "Manage your account settings and preferences.";
      default:
        return "";
    }
  };

  const getPageIcon = () => {
    switch (activeTab) {
      case "dashboard":
        return BarChart3;
      case "contracts":
        return FileText;
      case "browse":
        return Search;
      case "notifications":
        return Bell;
      case "settings":
        return SettingsIcon;
      default:
        return BarChart3;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <StatsCardSection />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <MatchingContractsSection />
              </div>
              <div className="xl:col-span-1">
                <RecentNotifications />
              </div>
            </div>
          </>
        );
      case "contracts":
        return <MyContractsPage />;
      case "browse":
        return <BrowseTendersPage />;
      case "notifications":
        return <NotificationsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col">
        <header className="bg-card shadow-sm border-b border-border px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {React.createElement(getPageIcon(), { className: "w-8 h-8 text-primary" })}
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
                  {getPageTitle()}
                </h1>
                <p className="text-muted-foreground mt-1">{getPageDescription()}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {activeTab === "dashboard" && (
                <>
                  <Button 
                    onClick={() => setActiveTab("notifications")}
                    variant="ghost"
                    size="icon"
                    className="relative"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                      12
                    </span>
                  </Button>
                  <Button variant="gradient" size="default">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Alert
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-muted/20">
          <div className="p-8 space-y-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}