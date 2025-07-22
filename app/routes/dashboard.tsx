import { Link, redirect } from "react-router";
import type { Route } from "./+types/dashboard";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - MyApp" },
    { name: "description", content: "Your personal dashboard" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  // Check for login success from query params
  const url = new URL(request.url);
  const loginSuccess = url.searchParams.get("login") === "success";
  
  return { loginSuccess };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
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
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <nav className="flex gap-4">
              <Button asChild variant="ghost">
                <Link to="/">Home</Link>
              </Button>
              <Button
                onClick={handleLogout}
                variant="destructive"
              >
                Logout
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Welcome back!</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              You have successfully logged into your dashboard. This is a protected page that only logged-in users can access.
            </CardDescription>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="p-0">
                Edit Profile →
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
              <CardDescription>View your recent activity and history</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="p-0">
                View Activity →
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Configure your application preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="p-0">
                Manage Settings →
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-primary/5">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">24</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">143</p>
                <p className="text-sm text-muted-foreground">Tasks Completed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">89%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">12</p>
                <p className="text-sm text-muted-foreground">Team Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}