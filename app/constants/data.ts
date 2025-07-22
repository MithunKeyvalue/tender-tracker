import { Award, BarChart3 } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { Calendar } from "lucide-react";

export  const statsCards = [
    {
      icon: BarChart3,
      value: "247",
      label: "Active Matches",
      trend: "+12%",
      positive: true,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: Award,
      value: "89%",
      label: "Match Score",
      trend: "+8%",
      positive: true,
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      icon: TrendingUp,
      value: "₹12.5Cr",
      label: "Total Value",
      trend: "+24%",
      positive: true,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: Calendar,
      value: "18",
      label: "Ending Soon",
      trend: "5 New",
      positive: false,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  export  const contracts = [
    {
      title: "Smart City Infrastructure Development",
      department: "Government of Maharashtra",
      category: "Construction & Civil Works",
      value: "₹2.5Cr",
      location: "Mumbai, Maharashtra",
      deadline: "Jan 15, 2025",
      matchScore: "94% Match",
      priority: "High Priority",
      daysLeft: "5 days left"
    },
    {
      title: "Medical Equipment Procurement",
      department: "Ministry of Health & Family Welfare",
      category: "Healthcare & Medical Supplies",
      value: "₹1.8Cr",
      location: "Delhi, NCR",
      deadline: "Jan 22, 2025",
      matchScore: "87% Match",
      priority: "Medium Priority",
      daysLeft: "12 days left"
    }
  ];

  export const notifications = [
    {
      type: "match",
      title: "New High-Match Contract",
      description: "Smart City project with 94% match score available",
      time: "2 minutes ago",
      icon: "🎯"
    },
    {
      type: "application",
      title: "Application Submitted",
      description: "Your bid for Hospital Equipment Supply has been submitted",
      time: "1 hour ago",
      icon: "✅"
    }
  ];