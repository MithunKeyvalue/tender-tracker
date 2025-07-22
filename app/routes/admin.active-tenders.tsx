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
  Sparkles,
  Target,
  Users,
  Zap
} from "lucide-react";
import { useEffect, useState } from "react";

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
    description: "Construction of 25km highway expansion with bridges",
    progress: 65,
    estimatedDays: 12
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
    description: "Advanced water treatment facility for 2 lakh population",
    progress: 40,
    estimatedDays: 18
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
    description: "IoT sensors for traffic, waste, and energy management",
    progress: 85,
    estimatedDays: 28
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
    description: "Grid-connected solar power generation facility",
    progress: 20,
    estimatedDays: 45
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
    avatar: "AI",
    rating: 4.8,
    completedProjects: 127
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
    avatar: "GE",
    rating: 4.9,
    completedProjects: 89
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
    avatar: "ST",
    rating: 4.6,
    completedProjects: 56
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
    avatar: "AB",
    rating: 4.7,
    completedProjects: 203
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
    avatar: "MC",
    rating: 4.8,
    completedProjects: 156
  }
];

const notificationChannels = [
  {
    id: 'phone',
    name: 'Phone Call',
    icon: PhoneCall,
    color: 'from-blue-600 via-blue-500 to-cyan-400',
    description: 'Direct voice call',
    bgPattern: 'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)'
  },
  {
    id: 'sms',
    name: 'SMS',
    icon: MessageCircle,
    color: 'from-emerald-600 via-emerald-500 to-teal-400',
    description: 'Text message',
    bgPattern: 'radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)'
  },
  {
    id: 'email',
    name: 'Email',
    icon: AtSign,
    color: 'from-violet-600 via-purple-500 to-fuchsia-400',
    description: 'Email notification',
    bgPattern: 'radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: MessageSquare,
    color: 'from-green-600 via-green-500 to-emerald-400',
    description: 'WhatsApp message',
    bgPattern: 'radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)'
  }
];

const steps = [
  { id: 1, name: 'Select Tender', description: 'Choose an active tender', icon: Building2, color: 'from-blue-600 to-cyan-500' },
  { id: 2, name: 'Find Contractors', description: 'Match relevant contractors', icon: Users, color: 'from-emerald-600 to-teal-500' },
  { id: 3, name: 'Send Notifications', description: 'Choose communication channels', icon: Send, color: 'from-violet-600 to-purple-500' }
];

export default function AdminActiveTenders() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTender, setSelectedTender] = useState<number | null>(null);
  const [selectedContractors, setSelectedContractors] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [isNotifying, setIsNotifying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [visibleElements, setVisibleElements] = useState<number[]>([]);

  const selectedTenderData = mockTenders.find(t => t.id === selectedTender);
  
  useEffect(() => {
    // Staggered animations for elements
    const timer = setTimeout(() => {
      const elements = Array.from({ length: 10 }, (_, i) => i);
      elements.forEach((_, index) => {
        setTimeout(() => {
          setVisibleElements(prev => [...prev, index]);
        }, index * 150);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [currentStep]);

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
    
    // Show beautiful toast notification
    setToastMessage(`🎉 Notifications sent to ${selectedContractors.length} contractors via ${selectedChannels.length} channels!`);
    setShowToast(true);
    
    // Auto-hide toast after 4 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
    
    // Reset for new workflow
    setCurrentStep(1);
    setSelectedTender(null);
    setSelectedContractors([]);
    setSelectedChannels([]);
  };

  const canProceedToStep2 = selectedTender !== null;
  const canProceedToStep3 = selectedContractors.length > 0;
  const canSendNotifications = selectedContractors.length > 0 && selectedChannels.length > 0;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-rose-400';
      case 'medium': return 'from-amber-500 to-yellow-400';
      case 'low': return 'from-green-500 to-emerald-400';
      default: return 'from-gray-500 to-slate-400';
    }
  };

  const getStepProgress = () => ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_100px,rgba(120,119,198,0.25),transparent)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_300px,rgba(72,187,120,0.15),transparent)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_600px,rgba(236,72,153,0.1),transparent)]"></div>
      
      {/* Premium Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-16 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-[3rem] rotate-12 animate-float-gentle"></div>
        <div className="absolute top-96 left-20 w-28 h-28 bg-gradient-to-br from-emerald-200/25 to-teal-200/25 rounded-3xl -rotate-12 animate-float-gentle-delayed"></div>
        <div className="absolute bottom-40 right-1/4 w-24 h-24 bg-gradient-to-br from-violet-200/20 to-fuchsia-200/20 rounded-2xl rotate-45 animate-float-gentle-slow"></div>
        <div className="absolute top-1/2 left-8 w-16 h-16 bg-gradient-to-br from-pink-200/15 to-rose-200/15 rounded-xl -rotate-6 animate-float-gentle-ultra"></div>
      </div>

      <div className="p-8 space-y-12 relative z-10">
        {/* Premium Header */}
        <div className="text-center space-y-8 animate-fade-in-elegant">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-3xl bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-2xl border border-white/30 shadow-2xl shadow-violet-500/10">
            <div className="relative">
              <Sparkles className="h-6 w-6 text-violet-600" />
              <div className="absolute inset-0 animate-pulse">
                <Sparkles className="h-6 w-6 text-violet-400 opacity-60" />
              </div>
            </div>
            <span className="text-sm font-bold text-slate-700 tracking-[0.2em] uppercase">Multi-Channel Communication Hub</span>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-6xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                Smart Contractor
              </span>
              <span className="block text-4xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-light mt-3">
                Outreach Platform
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              Intelligently match tenders with contractors and engage through phone, SMS, email & WhatsApp with enterprise-grade communication workflows
            </p>
          </div>
        </div>

        {/* Premium Step Progress Indicator */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Elegant Progress Line */}
            <div className="absolute top-8 left-0 w-full h-1 bg-gradient-to-r from-slate-200 via-slate-200 to-slate-200 rounded-full"></div>
            <div 
              className="absolute top-8 left-0 h-1 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-full transition-all duration-1000 ease-out shadow-lg"
              style={{ width: `${getStepProgress()}%` }}
            ></div>

            <div className="flex items-center justify-between relative">
              {steps.map((step, index) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex flex-col items-center space-y-4">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 shadow-lg",
                      isCompleted
                        ? `bg-gradient-to-r ${step.color} border-transparent text-white shadow-xl`
                        : isActive
                        ? "bg-white border-violet-600 text-violet-600 shadow-2xl scale-110"
                        : "bg-white/80 border-slate-300 text-slate-400 backdrop-blur-sm"
                    )}>
                      {isCompleted ? (
                        <CheckCircle className="h-8 w-8" />
                      ) : (
                        <step.icon className="h-8 w-8" />
                      )}
                    </div>
                    
                    <div className="text-center space-y-2">
                      <p className={cn(
                        "text-base font-bold tracking-wide",
                        currentStep >= step.id ? "text-slate-800" : "text-slate-500"
                      )}>
                        {step.name}
                      </p>
                      <p className="text-sm text-slate-500 font-medium max-w-32">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Premium Step Content */}
        <div className="max-w-7xl mx-auto">
          {/* Step 1: Premium Tender Selection */}
          {currentStep === 1 && (
            <Card className="border-0 shadow-3xl bg-white/80 backdrop-blur-2xl overflow-hidden group hover:shadow-4xl transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5" />
              
              <CardHeader className="relative z-10 text-center pb-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-xl">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-left">
                      <CardTitle className="text-3xl font-bold text-slate-900 tracking-tight">
                        Select Premium Tender
                      </CardTitle>
                      <p className="text-slate-600 font-medium text-lg mt-2">Choose a high-value opportunity for strategic contractor outreach</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {mockTenders.map((tender, index) => (
                    <div
                      key={tender.id}
                      className={cn(
                        "group/tender relative p-8 rounded-3xl border transition-all duration-500 cursor-pointer animate-slide-in-elegant",
                        selectedTender === tender.id
                          ? "border-violet-300 bg-gradient-to-br from-violet-50/80 to-purple-50/80 shadow-2xl shadow-violet-500/20 scale-105"
                          : "border-white/60 bg-gradient-to-br from-white/70 to-white/50 hover:border-violet-200 hover:shadow-2xl hover:-translate-y-2 backdrop-blur-sm"
                      )}
                      style={{ animationDelay: `${index * 200}ms` }}
                      onClick={() => setSelectedTender(tender.id)}
                    >
                      {/* Priority Badge */}
                      <div className="absolute top-6 right-6">
                        <Badge
                          className={cn(
                            "px-4 py-2 text-xs font-bold tracking-wider uppercase bg-gradient-to-r text-white border-0 shadow-lg",
                            getPriorityColor(tender.priority)
                          )}
                        >
                          {tender.priority} Priority
                        </Badge>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <h3 className="text-2xl font-bold text-slate-900 leading-tight group-hover/tender:text-violet-700 transition-colors duration-300">
                            {tender.title}
                          </h3>
                          <p className="text-lg text-slate-700 font-semibold">{tender.department}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <MapPin className="h-5 w-5 text-blue-500" />
                              <span className="text-slate-600 font-medium">{tender.location.split(',')[0]}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Clock className="h-5 w-5 text-amber-500" />
                              <span className="text-slate-600 font-medium">{tender.estimatedDays} days left</span>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <IndianRupee className="h-5 w-5 text-green-500" />
                              <span className="text-slate-800 font-bold text-lg">{tender.value}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Users className="h-5 w-5 text-purple-500" />
                              <span className="text-slate-600 font-medium">{tender.contractorsCount} contractors</span>
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600 font-medium">Tender Progress</span>
                            <span className="text-slate-700 font-bold">{tender.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${tender.progress}%` }}
                            />
                          </div>
                        </div>

                        <p className="text-slate-600 leading-relaxed">{tender.description}</p>

                        {selectedTender === tender.id && (
                          <div className="flex items-center gap-3 text-violet-600 font-bold animate-pulse">
                            <CheckCircle className="h-5 w-5" />
                            <span>Selected for Premium Outreach Campaign</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Premium Navigation */}
                <div className="flex justify-end mt-12">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!canProceedToStep2}
                    className="px-12 py-4 text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    size="lg"
                  >
                    <span>Find Elite Contractors</span>
                    <ArrowRight className="h-5 w-5 ml-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Premium Contractor Selection */}
          {currentStep === 2 && selectedTenderData && (
            <Card className="border-0 shadow-3xl bg-white/80 backdrop-blur-2xl overflow-hidden group hover:shadow-4xl transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-blue-500/5" />
              
              <CardHeader className="relative z-10 pb-8">
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center gap-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 shadow-xl">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-left">
                      <CardTitle className="text-3xl font-bold text-slate-900 tracking-tight">
                        Elite Contractor Matching
                      </CardTitle>
                      <p className="text-slate-600 font-medium text-lg mt-2">
                        Found {filteredContractors.length} premium contractors for "{selectedTenderData.title}"
                      </p>
                    </div>
                  </div>

                  {/* Premium Tender Summary */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-violet-50/80 to-purple-50/80 border border-violet-200/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold text-slate-900">{selectedTenderData.title}</h4>
                        <p className="text-slate-600 font-medium">{selectedTenderData.department} • {selectedTenderData.value}</p>
                      </div>
                      <Badge className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 text-sm font-bold">
                        Premium Selection
                      </Badge>
                    </div>
                  </div>

                  {/* Enhanced Search and Actions */}
                  <div className="flex items-center justify-between gap-6">
                    <div className="relative flex-1 max-w-lg">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search elite contractors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm focus:border-emerald-300 focus:ring-4 focus:ring-emerald-200/50 transition-all duration-300 text-lg"
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleSelectAll}
                      className="px-8 py-4 rounded-2xl hover:bg-emerald-50 border-emerald-200 text-emerald-700 font-semibold text-lg hover:scale-105 transition-all duration-300"
                    >
                      {selectedContractors.length === filteredContractors.length ? 'Deselect All' : 'Select All Premium'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10 pb-12">
                <div className="space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar">
                  {filteredContractors.map((contractor, index) => (
                    <div
                      key={contractor.id}
                      className={cn(
                        "group/contractor relative flex items-center gap-6 p-6 rounded-2xl border transition-all duration-500 animate-slide-in-elegant cursor-pointer",
                        selectedContractors.includes(contractor.id)
                          ? "border-emerald-300 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 shadow-2xl shadow-emerald-500/20 scale-[1.02]"
                          : "border-white/60 bg-gradient-to-r from-white/70 to-white/50 hover:border-emerald-200 hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm"
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => handleContractorSelect(contractor.id)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedContractors.includes(contractor.id)}
                        onChange={() => handleContractorSelect(contractor.id)}
                        className="w-5 h-5 text-emerald-600 border-emerald-300 rounded focus:ring-emerald-500 cursor-pointer"
                      />
                      
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-xl text-xl group-hover/contractor:scale-110 transition-transform duration-300">
                        {contractor.avatar}
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-bold text-slate-900 group-hover/contractor:text-emerald-700 transition-colors duration-300">
                            {contractor.name}
                          </h4>
                          <div className="flex items-center gap-4">
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1 font-semibold">
                              ⭐ {contractor.rating}
                            </Badge>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 font-semibold">
                              {contractor.responseRate} response
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-lg text-slate-700 font-semibold">{contractor.specialization}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">{contractor.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-amber-500" />
                            <span className="font-medium">{contractor.experience}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-green-500" />
                            <span className="font-medium">{contractor.completedProjects} projects</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-purple-500" />
                            <span className="font-medium">Last: {contractor.lastContacted}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-100 group-hover/contractor:bg-blue-200 transition-colors duration-300">
                          <Phone className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="p-2 rounded-lg bg-emerald-100 group-hover/contractor:bg-emerald-200 transition-colors duration-300">
                          <Mail className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div className="p-2 rounded-lg bg-green-100 group-hover/contractor:bg-green-200 transition-colors duration-300">
                          <MessageSquare className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Premium Navigation */}
                <div className="flex justify-between mt-12">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="px-8 py-4 text-lg font-semibold rounded-2xl border-slate-300 hover:bg-slate-50 transition-all duration-300"
                    size="lg"
                  >
                    <ChevronLeft className="h-5 w-5 mr-3" />
                    Back to Tenders
                  </Button>
                  
                  <Button
                    onClick={() => setCurrentStep(3)}
                    disabled={!canProceedToStep3}
                    className="px-12 py-4 text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 disabled:opacity-50"
                    size="lg"
                  >
                    <span>Communication Channels ({selectedContractors.length} selected)</span>
                    <ArrowRight className="h-5 w-5 ml-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Premium Communication Channels */}
          {currentStep === 3 && (
            <Card className="border-0 shadow-3xl bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-2xl overflow-hidden group hover:shadow-4xl transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-indigo-500/5" />
              
              <CardHeader className="relative z-10 text-center pb-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-center gap-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-xl">
                      <Send className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-left">
                      <CardTitle className="text-3xl font-bold text-slate-900 tracking-tight">
                        Multi-Channel Engagement
                      </CardTitle>
                      <p className="text-slate-600 font-medium text-lg mt-2">
                        Deploy strategic communication to {selectedContractors.length} elite contractors about "{selectedTenderData?.title}"
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10 space-y-10 pb-12">
                {/* Premium Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-cyan-50/80 border border-blue-200/50 text-center backdrop-blur-sm">
                    <Building2 className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                    <p className="text-sm text-slate-600 font-medium mb-2">Selected Tender</p>
                    <p className="font-bold text-slate-900 text-lg leading-tight">{selectedTenderData?.title}</p>
                  </div>
                  
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/80 border border-emerald-200/50 text-center backdrop-blur-sm">
                    <Users className="h-10 w-10 text-emerald-600 mx-auto mb-4" />
                    <p className="text-sm text-slate-600 font-medium mb-2">Elite Contractors</p>
                    <p className="font-bold text-slate-900 text-2xl">{selectedContractors.length}</p>
                  </div>
                  
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-50/80 to-purple-50/80 border border-violet-200/50 text-center backdrop-blur-sm">
                    <Zap className="h-10 w-10 text-violet-600 mx-auto mb-4" />
                    <p className="text-sm text-slate-600 font-medium mb-2">Communication Channels</p>
                    <p className="font-bold text-slate-900 text-2xl">{selectedChannels.length}</p>
                  </div>
                </div>

                {/* Premium Notification Channels */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 text-center tracking-tight">Choose Premium Communication Channels</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {notificationChannels.map((channel, index) => (
                      <button
                        key={channel.id}
                        onClick={() => handleChannelToggle(channel.id)}
                        className={cn(
                          "group/channel relative p-6 rounded-3xl border transition-all duration-500 text-center hover:scale-105 animate-slide-in-elegant",
                          selectedChannels.includes(channel.id)
                            ? "border-violet-300 bg-gradient-to-br from-violet-50/80 to-purple-50/80 shadow-2xl shadow-violet-500/20 scale-105"
                            : "border-white/60 bg-gradient-to-br from-white/70 to-white/50 hover:border-violet-200 hover:shadow-xl backdrop-blur-sm"
                        )}
                        style={{ 
                          animationDelay: `${index * 150}ms`,
                          background: selectedChannels.includes(channel.id) ? channel.bgPattern : undefined
                        }}
                      >
                        <div className={cn(
                          "w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r flex items-center justify-center shadow-xl transition-transform duration-300 group-hover/channel:scale-110",
                          channel.color
                        )}>
                          <channel.icon className="h-8 w-8 text-white" />
                        </div>
                        
                        <p className="font-bold text-slate-900 text-lg mb-2">{channel.name}</p>
                        <p className="text-sm text-slate-600 font-medium mb-4">{channel.description}</p>
                        
                        {selectedChannels.includes(channel.id) && (
                          <div className="flex items-center justify-center gap-2 text-violet-600 font-bold animate-pulse">
                            <CheckCircle className="h-5 w-5" />
                            <span className="text-sm">SELECTED</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Premium Notification Summary */}
                <div className="p-8 rounded-3xl bg-gradient-to-r from-white/80 to-white/60 border border-violet-200/50 backdrop-blur-sm">
                  <h4 className="text-2xl font-bold text-slate-900 mb-6 text-center">Campaign Summary</h4>
                  
                  <div className="grid grid-cols-3 gap-8 text-center">
                    <div className="space-y-2">
                      <p className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                        {selectedContractors.length}
                      </p>
                      <p className="text-slate-600 font-semibold">Elite Contractors</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                        {selectedChannels.length}
                      </p>
                      <p className="text-slate-600 font-semibold">Communication Channels</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {selectedContractors.length * selectedChannels.length}
                      </p>
                      <p className="text-slate-600 font-semibold">Total Messages</p>
                    </div>
                  </div>
                </div>

                {/* Premium Navigation */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="px-8 py-4 text-lg font-semibold rounded-2xl border-slate-300 hover:bg-slate-50 transition-all duration-300"
                    size="lg"
                  >
                    <ChevronLeft className="h-5 w-5 mr-3" />
                    Back to Contractors
                  </Button>
                  
                  <Button
                    onClick={handleSendNotifications}
                    disabled={!canSendNotifications || isNotifying}
                    className="px-12 py-4 text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-2xl shadow-3xl hover:shadow-4xl transition-all duration-500 hover:scale-105 disabled:opacity-50"
                    size="lg"
                  >
                    {isNotifying ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-3" />
                        Deploying Campaign...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-3" />
                        Deploy Premium Campaign
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Premium Toast Notification */}
      {showToast && (
        <div className="fixed top-8 right-8 z-50 animate-slide-in-toast">
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white px-8 py-6 rounded-3xl shadow-3xl border border-emerald-300/30 backdrop-blur-xl max-w-md">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 p-2 rounded-2xl bg-white/20">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg">{toastMessage}</p>
                <p className="text-emerald-100 text-sm mt-1 font-medium">Campaign deployed successfully to premium contractor network</p>
              </div>
              <button 
                onClick={() => setShowToast(false)}
                className="flex-shrink-0 text-emerald-200 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/20"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Premium Progress Bar */}
            <div className="mt-4 w-full bg-emerald-700/30 rounded-full h-1.5">
              <div className="bg-white/80 h-1.5 rounded-full animate-progress-bar-premium"></div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Custom Animations */}
      <style>{`
        @keyframes fade-in-elegant {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slide-in-elegant {
          from {
            opacity: 0;
            transform: translateX(-40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes slide-in-toast {
          from {
            opacity: 0;
            transform: translateX(100%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes progress-bar-premium {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-25px) rotate(5deg) scale(1.05);
          }
        }

        @keyframes float-gentle-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-20px) rotate(-3deg) scale(1.03);
          }
        }

        @keyframes float-gentle-slow {
          0%, 100% {
            transform: translateY(0px) rotate(45deg) scale(1);
          }
          50% {
            transform: translateY(-30px) rotate(50deg) scale(1.08);
          }
        }

        @keyframes float-gentle-ultra {
          0%, 100% {
            transform: translateY(0px) rotate(-6deg) scale(1);
          }
          50% {
            transform: translateY(-15px) rotate(-1deg) scale(1.02);
          }
        }
        
        .animate-fade-in-elegant {
          animation: fade-in-elegant 1.2s ease-out;
        }
        
        .animate-slide-in-elegant {
          animation: slide-in-elegant 1s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-toast {
          animation: slide-in-toast 0.7s ease-out;
        }

        .animate-progress-bar-premium {
          animation: progress-bar-premium 4s linear;
        }

        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .shadow-4xl {
          box-shadow: 0 35px 70px -12px rgba(0, 0, 0, 0.3);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(148, 163, 184, 0.1);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6366f1, #8b5cf6);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #4f46e5, #7c3aed);
        }
      `}</style>
    </div>
  );
}