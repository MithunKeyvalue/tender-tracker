import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Award,
  BarChart3,
  Building2,
  Clock,
  Database,
  FileText,
  IndianRupee,
  Sparkles,
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
    gradient: "from-blue-600 via-blue-500 to-cyan-400",
    description: "Registered contractors",
    bgPattern: "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
  },
  {
    title: "Active Tenders",
    value: "156",
    change: "+23%",
    trend: "up",
    icon: FileText,
    gradient: "from-emerald-600 via-emerald-500 to-teal-400",
    description: "Live tender opportunities",
    bgPattern: "radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
  },
  {
    title: "Total Value",
    value: "₹4,250Cr",
    change: "+18%",
    trend: "up",
    icon: IndianRupee,
    gradient: "from-violet-600 via-purple-500 to-fuchsia-400",
    description: "Combined tender value",
    bgPattern: "radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
  },
  {
    title: "Organizations",
    value: "89",
    change: "+7%",
    trend: "up",
    icon: Building2,
    gradient: "from-amber-600 via-orange-500 to-red-400",
    description: "Government departments",
    bgPattern: "radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
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
    department: "NHAI",
    status: "active",
    progress: 65
  },
  {
    id: 2,
    name: "Water Treatment Plant Construction",
    deadline: "2025-02-20",
    priority: "medium",
    value: "₹28.5Cr",
    submissions: 15,
    department: "Municipal Corporation",
    status: "active",
    progress: 40
  },
  {
    id: 3,
    name: "Smart City IoT Implementation",
    deadline: "2025-03-10",
    priority: "medium",
    value: "₹15.8Cr",
    submissions: 34,
    department: "Smart City Mission",
    status: "evaluation",
    progress: 85
  },
  {
    id: 4,
    name: "Solar Power Plant - 50MW",
    deadline: "2025-04-05",
    priority: "high",
    value: "₹125Cr",
    submissions: 8,
    department: "MSEDCL",
    status: "new",
    progress: 20
  },
];

const systemStats = [
  {
    label: "Database Records",
    value: "45,892",
    icon: Database,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    trend: "+2.3%"
  },
  {
    label: "Tender Categories",
    value: "24",
    icon: Target,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    trend: "+8.1%"
  },
  {
    label: "Avg Tender Value",
    value: "₹27.3Cr",
    icon: TrendingUp,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    trend: "+12.4%"
  }
];

export default function AdminDashboard() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);
  const [hoveredTender, setHoveredTender] = useState<number | null>(null);

  useEffect(() => {
    // Staggered animation for metric cards
    metrics.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, index * 200);
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500';
      case 'evaluation': return 'bg-amber-500';
      case 'new': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'evaluation': return 'Under Evaluation';
      case 'new': return 'New';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_200px,rgba(120,119,198,0.3),transparent)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50px,rgba(120,119,198,0.15),transparent)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_400px,rgba(72,187,120,0.1),transparent)]"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-24 left-12 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-3xl rotate-12 animate-float"></div>
        <div className="absolute top-48 right-24 w-24 h-24 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-2xl -rotate-12 animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-violet-200/30 to-fuchsia-200/30 rounded-xl rotate-45 animate-float-slow"></div>
      </div>

      <div className="p-8 space-y-12 relative z-10">
        {/* Elegant Header */}
        <div className="text-center space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-xl border border-white/20 shadow-lg shadow-violet-500/10">
            <div className="relative">
              <Sparkles className="h-5 w-5 text-violet-600" />
              <div className="absolute inset-0 animate-pulse">
                <Sparkles className="h-5 w-5 text-violet-400 opacity-50" />
              </div>
            </div>
            <span className="text-sm font-semibold text-slate-700 tracking-wide">EXECUTIVE DASHBOARD</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                TenderFlow
              </span>
              <span className="block text-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-light mt-2">
                Business Intelligence
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              Real-time insights and analytics for government tender management ecosystem
            </p>
          </div>
        </div>

        {/* Premium Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={metric.title}
              className={cn(
                "transform transition-all duration-700 ease-out",
                visibleCards.includes(index) 
                  ? "translate-y-0 opacity-100" 
                  : "translate-y-12 opacity-0"
              )}
              onMouseEnter={() => setHoveredMetric(index)}
              onMouseLeave={() => setHoveredMetric(null)}
            >
              <Card className={cn(
                "relative overflow-hidden border-0 shadow-xl backdrop-blur-sm transition-all duration-500 group cursor-pointer",
                "bg-white/70 hover:bg-white/90 hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02]",
                hoveredMetric === index && "shadow-2xl -translate-y-3 scale-[1.02]"
              )}>
                {/* Dynamic background pattern */}
                <div 
                  className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-50"
                  style={{ background: metric.bgPattern }}
                />
                
                {/* Gradient border */}
                <div className={cn(
                  "absolute inset-0 rounded-xl bg-gradient-to-r p-[1px] transition-opacity duration-500",
                  metric.gradient,
                  "opacity-0 group-hover:opacity-100"
                )}>
                  <div className="h-full w-full rounded-xl bg-white/90 backdrop-blur-sm" />
                </div>

                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                        {metric.title}
                      </CardTitle>
                      <p className="text-xs text-slate-500 font-medium">{metric.description}</p>
                    </div>
                    <div className={cn(
                      "p-3 rounded-2xl bg-gradient-to-br shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                      metric.gradient
                    )}>
                      <metric.icon className="h-6 w-6 text-white drop-shadow-sm" />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10 space-y-4">
                  <div className="text-4xl font-bold text-slate-900 tracking-tight">
                    {metric.value}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm text-emerald-700 font-semibold">{metric.change}</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">vs last month</span>
                  </div>
                </CardContent>

                {/* Hover glow effect */}
                <div className={cn(
                  "absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 transition-opacity duration-500 blur-2xl",
                  metric.gradient,
                  hoveredMetric === index && "opacity-10"
                )} />
              </Card>
            </div>
          ))}
        </div>

        {/* Refined System Statistics */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl overflow-hidden group hover:shadow-3xl transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-white/50" />
          
          <CardHeader className="relative z-10 pb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-slate-900 tracking-tight">
                  System Analytics
                </CardTitle>
                <p className="text-slate-600 font-medium mt-1">Platform performance and data insights</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {systemStats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="group/stat relative p-6 rounded-2xl bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="flex items-center gap-5">
                    <div className={cn(
                      "p-4 rounded-2xl shadow-lg transition-all duration-300 group-hover/stat:scale-110",
                      stat.bgColor
                    )}>
                      <stat.icon className={cn("h-8 w-8", stat.color)} />
                    </div>
                    <div className="space-y-2">
                      <p className="text-3xl font-bold text-slate-900 tracking-tight">
                        {stat.value}
                      </p>
                      <p className="text-sm text-slate-600 font-semibold">{stat.label}</p>
                      <div className="flex items-center gap-2">
                        <Zap className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-green-600 font-semibold">{stat.trend}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sophisticated Active Tenders */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl overflow-hidden group hover:shadow-3xl transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-blue-50/30" />
          
          <CardHeader className="relative z-10 pb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 shadow-lg">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900 tracking-tight">
                    Active Tender Portfolio
                  </CardTitle>
                  <p className="text-slate-600 font-medium mt-1">Current opportunities and progress tracking</p>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="lg"
                className="px-6 py-3 rounded-2xl hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300 hover:scale-105 font-semibold"
              >
                View Portfolio
                <ArrowUpRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <div className="space-y-6">
              {activeTenders.map((tender, index) => (
                <div 
                  key={tender.id} 
                  className={cn(
                    "group/tender relative p-8 rounded-3xl border border-white/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-r from-white/70 to-white/50 backdrop-blur-sm animate-slide-in-left cursor-pointer",
                    hoveredTender === tender.id && "shadow-2xl -translate-y-2"
                  )}
                  style={{ animationDelay: `${index * 200}ms` }}
                  onMouseEnter={() => setHoveredTender(tender.id)}
                  onMouseLeave={() => setHoveredTender(null)}
                >
                  {/* Status indicator */}
                  <div className="absolute top-6 right-6">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-3 h-3 rounded-full", getStatusColor(tender.status))} />
                      <span className="text-sm font-semibold text-slate-600">{getStatusLabel(tender.status)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Tender Info */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-slate-900 group-hover/tender:text-emerald-700 transition-colors duration-300">
                          {tender.name}
                        </h3>
                        <p className="text-base text-slate-700 font-semibold">{tender.department}</p>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 text-slate-600">
                          <Clock className="h-5 w-5" />
                          <span className="font-medium">Deadline: {new Date(tender.deadline).toLocaleDateString()}</span>
                        </div>
                        
                        <Badge 
                          variant="outline"
                          className={cn(
                            "px-3 py-1 text-xs font-semibold border-2",
                            tender.priority === "high" && "border-red-200 text-red-700 bg-red-50",
                            tender.priority === "medium" && "border-amber-200 text-amber-700 bg-amber-50",
                            tender.priority === "low" && "border-green-200 text-green-700 bg-green-50"
                          )}
                        >
                          {tender.priority.toUpperCase()} PRIORITY
                        </Badge>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 font-medium">Progress</span>
                          <span className="text-slate-700 font-semibold">{tender.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${tender.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Value & Submissions */}
                    <div className="space-y-6 text-center lg:text-right">
                      <div className="space-y-2">
                        <p className="text-3xl font-bold text-slate-900">{tender.value}</p>
                        <p className="text-sm text-slate-600 font-medium">Contract Value</p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-emerald-600">{tender.submissions}</p>
                        <p className="text-sm text-slate-600 font-medium">Submissions Received</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Custom Animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-3deg);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(45deg);
          }
          50% {
            transform: translateY(-25px) rotate(50deg);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
          animation-delay: 4s;
        }

        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}