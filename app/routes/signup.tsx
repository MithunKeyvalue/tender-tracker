import { Header } from "@/components/header";
import { Form, Link, redirect } from "react-router";
import type { Route } from "../+types/root";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Zap } from "lucide-react";
import { Footer } from "~/components/footer";
import { database } from "database/context";
import { users, contractors } from "database/schema";
import { hashPassword, createSession, createSessionCookie } from "~/lib/auth.server";
import { z } from "zod";
import { eq } from "drizzle-orm";

const SignupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  workEmail: z.string().email("Invalid email address"),
  companyName: z.string().min(1, "Company name is required"),
  businessCategory: z.string().min(1, "Business category is required"),
  terms: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const db = database();
  
  try {
    const validatedData = SignupSchema.parse(data);
    
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, validatedData.workEmail))
      .limit(1);
      
    if (existingUser.length > 0) {
      return { error: "An account with this email already exists" };
    }
    
    // Hash password
    const passwordHash = await hashPassword(validatedData.password);
    
    // Create user with contractor role
    const [newUser] = await db
      .insert(users)
      .values({
        email: validatedData.workEmail,
        passwordHash,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        role: "contractor",
      })
      .returning();
      
    // Create contractor profile
    await db
      .insert(contractors)
      .values({
        userId: newUser.id,
        companyName: validatedData.companyName,
      });
      
    // Create session
    const session = createSession(newUser.id);
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
    console.error("Signup error:", error);
    return { error: "Failed to create account. Please try again." };
  }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign Up - TenderFlow" },
    { name: "description", content: "Create your TenderFlow account" },
  ];
}

export default function Signup({ actionData }: Route.ComponentProps) {
  const error = actionData && typeof actionData === 'object' && 'error' in actionData 
    ? (actionData as { error: string }).error 
    : null;
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8">
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
              <Check className="w-4 h-4 mr-2" />
              Join 2,500+ Contractors
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transform<br />
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Your{" "}
                </span>
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Business
                </span>{" "}
                Today
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover high-value tenders with AI precision. Get started in under 60 seconds with our intelligent matching system.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3 rounded-xl bg-white p-4 shadow-lg">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">14-Day Free Trial</h3>
                  <p className="text-sm text-gray-500">No credit card required</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 rounded-xl bg-white p-4 shadow-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Instant Setup</h3>
                  <p className="text-sm text-gray-500">Start in 60 seconds</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Signup Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold text-gray-900">Get Started</CardTitle>
                <CardDescription className="text-gray-600">
                  Join thousands of successful contractors
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {error && (
                  <div className="p-3 rounded-md bg-red-50 border border-red-200">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                
                <Form method="post" className="space-y-4">
                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-[12px] font-medium text-gray-700">
                        First Name *
                      </Label>
                      <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-[12px] font-medium text-gray-700">
                        Last Name *
                      </Label>
                      <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Work Email */}
                  <div className="space-y-2">
                    <Label htmlFor="workEmail" className="text-[12px] font-medium text-gray-700">
                      Work Email *
                    </Label>
                    <Input
                      type="email"
                      id="workEmail"
                      name="workEmail"
                      placeholder="john@company.com"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  {/* Company Name */}
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-[12px] font-medium text-gray-700">
                      Company Name *
                    </Label>
                    <Input
                      type="text"
                      id="companyName"
                      name="companyName"
                      placeholder="Your Company Ltd."
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyUrl" className="text-[12px] font-medium text-gray-700">
                      Company Website (Optional)
                    </Label>
                    <Input
                      type="text"
                      id="companyUrl"
                      name="companyUrl"
                      placeholder="https://www.yourcompany.com"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required={false}
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
                      minLength={8}
                      required
                    />
                    <p className="text-xs text-gray-500">Must be at least 8 characters</p>
                  </div>
                  
                  {/* Business Category */}
                  <div className="space-y-2">
                    <Label htmlFor="businessCategory" className="text-[12px] font-medium text-gray-700">
                      Business Category *
                    </Label>
                    <select
                      id="businessCategory"
                      name="businessCategory"
                      className="w-full px-3 py-1 border border-gray-200 rounded-md bg-background focus:border-blue-500 focus:ring-blue-500 focus:outline-none h-8 text-[14px]"
                      required
                    >
                      <option value="">Select your category</option>
                      <option value="construction">Construction</option>
                      <option value="technology">Technology</option>
                      <option value="consulting">Consulting</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="services">Professional Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  {/* Terms Checkbox */}
                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox id="terms" name="terms" className="mt-1" required />
                    <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                      I agree to TenderFlow's{" "}
                      <Link to="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  
                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    variant="gradient"
                    size="lg"
                    className="w-full rounded-full font-semibold"
                  >
                    Start Free Trial →
                  </Button>
                </Form>
                
                {/* Sign in link */}
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline font-medium">
                      Sign in here
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