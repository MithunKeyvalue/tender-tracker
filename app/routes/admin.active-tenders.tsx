import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  AtSign,
  Building2,
  CheckCircle,
  ChevronLeft,
  Clock,
  IndianRupee,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  PhoneCall,
  Search,
  Send,
  Target,
  Users,
  Zap
} from "lucide-react";
import { useState } from "react";

const mockTenders = [
  {
    id: 1,
    title: "Highway Expansion Project - Phase 2",
    value: "₹45.2Cr",
    deadline: "2025-02-15",
    department: "NHAI",
    location: "Mumbai, Maharashtra",
    category: "Infrastructure",
    priority: "high",
    contractorsCount: 156,
    description: "Construction of 25km highway expansion with bridges"
  },
  {
    id: 2,
    title: "Water Treatment Plant Construction",
    value: "₹28.5Cr",
    deadline: "2025-02-20",
    department: "Municipal Corporation",
    location: "Pune, Maharashtra",
    category: "Civil Works",
    priority: "medium",
    contractorsCount: 89,
    description: "Advanced water treatment facility for 2 lakh population"
  },
  {
    id: 3,
    title: "Smart City IoT Implementation",
    value: "₹15.8Cr",
    deadline: "2025-03-10",
    department: "Smart City Mission",
    location: "Nashik, Maharashtra",
    category: "Technology",
    priority: "medium",
    contractorsCount: 234,
    description: "IoT sensors for traffic, waste, and energy management"
  },
  {
    id: 4,
    title: "Solar Power Plant - 50MW",
    value: "₹125Cr",
    deadline: "2025-04-05",
    department: "MSEDCL",
    location: "Aurangabad, Maharashtra",
    category: "Renewable Energy",
    priority: "high",
    contractorsCount: 67,
    description: "Grid-connected solar power generation facility"
  }
];

const mockContractors = [
  {
    id: 1,
    name: "ABC Infrastructure Ltd.",
    phone: "+91 9876543210",
    email: "contact@abcinfra.com",
    specialization: "Highway Construction",
    location: "Mumbai",
    experience: "15+ years",
    lastContacted: "2 days ago",
    responseRate: "85%",
    status: "verified",
    avatar: "AI"
  },
  {
    id: 2,
    name: "Green Energy Solutions",
    phone: "+91 8765432109",
    email: "info@greenenergy.com",
    specialization: "Solar Projects",
    location: "Pune",
    experience: "12+ years",
    lastContacted: "1 week ago",
    responseRate: "92%",
    status: "verified",
    avatar: "GE"
  },
  {
    id: 3,
    name: "Smart Tech Contractors",
    phone: "+91 7654321098",
    email: "hello@smarttech.com",
    specialization: "IoT & Technology",
    location: "Nashik",
    experience: "8+ years",
    lastContacted: "3 days ago",
    responseRate: "78%",
    status: "verified",
    avatar: "ST"
  },
  {
    id: 4,
    name: "Aqua Build Corporation",
    phone: "+91 6543210987",
    email: "projects@aquabuild.com",
    specialization: "Water Infrastructure",
    location: "Pune",
    experience: "20+ years",
    lastContacted: "5 days ago",
    responseRate: "88%",
    status: "verified",
    avatar: "AB"
  },
  {
    id: 5,
    name: "Metro Construction Co.",
    phone: "+91 5432109876",
    email: "business@metroconstruction.com",
    specialization: "Infrastructure & Civil",
    location: "Mumbai",
    experience: "18+ years",
    lastContacted: "1 hour ago",
    responseRate: "91%",
    status: "verified",
    avatar: "MC"
  }
];

const notificationChannels = [
  {
    id: 'phone',
    name: 'Phone Call',
    icon: PhoneCall,
    color: 'from-blue-500 to-cyan-500',
    description: 'Direct voice call'
  },
  {
    id: 'sms',
    name: 'SMS',
    icon: MessageCircle,
    color: 'from-green-500 to-emerald-500',
    description: 'Text message'
  },
  {
    id: 'email',
    name: 'Email',
    icon: AtSign,
    color: 'from-violet-500 to-purple-500',
    description: 'Email notification'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: MessageSquare,
    color: 'from-emerald-600 to-green-600',
    description: 'WhatsApp message'
  }
];

const steps = [
  { id: 1, name: 'Select Tender', description: 'Choose an active tender', icon: Building2 },
  { id: 2, name: 'Find Contractors', description: 'Match relevant contractors', icon: Users },
  { id: 3, name: 'Send Notifications', description: 'Choose communication channels', icon: Send }
];

export default function AdminActiveTenders() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTender, setSelectedTender] = useState<number | null>(null);
  const [selectedContractors, setSelectedContractors] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [isNotifying, setIsNotifying] = useState(false);

  const selectedTenderData = mockTenders.find(t => t.id === selectedTender);
  
  // Filter contractors based on selected tender and search
  const filteredContractors = mockContractors.filter(contractor => {
    const matchesSearch = contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contractor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!selectedTender) return matchesSearch;
    
    // Simple matching logic - in real app, this would be more sophisticated
    const tenderData = mockTenders.find(t => t.id === selectedTender);
    if (!tenderData) return matchesSearch;
    
    const matchesTender = 
      contractor.specialization.toLowerCase().includes(tenderData.category.toLowerCase()) ||
      contractor.location.toLowerCase().includes(tenderData.location.split(',')[0].toLowerCase());
    
    return matchesSearch && matchesTender;
  });

  const handleContractorSelect = (contractorId: number) => {
    setSelectedContractors(prev => 
      prev.includes(contractorId) 
        ? prev.filter(id => id !== contractorId)
        : [...prev, contractorId]
    );
  };

  const handleSelectAll = () => {
    setSelectedContractors(
      selectedContractors.length === filteredContractors.length 
        ? [] 
        : filteredContractors.map(c => c.id)
    );
  };

  const handleChannelToggle = (channelId: string) => {
    setSelectedChannels(prev =>
      prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const handleSendNotifications = async () => {
    if (selectedContractors.length === 0 || selectedChannels.length === 0) return;
    
    setIsNotifying(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsNotifying(false);
    
    // Reset for new workflow
    setCurrentStep(1);
    setSelectedTender(null);
    setSelectedContractors([]);
    setSelectedChannels([]);
    
    // In real app, show success notification
    alert(`🎉 Notifications sent to ${selectedContractors.length} contractors via ${selectedChannels.length} channels!`);
  };

  const canProceedToStep2 = selectedTender !== null;
  const canProceedToStep3 = selectedContractors.length > 0;
  const canSendNotifications = selectedContractors.length > 0 && selectedChannels.length > 0;

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
            <span className="text-sm font-medium text-violet-700">Contractor Outreach Wizard</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-violet-800 to-indigo-900 bg-clip-text text-transparent">
            Active Tenders & Contractor Outreach
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Follow our 3-step wizard to select tenders, find contractors, and send targeted notifications
          </p>
        </div>

        {/* Step Progress Indicator */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 w-full h-0.5 bg-slate-200 -z-10"></div>
            <div 
              className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-500 -z-10"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>

            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center space-y-2">
                <div className={cn(
                  "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                  currentStep > step.id
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 border-violet-600 text-white"
                    : currentStep === step.id
                    ? "bg-white border-violet-600 text-violet-600 shadow-lg"
                    : "bg-white border-slate-300 text-slate-400"
                )}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-6 w-6" />
                  )}
                </div>
                <div className="text-center">
                  <p className={cn(
                    "text-sm font-medium",
                    currentStep >= step.id ? "text-violet-700" : "text-slate-500"
                  )}>
                    {step.name}
                  </p>
                  <p className="text-xs text-slate-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-7xl mx-auto">
          {/* Step 1: Select Tender */}
          {currentStep === 1 && (
            <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm overflow-hidden animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
              
              <CardHeader className="relative z-10 text-center">
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
                  <Building2 className="h-6 w-6 text-blue-600" />
                  Step 1: Select Active Tender
                </CardTitle>
                <p className="text-slate-600 mt-2">Choose a tender to find matching contractors for outreach</p>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockTenders.map((tender, index) => (
                    <div
                      key={tender.id}
                      className={cn(
                        "p-6 rounded-xl border transition-all duration-300 cursor-pointer animate-slide-in-up",
                        selectedTender === tender.id
                          ? "border-violet-300 bg-violet-50/50 shadow-lg shadow-violet-500/20 scale-105"
                          : "border-white/50 bg-white/40 hover:border-violet-200 hover:shadow-lg hover:-translate-y-1"
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => setSelectedTender(tender.id)}
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h3 className="font-bold text-lg text-slate-900">{tender.title}</h3>
                            <p className="text-sm text-slate-600 font-medium">{tender.department}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs font-medium",
                              tender.priority === "high" && "border-red-200 text-red-700 bg-red-50",
                              tender.priority === "medium" && "border-yellow-200 text-yellow-700 bg-yellow-50"
                            )}
                          >
                            {tender.priority} priority
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-blue-500" />
                            <span>{tender.location.split(',')[0]}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IndianRupee className="h-4 w-4 text-green-500" />
                            <span className="font-semibold">{tender.value}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-purple-500" />
                            <span>{tender.contractorsCount} contractors</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Clock className="h-4 w-4" />
                          <span>Deadline: {new Date(tender.deadline).toLocaleDateString()}</span>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed">{tender.description}</p>

                        {selectedTender === tender.id && (
                          <div className="flex items-center gap-2 text-violet-600 font-medium">
                            <CheckCircle className="h-4 w-4" />
                            <span>Selected for contractor outreach</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Step 1 Navigation */}
                <div className="flex justify-end mt-8">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!canProceedToStep2}
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                  >
                    Find Contractors
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Find Contractors */}
          {currentStep === 2 && selectedTenderData && (
            <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm overflow-hidden animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5" />
              
              <CardHeader className="relative z-10">
                <div className="text-center space-y-2">
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
                    <Users className="h-6 w-6 text-emerald-600" />
                    Step 2: Find Matching Contractors
                  </CardTitle>
                  <p className="text-slate-600">
                    We found {filteredContractors.length} contractors for "{selectedTenderData.title}"
                  </p>
                </div>

                {/* Selected Tender Summary */}
                <div className="mt-4 p-4 rounded-lg bg-violet-50/50 border border-violet-200/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">{selectedTenderData.title}</h4>
                      <p className="text-sm text-slate-600">{selectedTenderData.department} • {selectedTenderData.value}</p>
                    </div>
                    <Badge className="bg-violet-100 text-violet-700">Selected</Badge>
                  </div>
                </div>

                {/* Search and Actions */}
                <div className="flex items-center justify-between mt-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search contractors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-lg border border-white/50 bg-white/60 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200 transition-all"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleSelectAll}
                    className="hover:bg-emerald-50"
                  >
                    {selectedContractors.length === filteredContractors.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredContractors.map((contractor, index) => (
                    <div
                      key={contractor.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 animate-slide-in-right",
                        selectedContractors.includes(contractor.id)
                          ? "border-emerald-300 bg-emerald-50/50 shadow-lg"
                          : "border-white/50 bg-white/40 hover:border-emerald-200 hover:shadow-md"
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedContractors.includes(contractor.id)}
                        onChange={() => handleContractorSelect(contractor.id)}
                        className="w-4 h-4 text-emerald-600 border-emerald-300 rounded focus:ring-emerald-500"
                      />
                      
                      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-semibold shadow-lg">
                        {contractor.avatar}
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-slate-900">{contractor.name}</h4>
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                            {contractor.responseRate} response
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 font-medium">{contractor.specialization}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>📍 {contractor.location}</span>
                          <span>⏱️ {contractor.experience}</span>
                          <span>📞 Last contacted: {contractor.lastContacted}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <Mail className="h-4 w-4 text-slate-400" />
                        <MessageSquare className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Step 2 Navigation */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="px-8 py-3"
                    size="lg"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back to Tenders
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    disabled={!canProceedToStep3}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                  >
                    Choose Channels ({selectedContractors.length} selected)
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Send Notifications */}
          {currentStep === 3 && (
            <Card className="border-0 shadow-xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 backdrop-blur-sm overflow-hidden animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-indigo-500/5" />
              
              <CardHeader className="relative z-10 text-center">
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
                  <Send className="h-6 w-6 text-violet-600" />
                  Step 3: Send Notifications
                </CardTitle>
                <p className="text-slate-600 mt-2">
                  Choose communication channels to notify {selectedContractors.length} contractors about "{selectedTenderData?.title}"
                </p>
              </CardHeader>
              
              <CardContent className="relative z-10 space-y-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-white/60 text-center">
                    <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Selected Tender</p>
                    <p className="font-semibold text-slate-900">{selectedTenderData?.title}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/60 text-center">
                    <Users className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Contractors</p>
                    <p className="font-semibold text-slate-900">{selectedContractors.length} selected</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/60 text-center">
                    <Zap className="h-8 w-8 text-violet-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Channels</p>
                    <p className="font-semibold text-slate-900">{selectedChannels.length} selected</p>
                  </div>
                </div>

                {/* Notification Channels */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 text-center">Choose Communication Channels</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {notificationChannels.map((channel) => (
                      <button
                        key={channel.id}
                        onClick={() => handleChannelToggle(channel.id)}
                        className={cn(
                          "p-4 rounded-xl border transition-all duration-300 text-center hover:scale-105",
                          selectedChannels.includes(channel.id)
                            ? "border-violet-300 bg-violet-50 shadow-lg shadow-violet-500/20"
                            : "border-white/50 bg-white/40 hover:border-violet-200 hover:shadow-md"
                        )}
                      >
                        <div className={cn(
                          "w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r flex items-center justify-center",
                          channel.color
                        )}>
                          <channel.icon className="h-6 w-6 text-white" />
                        </div>
                        <p className="font-semibold text-slate-900">{channel.name}</p>
                        <p className="text-xs text-slate-600 mt-1">{channel.description}</p>
                        {selectedChannels.includes(channel.id) && (
                          <CheckCircle className="h-4 w-4 text-violet-600 mx-auto mt-2" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notification Summary */}
                <div className="p-6 rounded-lg bg-white/50 border border-violet-200/50">
                  <h4 className="font-semibold text-slate-900 mb-4 text-center">Notification Summary</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-violet-600">{selectedContractors.length}</p>
                      <p className="text-sm text-slate-600">Contractors</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-indigo-600">{selectedChannels.length}</p>
                      <p className="text-sm text-slate-600">Channels</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">{selectedContractors.length * selectedChannels.length}</p>
                      <p className="text-sm text-slate-600">Total Messages</p>
                    </div>
                  </div>
                </div>

                {/* Step 3 Navigation */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="px-8 py-3"
                    size="lg"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back to Contractors
                  </Button>
                  <Button
                    onClick={handleSendNotifications}
                    disabled={!canSendNotifications || isNotifying}
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8 py-3 shadow-xl hover:shadow-2xl transition-all duration-300"
                    size="lg"
                  >
                    {isNotifying ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Sending Notifications...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send All Notifications
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
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
        
        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}