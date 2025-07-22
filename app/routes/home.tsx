import type { Route } from "./+types/home";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, TrendingUp, Clock, Search, Target, Megaphone, Twitter, Linkedin, Facebook, Sparkles, ArrowRight, Star, Zap, Shield, Award } from "lucide-react";
import { Footer } from "~/components/footer";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TenderFlow - AI-Powered Tender Discovery" },
    { name: "description", content: "Never miss a government contract again with AI-powered tender discovery and automated outreach" },
  ];
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md border-b border-gray-200/30 sticky top-0 z-50 transition-all duration-300"
        style={{ 
          boxShadow: scrollY > 10 ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
          transform: `translateY(${scrollY > 100 ? '-2px' : '0px'})`
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-110">
                <span className="text-white font-bold text-sm">TF</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">TenderFlow</span>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group">
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/resources" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group">
                Resources
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>
            
            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-105">
                  Login
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
                Start Free Trial
                <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-20 animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-20 animate-float animation-delay-400" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-300 rounded-full blur-3xl opacity-20 animate-float animation-delay-800" />
        </div>
        
        {/* Parallax background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-purple-100/20 to-pink-100/20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 hover:from-green-200 hover:to-emerald-200 transition-all duration-300 animate-bounce-in">
                <Check className="mr-1 h-3 w-3" />
                AI-Powered Tender Discovery
                <Zap className="ml-2 h-3 w-3 text-yellow-600" />
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 animate-slide-up">
                Never Miss a{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">Government Contract</span>{" "}
                Again
              </h1>
              
              <p className="text-xl text-gray-600 animate-slide-up animation-delay-200">
                AI-powered tender discovery and automated outreach that delivers <span className="font-bold text-purple-600">200-500% ROI</span> with zero manual effort
              </p>
              
              <div className="flex items-center gap-4 animate-slide-up animation-delay-400">
                <Input 
                  type="email" 
                  placeholder="Enter your work email" 
                  className="max-w-xs border-2 focus:border-purple-500 transition-all duration-300 hover:shadow-md"
                />
                <Button variant="gradient" size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-purple-500/25 group animate-pulse-glow">
                  Start 14-Day Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
              
              <div className="flex items-center gap-8 pt-4 animate-fade-in animation-delay-600">
                <div className="flex items-center gap-2 group hover:scale-105 transition-transform duration-300">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white shadow-md hover:z-10 hover:scale-110 transition-all duration-300" style={{ animationDelay: `${i * 100}ms` }} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600"><span className="font-bold text-purple-600">500+</span> Contractors</span>
                </div>
                <div className="flex items-center gap-2 group hover:scale-105 transition-transform duration-300">
                  <TrendingUp className="h-4 w-4 text-green-600 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-sm text-gray-600"><span className="font-bold text-green-600">₹50Cr+</span> Tenders Matched</span>
                </div>
                <div className="flex items-center gap-2 group hover:scale-105 transition-transform duration-300">
                  <Clock className="h-4 w-4 text-blue-600 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="text-sm text-gray-600"><span className="font-bold text-blue-600">95%</span> Time Saved</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-scale-in animation-delay-200"
              style={{ transform: typeof window !== 'undefined' ? `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.01}deg) rotateX(${-(mousePosition.y - window.innerHeight / 2) * 0.01}deg)` : 'none' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-3xl opacity-30 animate-pulse" />
              <div className="relative bg-gray-900 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-shadow duration-300">
                <div className="bg-gray-800 rounded-2xl p-6 space-y-4 border border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 hover:scale-125 transition-transform duration-200" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500 hover:scale-125 transition-transform duration-200" />
                    <div className="w-3 h-3 rounded-full bg-green-500 hover:scale-125 transition-transform duration-200" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-4 border border-gray-600 hover:border-purple-500/50 transition-colors duration-300">
                      <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-yellow-400" />
                        Latest Tenders
                      </div>
                      <div className="space-y-2">
                        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 h-8 rounded animate-pulse flex items-center px-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                          <div className="bg-gray-600 h-4 w-3/4 rounded" />
                        </div>
                        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 h-8 rounded animate-pulse animation-delay-200 flex items-center px-3">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse" />
                          <div className="bg-gray-600 h-4 w-2/3 rounded" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-purple-700/30 to-purple-800/30 rounded-lg p-4 border border-purple-600/30 hover:border-purple-500 transition-all duration-300 hover:scale-105 group">
                        <div className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">114/77</div>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          Tenders Matched
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-green-700/30 to-green-800/30 rounded-lg p-4 border border-green-600/30 hover:border-green-500 transition-all duration-300 hover:scale-105 group">
                        <div className="text-2xl font-bold text-white group-hover:text-green-300 transition-colors duration-300">₹14Mcr</div>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          Contract Value
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-lg p-4 border border-purple-500/50 hover:border-purple-400 transition-all duration-300 group">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs font-bold">AI</span>
                        </div>
                        <span className="text-sm text-white">AI Analysis</span>
                        <Shield className="w-4 h-4 text-green-400 ml-auto" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <div className="bg-gray-600/50 h-3 w-full rounded" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse animation-delay-200" />
                          <div className="bg-gray-600/50 h-3 w-4/5 rounded" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-400" />
                          <div className="bg-gray-600/50 h-3 w-3/4 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Badge className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 shadow-xl animate-bounce-in hover:scale-110 transition-transform duration-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Live: 247 New Tenders
                </div>
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-10 animate-float" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-10 animate-float animation-delay-800" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-medium animate-fade-in">Why Choose TenderFlow?</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 animate-slide-up">Transform Your Contract Discovery</h2>
            <p className="text-xl text-gray-600 mt-4 animate-slide-up animation-delay-200">
              Stop wasting time on manual searches and start winning more contracts with AI-powered automation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-transparent hover:border-purple-200 animate-slide-up animation-delay-200 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                <Search className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Stop Manual Searching</h3>
              <p className="text-gray-600 mb-6">
                Save 50+ hours every month by eliminating manual tender searches across multiple government portals.
              </p>
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 hover:from-purple-200 hover:to-purple-300 transition-all duration-300">
                <Star className="w-3 h-3 mr-1" />
                50+ Hours Saved Monthly
              </Badge>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-transparent hover:border-green-200 animate-slide-up animation-delay-400 group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                <Target className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Matching</h3>
              <p className="text-gray-600 mb-6">
                Our AI analyzes your profile and only shows relevant opportunities that match your expertise and capacity.
              </p>
              <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-green-200 text-green-700 hover:from-green-200 hover:to-green-300 transition-all duration-300">
                <Zap className="w-3 h-3 mr-1" />
                98% Relevance Rate
              </Badge>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-transparent hover:border-pink-200 animate-slide-up animation-delay-600 group">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                <Megaphone className="h-6 w-6 text-pink-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Automated Marketing</h3>
              <p className="text-gray-600 mb-6">
                Reach procurement officers directly with automated voice campaigns and personalized outreach.
              </p>
              <Badge variant="secondary" className="bg-gradient-to-r from-pink-100 to-pink-200 text-pink-700 hover:from-pink-200 hover:to-pink-300 transition-all duration-300">
                <TrendingUp className="w-3 h-3 mr-1" />
                200-500% ROI
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden animate-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float animation-delay-600" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-slide-down">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8 animate-fade-in animation-delay-200">
            Join 500+ contractors who've already discovered the power of AI-driven tender matching
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-bounce-in animation-delay-400 group">
            Start Your 14-Day Free Trial
            <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-180 transition-transform duration-500" />
          </Button>
          
          <div className="flex items-center justify-center gap-8 mt-12 text-white/80 text-sm animate-fade-in animation-delay-600">
            <span className="flex items-center gap-2"><Shield className="w-4 h-4" />No Credit Card Required</span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" />Setup in 2 Minutes</span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4" />Cancel Anytime</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}