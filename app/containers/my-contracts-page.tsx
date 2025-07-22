import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Filter, Search, Calendar, DollarSign } from "lucide-react";

const mockContracts = [
  {
    id: 1,
    title: "Highway Construction Project - Phase 2",
    contractNumber: "NHAI/2024/HC-002",
    status: "active",
    value: "₹12.5 Cr",
    startDate: "Jan 15, 2024",
    endDate: "Dec 31, 2024",
    progress: 45,
    department: "National Highways Authority",
    nextMilestone: "Foundation completion",
    daysLeft: 284,
  },
  {
    id: 2,
    title: "Smart City IT Infrastructure",
    contractNumber: "MCGM/2024/IT-045",
    status: "pending",
    value: "₹3.2 Cr",
    startDate: "Feb 1, 2024",
    endDate: "Aug 31, 2024",
    progress: 0,
    department: "Mumbai Municipal Corporation",
    nextMilestone: "Contract signing",
    daysLeft: 220,
  },
  {
    id: 3,
    title: "Water Treatment Plant Maintenance",
    contractNumber: "JNPT/2023/WTP-112",
    status: "completed",
    value: "₹1.8 Cr",
    startDate: "Jun 1, 2023",
    endDate: "Dec 31, 2023",
    progress: 100,
    department: "Jawaharlal Nehru Port Trust",
    nextMilestone: "Completed",
    daysLeft: 0,
  },
  {
    id: 4,
    title: "Solar Power Installation - Government Buildings",
    contractNumber: "MSEDCL/2024/SOL-018",
    status: "active",
    value: "₹5.7 Cr",
    startDate: "Mar 1, 2024",
    endDate: "Sep 30, 2024",
    progress: 20,
    department: "Maharashtra State Electricity",
    nextMilestone: "Site survey completion",
    daysLeft: 192,
  },
];

export const MyContractsPage = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "pending":
        return "bg-chart-5/10 text-chart-5 border-chart-5/20";
      case "completed":
        return "bg-muted text-muted-foreground border-muted";
      default:
        return "";
    }
  };

  const filteredContracts = mockContracts.filter((contract) => {
    const matchesStatus = filterStatus === "all" || contract.status === filterStatus;
    const matchesSearch = contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contract.contractNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-border bg-card hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Contracts</p>
                <p className="text-2xl font-bold text-foreground">{mockContracts.length}</p>
              </div>
              <FileText className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-chart-2">{mockContracts.filter(c => c.status === "active").length}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-chart-2/20 animate-pulse" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">₹22.2 Cr</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold text-foreground">41%</p>
              </div>
              <div className="w-16 h-16 relative">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-muted" />
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" 
                    className="text-primary" strokeDasharray={`${2 * Math.PI * 28 * 0.41} ${2 * Math.PI * 28}`} />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search contracts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setFilterStatus("all")}
                variant={filterStatus === "all" ? "default" : "secondary"}
                size="default"
              >
                All
              </Button>
              <Button
                onClick={() => setFilterStatus("active")}
                variant={filterStatus === "active" ? "default" : "secondary"}
                size="default"
              >
                Active
              </Button>
              <Button
                onClick={() => setFilterStatus("pending")}
                variant={filterStatus === "pending" ? "default" : "secondary"}
                size="default"
              >
                Pending
              </Button>
              <Button
                onClick={() => setFilterStatus("completed")}
                variant={filterStatus === "completed" ? "default" : "secondary"}
                size="default"
              >
                Completed
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contracts List */}
      <div className="space-y-4">
        {filteredContracts.map((contract) => (
          <Card key={contract.id} className="border-border bg-card hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{contract.title}</h3>
                      <p className="text-sm text-muted-foreground">{contract.contractNumber}</p>
                    </div>
                    <Badge className={getStatusColor(contract.status)}>
                      {contract.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Department</p>
                      <p className="text-sm font-medium text-foreground">{contract.department}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Contract Value</p>
                      <p className="text-sm font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
                        {contract.value}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium text-foreground">
                        {contract.startDate} - {contract.endDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Next Milestone</p>
                      <p className="text-sm font-medium text-foreground">{contract.nextMilestone}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {contract.status !== "pending" && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-muted-foreground">Progress</p>
                        <p className="text-xs font-medium text-foreground">{contract.progress}%</p>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-chart-1 transition-all duration-500"
                          style={{ width: `${contract.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-border hover:bg-accent">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="border-border hover:bg-accent">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};