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
import { requireAuth } from "~/lib/auth.server";
import { database } from "database/context";
import { tenders, savedTenders, tenderApplications, contractors } from "database/schema";
import { eq, desc, sql } from "drizzle-orm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - TenderFlow" },
    { name: "description", content: "Your TenderFlow dashboard" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  // Require authentication
  const { user } = await requireAuth(request);
  const db = database();
  
  // Get user's contractor profile if they have one
  let contractorProfile = null;
  if (user.role === "contractor") {
    const contractor = await db
      .select()
      .from(contractors)
      .where(eq(contractors.userId, user.id))
      .limit(1);
    contractorProfile = contractor[0] || null;
  }
  
  // Get statistics
  const stats = {
    activeTenders: 0,
    savedTenders: 0,
    submittedApplications: 0,
    notifications: 12, // Placeholder for now
  };
  
  // Count active tenders
  const [activeTendersCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(tenders)
    .where(eq(tenders.status, "published"));
  stats.activeTenders = Number(activeTendersCount?.count || 0);
  
  // Count saved tenders for this user
  const [savedTendersCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(savedTenders)
    .where(eq(savedTenders.userId, user.id));
  stats.savedTenders = Number(savedTendersCount?.count || 0);
  
  // Count submitted applications if contractor
  if (contractorProfile) {
    const [applicationsCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(tenderApplications)
      .where(eq(tenderApplications.contractorId, contractorProfile.id));
    stats.submittedApplications = Number(applicationsCount?.count || 0);
  }
  
  // Get recent tenders for display
  const recentTenders = await db
    .select({
      id: tenders.id,
      title: tenders.title,
      organization: tenders.organization,
      estimatedValue: tenders.estimatedValue,
      submissionDeadline: tenders.submissionDeadline,
      status: tenders.status,
    })
    .from(tenders)
    .where(eq(tenders.status, "published"))
    .orderBy(desc(tenders.publishedDate))
    .limit(5);
  
  return { 
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    contractorProfile,
    stats,
    recentTenders,
  };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, stats } = loaderData;


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
            <StatsCardSection stats={stats} />
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
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />

      <div className="flex-1 flex flex-col">
        <header className="bg-card shadow-sm border-b border-border">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                {React.createElement(getPageIcon(), { className: "w-7 h-7 text-primary flex-shrink-0" })}
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent leading-tight">
                    {getPageTitle()}
                  </h1>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {activeTab === "dashboard" 
                      ? `Welcome back, ${user.firstName}! Here's what's happening with your contracts.`
                      : getPageDescription()
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {activeTab === "dashboard" && (
                  <>
                    <Button 
                      onClick={() => setActiveTab("notifications")}
                      variant="ghost"
                      size="icon"
                      className="relative h-10 w-10"
                    >
                      <Bell className="w-5 h-5" />
                      <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                        {stats.notifications}
                      </span>
                    </Button>
                    <Button variant="gradient" size="default" className="h-10">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Alert
                    </Button>
                  </>
                )}
              </div>
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