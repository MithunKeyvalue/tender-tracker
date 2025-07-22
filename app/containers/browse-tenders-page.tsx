import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, MapPin, Calendar, Building2, TrendingUp, Heart, ExternalLink } from "lucide-react";

const mockTenders = [
  {
    id: 1,
    title: "Construction of 6-Lane Highway Bridge",
    tenderNumber: "NHAI/2024/TND-156",
    department: "National Highways Authority of India",
    location: "Mumbai, Maharashtra",
    value: "₹45.5 Cr",
    deadline: "Mar 15, 2024",
    daysLeft: 23,
    category: "Infrastructure",
    matchScore: 92,
    saved: false,
    tags: ["Construction", "Highway", "Bridge"],
    description: "Construction of 6-lane highway bridge including approach roads and associated infrastructure.",
  },
  {
    id: 2,
    title: "Supply of Medical Equipment for District Hospital",
    tenderNumber: "DHO/2024/MED-089",
    department: "District Health Office",
    location: "Pune, Maharashtra",
    value: "₹12.3 Cr",
    deadline: "Mar 10, 2024",
    daysLeft: 18,
    category: "Healthcare",
    matchScore: 85,
    saved: true,
    tags: ["Medical", "Equipment", "Healthcare"],
    description: "Supply, installation and commissioning of advanced medical equipment including CT scan, MRI machines.",
  },
  {
    id: 3,
    title: "Smart City - IoT Implementation Phase 3",
    tenderNumber: "PCMC/2024/IOT-034",
    department: "Pimpri Chinchwad Municipal Corporation",
    location: "Pimpri-Chinchwad, Maharashtra",
    value: "₹8.7 Cr",
    deadline: "Mar 20, 2024",
    daysLeft: 28,
    category: "Technology",
    matchScore: 78,
    saved: false,
    tags: ["IoT", "Smart City", "Technology"],
    description: "Implementation of IoT sensors for traffic management, waste management and street lighting.",
  },
  {
    id: 4,
    title: "Solar Power Plant Installation - 50MW",
    tenderNumber: "MSEDCL/2024/SOL-045",
    department: "Maharashtra State Electricity Distribution",
    location: "Nashik, Maharashtra",
    value: "₹125 Cr",
    deadline: "Apr 5, 2024",
    daysLeft: 44,
    category: "Energy",
    matchScore: 88,
    saved: true,
    tags: ["Solar", "Renewable Energy", "Power Plant"],
    description: "Design, supply, installation and commissioning of 50MW solar power plant with grid connectivity.",
  },
];

const categories = ["All", "Infrastructure", "Healthcare", "Technology", "Energy", "Education", "Agriculture"];
const locations = ["All Locations", "Mumbai", "Pune", "Nashik", "Nagpur", "Thane"];
const valueRanges = ["All Values", "< ₹1 Cr", "₹1-10 Cr", "₹10-50 Cr", "₹50-100 Cr", "> ₹100 Cr"];

export const BrowseTendersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedValue, setSelectedValue] = useState("All Values");
  const [savedTenders, setSavedTenders] = useState<number[]>([2, 4]);
  const [showFilters, setShowFilters] = useState(true);

  const toggleSaved = (tenderId: number) => {
    setSavedTenders(prev => 
      prev.includes(tenderId) 
        ? prev.filter(id => id !== tenderId)
        : [...prev, tenderId]
    );
  };

  const filteredTenders = mockTenders.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tender.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tender.category === selectedCategory;
    const matchesLocation = selectedLocation === "All Locations" || tender.location.includes(selectedLocation);
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search tenders by title, department, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 text-base"
              />
            </div>
            <Button 
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-border hover:bg-accent"
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFilters ? "Hide" : "Show"} Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      {showFilters && (
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Category</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Location</label>
                <select 
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Value Range</label>
                <select 
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                  className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                >
                  {valueRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Found {filteredTenders.length} tenders
        </h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="border-border">
            <TrendingUp className="w-3 h-3 mr-1" />
            Best Matches First
          </Badge>
        </div>
      </div>

      {/* Tenders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTenders.map((tender) => (
          <Card key={tender.id} className="border-border bg-card hover:shadow-lg transition-all duration-300 hover:border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
                    {tender.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{tender.tenderNumber}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                    {tender.matchScore}% Match
                  </Badge>
                  <Button
                    onClick={() => toggleSaved(tender.id)}
                    variant={savedTenders.includes(tender.id) ? "destructive" : "ghost"}
                    size="icon"
                    className={savedTenders.includes(tender.id) ? "bg-destructive/10 hover:bg-destructive/20" : ""}
                  >
                    <Heart className={`w-4 h-4 ${savedTenders.includes(tender.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span className="line-clamp-1">{tender.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{tender.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Deadline: {tender.deadline}</span>
                  <Badge className="bg-chart-5/10 text-chart-5 border-chart-5/20 text-xs">
                    {tender.daysLeft} days left
                  </Badge>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {tender.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Estimated Value</p>
                  <p className="text-xl font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
                    {tender.value}
                  </p>
                </div>
                <div className="flex gap-2">
                  {tender.tags.slice(0, 2).map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="border-border text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="gradient" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" className="border-border hover:bg-accent">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};