import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Award,
  Building2,
  Clock,
  Database,
  FileText,
  IndianRupee,
  Target,
  TrendingUp,
  Users
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
    description: "Registered contractors",
  },
  {
    title: "Active Tenders",
    value: "156",
    change: "+23%",
    trend: "up",
    icon: FileText,
    gradient: "from-emerald-500 to-teal-500",
    description: "Live tender opportunities",
  },
  {
    title: "Total Value",
    value: "₹4,250Cr",
    change: "+18%",
    trend: "up",
    icon: IndianRupee,
    gradient: "from-violet-500 to-purple-500",
    description: "Combined tender value",
  },
  {
    title: "Organizations",
    value: "89",
    change: "+7%",
    trend: "up",
    icon: Building2,
    gradient: "from-orange-500 to-red-500",
    description: "Government departments",
  },
];

const activeTenders = [
  {
    id: 1,
    name: "Highway Expansion Project - Phase 2",
    deadline: "2025-02-15",
    priority: "high",
    value: "₹45.2Cr",
    submissions: 23,
    department: "NHAI"
  },
  {
    id: 2,
    name: "Water Treatment Plant Construction",
    deadline: "2025-02-20",
    priority: "medium",
    value: "₹28.5Cr",
    submissions: 15,
    department: "Municipal Corporation"
  },
  {
    id: 3,
    name: "Smart City IoT Implementation",
    deadline: "2025-03-10",
    priority: "medium",
    value: "₹15.8Cr",
    submissions: 34,
    department: "Smart City Mission"
  },
  {
    id: 4,
    name: "Solar Power Plant - 50MW",
    deadline: "2025-04-05",
    priority: "high",
    value: "₹125Cr",
    submissions: 8,
    department: "MSEDCL"
  },
];

const systemStats = [
  {
    label: "Database Records",
    value: "45,892",
    icon: Database,
    color: "text-blue-600"
  },
  {
    label: "Tender Categories",
    value: "24",
    icon: Target,
    color: "text-emerald-600"
  },
  {
    label: "Avg Tender Value",
    value: "₹27.3Cr",
    icon: TrendingUp,
    color: "text-violet-600"
  }
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
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-indigo-100 border border-violet-200/50">
            <Target className="h-4 w-4 text-violet-600" />
            <span className="text-sm font-medium text-violet-700">Admin Dashboard</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-violet-800 to-indigo-900 bg-clip-text text-transparent">
            TenderFlow Overview
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Monitor tender management system with real-time analytics and business insights
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

        {/* System Statistics */}
        <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-500/5 to-gray-500/5" />
          
          <CardHeader className="relative z-10">
            <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Database className="h-5 w-5 text-slate-600" />
              System Statistics
            </CardTitle>
            <p className="text-sm text-slate-600">Key platform metrics and data insights</p>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {systemStats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/40 backdrop-blur-sm border border-white/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="p-3 rounded-lg bg-gray-100/60 group-hover:bg-white/80 transition-colors duration-300">
                    <stat.icon className={cn("h-6 w-6", stat.color)} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-sm text-slate-600">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Active Tenders */}
        <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5" />
          
          <CardHeader className="flex flex-row items-center justify-between relative z-10">
            <div className="space-y-2">
              <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-600" />
                Active Tenders
              </CardTitle>
              <p className="text-sm text-slate-600">Current tender opportunities in the system</p>
            </div>
            <Button variant="ghost" size="sm" className="hover:bg-emerald-100/50 hover:text-emerald-700 transition-all duration-300 hover:scale-105">
              View All
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
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
                        <p className="text-sm text-slate-600 font-medium">{tender.department}</p>
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
                </div>
              ))}
            </div>
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
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}