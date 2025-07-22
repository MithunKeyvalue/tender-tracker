import type { Route } from "./+types/tender-details.$id";
import { useNavigate } from "react-router";
import { ArrowLeft, MapPin, Calendar, Building2, Award, FileText, Clock, AlertCircle, Download, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { contracts } from "~/constants/data";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "Tender Details - TenderFlow" },
    { name: "description", content: "View tender details and requirements" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const tenderId = params.id;
  // In a real app, fetch tender details from database
  // For now, we'll use mock data
  const tenderIndex = parseInt(tenderId) || 0;
  const tender = contracts[tenderIndex] || contracts[0];
  
  return { tender, tenderId };
}

export default function TenderDetails({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { tender } = loaderData;

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="h-10 w-10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Tender Details
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Review tender requirements and submit your application
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Bookmark className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Download className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <Card className="mb-8 border-border bg-card shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    {tender.title}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {tender.department} • {tender.category}
                  </p>
                </div>
                <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20 px-4 py-2 text-lg font-medium">
                  {tender.matchScore}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contract Value</p>
                    <p className="text-2xl font-bold bg-gradient-to-br from-primary to-chart-1 bg-clip-text text-transparent">
                      {tender.value}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-chart-3" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-base font-semibold text-foreground">
                      {tender.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-chart-4/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-chart-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Deadline</p>
                    <p className="text-base font-semibold text-foreground">
                      {tender.deadline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-chart-5/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-chart-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time Left</p>
                    <p className="text-base font-semibold text-foreground">
                      {tender.daysLeft}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                  {tender.priority}
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  Open for Bidding
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  Pre-Qualification Required
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Overview */}
              <Card className="border-border bg-card shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Project Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Description</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      This tender involves the development of smart city infrastructure including IoT sensors, 
                      traffic management systems, and public safety monitoring equipment. The project aims to 
                      enhance urban living standards and improve city services efficiency.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Scope of Work</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Installation of 500+ IoT sensors across the city</li>
                      <li>Development of centralized monitoring dashboard</li>
                      <li>Integration with existing city infrastructure</li>
                      <li>24/7 technical support for 3 years</li>
                      <li>Training for municipal staff</li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Key Requirements</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>ISO 9001:2015 certification required</li>
                      <li>Minimum 5 years experience in similar projects</li>
                      <li>Annual turnover of at least ₹10 Crores</li>
                      <li>Technical team with certified professionals</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card className="border-border bg-card shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Tender Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Tender Notice.pdf", size: "2.4 MB" },
                      { name: "Technical Specifications.pdf", size: "5.8 MB" },
                      { name: "Terms and Conditions.pdf", size: "1.2 MB" },
                      { name: "BOQ Template.xlsx", size: "856 KB" },
                    ].map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary/20 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-foreground">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">{doc.size}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Important Dates */}
              <Card className="border-border bg-card shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Important Dates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: "Published Date", date: "Jan 01, 2025" },
                      { label: "Pre-bid Meeting", date: "Jan 08, 2025" },
                      { label: "Clarification Deadline", date: "Jan 10, 2025" },
                      { label: "Submission Deadline", date: "Jan 15, 2025" },
                      { label: "Opening Date", date: "Jan 16, 2025" },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium text-foreground">{item.date}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Organization Details */}
              <Card className="border-border bg-card shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    Organization Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Department</p>
                      <p className="font-medium text-foreground">{tender.department}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Contact Person</p>
                      <p className="font-medium text-foreground">Mr. Rajesh Kumar</p>
                      <p className="text-sm text-muted-foreground">Deputy Director - Procurement</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">procurement@maharashtra.gov.in</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium text-foreground">+91 22 2202 5000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Card */}
              <Card className="border-primary/20 bg-primary/5 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Ready to Apply?</p>
                      <p className="text-sm text-muted-foreground">
                        Ensure you meet all requirements before submitting your application.
                      </p>
                    </div>
                  </div>
                  <Button variant="gradient" className="w-full" size="lg">
                    Submit Application
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    Application fee: ₹5,000 + GST
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}