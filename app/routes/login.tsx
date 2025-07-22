import { Header } from "@/components/header";
import { Form, redirect, Link } from "react-router";
import type { Route } from "./+types/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Shield, Zap } from "lucide-react";
import { Footer } from "~/components/footer";
import { 
  getUserByEmail, 
  verifyPassword, 
  createSession, 
  createSessionCookie,
  getSessionFromCookie,
  getSession,
  getUserById
} from "~/lib/auth.server";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.string().optional(),
});

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - TenderFlow" },
    { name: "description", content: "Login to your TenderFlow account" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const validatedData = LoginSchema.parse(data);
    
    // Find user by email
    const user = await getUserByEmail(validatedData.email);
    if (!user) {
      return { error: "Invalid email or password" };
    }
    
    // Verify password
    const isValidPassword = await verifyPassword(validatedData.password, user.passwordHash);
    if (!isValidPassword) {
      return { error: "Invalid email or password" };
    }
    
    // Check if user is active
    if (!user.isActive) {
      return { error: "Your account has been disabled. Please contact support." };
    }
    
    // Create session
    const session = createSession(user.id);
    const cookie = createSessionCookie(session.token);
    
    // Redirect to dashboard
    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": cookie,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }
    console.error("Login error:", error);
    return { error: "An error occurred. Please try again." };
  }
}

export async function loader({ request }: Route.LoaderArgs) {
  // Check if already logged in
  const cookieHeader = request.headers.get("Cookie");
  const sessionToken = getSessionFromCookie(cookieHeader);
  
  if (sessionToken) {
    const session = getSession(sessionToken);
    if (session) {
      const user = await getUserById(session.userId);
      if (user && user.isActive) {
        return redirect("/dashboard");
      }
    }
  }
  
  return null;
}

export default function Login({ actionData }: Route.ComponentProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8">
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
              <Shield className="w-4 h-4 mr-2" />
              Secure Login
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Welcome<br />
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Back
                </span>{" "}
                to<br />
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  TenderFlow
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Access your dashboard and continue discovering high-value tenders with our AI-powered matching system.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Secure Access</h3>
                  <p className="text-sm text-gray-500">Your data is protected</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Quick Access</h3>
                  <p className="text-sm text-gray-500">Get back to work instantly</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Login Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold text-gray-900">Sign In</CardTitle>
                <CardDescription className="text-gray-600">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {actionData?.error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{actionData.error}</AlertDescription>
                  </Alert>
                )}

                <Form method="post" className="space-y-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address *
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@company.com"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password *
                    </Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Remember me & Forgot password */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" name="remember" />
                      <Label htmlFor="remember" className="text-sm text-gray-600">
                        Remember me
                      </Label>
                    </div>
                    <Link to="#" className="text-sm text-blue-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    variant="gradient"
                    size="lg"
                    className="w-full rounded-full font-semibold"
                  >
                    Sign In →
                  </Button>
                </Form>
                
                {/* Sign up link */}
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                      Sign up here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}