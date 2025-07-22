import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Award,
  Clock,
  Eye,
  MessageSquare,
  Phone,
  Send,
  Target,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";
import { useEffect, useState } from "react";

const metrics = [
  {
    title: "Total Contractors",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Users,
    gradient: "from-blue-500 to-cyan-500",
    description: "Active registered contractors",
  },
  {
    title: "Verified Phones",
    value: "2,134",
    change: "+8%",
    trend: "up",
    icon: Phone,
    gradient: "from-emerald-500 to-teal-500",
    description: "Verified contact numbers",
  },
  {
    title: "SMS Opt-ins",
    value: "1,892",
    change: "+15%",
    trend: "up",
    icon: MessageSquare,
    gradient: "from-violet-500 to-purple-500",
    description: "Notification subscribers",
  },
  {
    title: "Open Rate",
    value: "78%",
    change: "+5%",
    trend: "up",
    icon: Eye,
    gradient: "from-orange-500 to-red-500",
    description: "Message engagement rate",
  },
];

const recentOutreach = [
  {
    id: 1,
    contractorName: "ABC Construction Ltd.",
    phone: "+1 (555) 123-4567",
    tenderName: "Highway Expansion Project",
    status: "delivered",
    avatar: "AC",
    time: "2 mins ago"
  },
  {
    id: 2,
    contractorName: "XYZ Infrastructure",
    phone: "+1 (555) 987-6543",
    tenderName: "Bridge Renovation Tender",
    status: "delivered",
    avatar: "XI",
    time: "15 mins ago"
  },
  {
    id: 3,
    contractorName: "BuildRight Corp",
    phone: "+1 (555) 456-7890",
    tenderName: "School Building Contract",
    status: "failed",
    avatar: "BC",
    time: "1 hour ago"
  },
];

const activeTenders = [
  {
    id: 1,
    name: "Highway Expansion Project - Phase 2",
    deadline: "2025-02-15",
    priority: "high",
    value: "₹45.2Cr",
    submissions: 23
  },
  {
    id: 2,
    name: "Water Treatment Plant Construction",
    deadline: "2025-02-20",
    priority: "medium",
    value: "₹28.5Cr",
    submissions: 15
  },
  {
    id: 3,
    name: "Municipal Building Renovation",
    deadline: "2025-02-28",
    priority: "low",
    value: "₹12.8Cr",
    submissions: 8
  },
];

export default function AdminDashboard() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);

  useEffect(() => {
    // Staggered animation for metric cards
    metrics.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, index * 150);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-100/50 relative">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-violet-400/20 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i}s`
            }}
          />
        ))}
      </div>

      <div className="p-6 space-y-8 relative z-10">
        {/* Header with enhanced animation */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-indigo-100 border border-violet-200/50">
            <Target className="h-4 w-4 text-violet-600" />
            <span className="text-sm font-medium text-violet-700">Admin Dashboard</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-violet-800 to-indigo-900 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Monitor contractor outreach and tender notifications with real-time analytics and insights
          </p>
        </div>

        {/* Enhanced Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={metric.title}
              className={cn(
                "transform transition-all duration-500",
                visibleCards.includes(index) 
                  ? "translate-y-0 opacity-100" 
                  : "translate-y-8 opacity-0"
              )}
              onMouseEnter={() => setHoveredMetric(index)}
              onMouseLeave={() => setHoveredMetric(null)}
            >
              <Card className={cn(
                "relative overflow-hidden border-0 shadow-xl backdrop-blur-sm transition-all duration-300",
                "bg-white/60 hover:bg-white/80 hover:shadow-2xl hover:-translate-y-2 hover:scale-105",
                hoveredMetric === index && "shadow-2xl -translate-y-2 scale-105"
              )}>
                {/* Gradient background */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-5 transition-opacity duration-300",
                  metric.gradient,
                  hoveredMetric === index && "opacity-10"
                )} />
                
                {/* Animated border */}
                <div className={cn(
                  "absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r transition-opacity duration-300",
                  metric.gradient,
                  "opacity-0 hover:opacity-20"
                )} style={{ 
                  backgroundClip: 'padding-box',
                  WebkitBackgroundClip: 'padding-box' 
                }} />

                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium text-slate-600">
                      {metric.title}
                    </CardTitle>
                    <p className="text-xs text-slate-500">{metric.description}</p>
                  </div>
                  <div className={cn(
                    "p-3 rounded-xl bg-gradient-to-r transition-transform duration-300",
                    metric.gradient,
                    hoveredMetric === index && "scale-110 rotate-3"
                  )}>
                    <metric.icon className="h-5 w-5 text-white drop-shadow-sm" />
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-slate-900">{metric.value}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100/80">
                        <TrendingUp className="h-3 w-3 text-emerald-600" />
                        <span className="text-xs text-emerald-700 font-semibold">{metric.change}</span>
                      </div>
                      <span className="text-xs text-slate-500">from last month</span>
                    </div>
                  </div>
                </CardContent>

                {/* Hover glow effect */}
                <div className={cn(
                  "absolute inset-0 rounded-lg bg-gradient-to-r opacity-0 transition-opacity duration-300 blur-xl",
                  metric.gradient,
                  hoveredMetric === index && "opacity-20"
                )} />
              </Card>
            </div>
          ))}
        </div>

        {/* Enhanced Recent Outreach */}
        <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
          
          <CardHeader className="flex flex-row items-center justify-between relative z-10">
            <div className="space-y-2">
              <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Zap className="h-5 w-5 text-violet-600" />
                Recent Outreach
              </CardTitle>
              <p className="text-sm text-slate-600">Latest contractor communications</p>
            </div>
            <Button variant="ghost" size="sm" className="hover:bg-violet-100/50 hover:text-violet-700 transition-all duration-300 hover:scale-105">
              View All
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <div className="space-y-4">
              {recentOutreach.map((contact, index) => (
                <div 
                  key={contact.id} 
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border border-white/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/40 backdrop-blur-sm group animate-slide-in-right"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-12 w-12 rounded-full bg-gradient-to-r flex items-center justify-center text-white font-semibold shadow-lg transition-transform duration-300 group-hover:scale-110",
                      contact.status === "delivered" ? "from-emerald-500 to-teal-500" : "from-red-500 to-pink-500"
                    )}>
                      {contact.avatar}
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-900 group-hover:text-violet-700 transition-colors duration-300">
                        {contact.contractorName}
                      </p>
                      <p className="text-sm text-slate-600">{contact.phone}</p>
                      <p className="text-sm text-slate-500">{contact.tenderName}</p>
                      <p className="text-xs text-slate-400">{contact.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={contact.status === "delivered" ? "default" : "destructive"}
                      className={cn(
                        "transition-all duration-300 hover:scale-105",
                        contact.status === "delivered" 
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25" 
                          : "bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/25"
                      )}
                    >
                      {contact.status === "delivered" ? "Delivered" : "Failed"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Active Tenders */}
        <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5" />
          
          <CardHeader className="relative z-10">
            <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-600" />
              Active Tenders
            </CardTitle>
            <p className="text-sm text-slate-600">Ongoing tender opportunities</p>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <div className="space-y-4">
              {activeTenders.map((tender, index) => (
                <div 
                  key={tender.id} 
                  className={cn(
                    "flex items-center justify-between p-5 rounded-xl border border-white/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/40 backdrop-blur-sm group animate-slide-in-left"
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="space-y-3 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <p className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors duration-300">
                          {tender.name}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Clock className="h-4 w-4" />
                            <span>Deadline: {new Date(tender.deadline).toLocaleDateString()}</span>
                          </div>
                          <Badge 
                            variant="outline"
                            className={cn(
                              "text-xs",
                              tender.priority === "high" && "border-red-200 text-red-700 bg-red-50",
                              tender.priority === "medium" && "border-yellow-200 text-yellow-700 bg-yellow-50",
                              tender.priority === "low" && "border-green-200 text-green-700 bg-green-50"
                            )}
                          >
                            {tender.priority} priority
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-right space-y-1">
                        <div className="text-lg font-bold text-slate-900">{tender.value}</div>
                        <div className="text-sm text-slate-600">{tender.submissions} submissions</div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="ml-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Push Notification
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Bulk Alert Section */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-indigo-500/5" />
          
          <CardHeader className="relative z-10">
            <CardTitle className="text-xl font-bold text-slate-900">Send Bulk Tender Alerts</CardTitle>
            <p className="text-slate-600 mt-1">
              Notify all opted-in contractors about new opportunities instantly
            </p>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-white"
            >
              <Send className="h-5 w-5 mr-2" />
              Send New Tender Alert
              <ArrowUpRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}