import type { Route } from "./+types/dashboard";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Plus } from "lucide-react";
import { Sidebar } from "~/containers/sidebar";
import { StatsCardSection } from "~/containers/stats-card-section";
import { FilterContractsSection } from "~/containers/filter-contracts-section";
import { MatchingContractsSection } from "~/containers/matching-contracts-section";
import { RecentNotifications } from "~/containers/recent-notifications";

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

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };


  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your contracts.</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-6 h-6" />
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  1
                </Badge>
              </button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Alert
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex">
          <div className="flex-1 p-6 space-y-6">
            <StatsCardSection />
            <FilterContractsSection />
            <div className="flex justify-between gap-4">
              <MatchingContractsSection />
              <RecentNotifications />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}