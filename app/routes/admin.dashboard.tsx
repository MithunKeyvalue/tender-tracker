import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Phone, 
  MessageSquare, 
  Eye,
  TrendingUp,
  Clock,
  Send
} from "lucide-react";

const metrics = [
  {
    title: "Total Contractors",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Verified Phones",
    value: "2,134",
    change: "+8%",
    trend: "up",
    icon: Phone,
  },
  {
    title: "SMS Opt-ins",
    value: "1,892",
    change: "+15%",
    trend: "up",
    icon: MessageSquare,
  },
  {
    title: "Open Rate",
    value: "78%",
    change: "+5%",
    trend: "up",
    icon: Eye,
  },
];

const recentOutreach = [
  {
    id: 1,
    contractorName: "ABC Construction Ltd.",
    phone: "+1 (555) 123-4567",
    tenderName: "Highway Expansion Project",
    status: "delivered",
  },
  {
    id: 2,
    contractorName: "XYZ Infrastructure",
    phone: "+1 (555) 987-6543",
    tenderName: "Bridge Renovation Tender",
    status: "delivered",
  },
  {
    id: 3,
    contractorName: "BuildRight Corp",
    phone: "+1 (555) 456-7890",
    tenderName: "School Building Contract",
    status: "failed",
  },
];

const activeTenders = [
  {
    id: 1,
    name: "Highway Expansion Project - Phase 2",
    deadline: "2025-02-15",
  },
  {
    id: 2,
    name: "Water Treatment Plant Construction",
    deadline: "2025-02-20",
  },
  {
    id: 3,
    name: "Municipal Building Renovation",
    deadline: "2025-02-28",
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Monitor contractor outreach and tender notifications</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600 font-medium">{metric.change}</span>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Outreach */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Outreach</CardTitle>
          <Button variant="ghost" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOutreach.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{contact.contractorName}</p>
                  <p className="text-sm text-muted-foreground">{contact.phone}</p>
                  <p className="text-sm text-muted-foreground">{contact.tenderName}</p>
                </div>
                <Badge variant={contact.status === "delivered" ? "default" : "destructive"}>
                  {contact.status === "delivered" ? "Delivered" : "Failed"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Tenders */}
      <Card>
        <CardHeader>
          <CardTitle>Active Tenders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeTenders.map((tender) => (
              <div key={tender.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{tender.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Deadline: {new Date(tender.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Send className="h-3 w-3 mr-2" />
                  Push Notification
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Send Bulk Tender Alerts */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Send Bulk Tender Alerts</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Notify all opted-in contractors about new opportunities
          </p>
        </CardHeader>
        <CardContent>
          <Button size="lg" className="w-full sm:w-auto">
            <Send className="h-4 w-4 mr-2" />
            Send New Tender Alert
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}