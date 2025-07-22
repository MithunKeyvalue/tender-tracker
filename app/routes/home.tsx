import type { Route } from "./+types/home";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, TrendingUp, Clock, Search, Target, Megaphone, Twitter, Linkedin, Facebook } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TenderFlow - AI-Powered Tender Discovery" },
    { name: "description", content: "Never miss a government contract again with AI-powered tender discovery and automated outreach" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-purple-100/20 to-pink-100/20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                <Check className="mr-1 h-3 w-3" />
                AI-Powered Tender Discovery
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                Never Miss a{" "}
                <span className="text-blue-600">Government Contract</span>{" "}
                Again
              </h1>
              
              <p className="text-xl text-gray-600">
                AI-powered tender discovery and automated outreach that delivers 200-500% ROI with zero manual effort
              </p>
              
              <div className="flex items-center gap-4">
                <Input 
                  type="email" 
                  placeholder="Enter your work email" 
                  className="max-w-xs"
                />
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Start 14-Day Free Trial
                </Button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">500+ Contractors</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-600">₹50Cr+ Tenders Matched</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">95% Time Saved</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-3xl opacity-30" />
              <div className="relative bg-gray-900 rounded-3xl shadow-2xl p-8">
                <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="text-xs text-gray-400 mb-2">Latest Tenders</div>
                      <div className="space-y-2">
                        <div className="bg-gray-600 h-8 rounded animate-pulse" />
                        <div className="bg-gray-600 h-8 rounded animate-pulse" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">114/77</div>
                        <div className="text-xs text-gray-400">Tenders Matched</div>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">₹14Mcr</div>
                        <div className="text-xs text-gray-400">Contract Value</div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-600/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">AI</span>
                        </div>
                        <span className="text-sm text-white">AI Analysis</span>
                      </div>
                      <div className="bg-gray-600 h-16 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
              
              <Badge className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2">
                Live: 247 New Tenders
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-medium">Why Choose TenderFlow?</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Transform Your Contract Discovery</h2>
            <p className="text-xl text-gray-600 mt-4">
              Stop wasting time on manual searches and start winning more contracts with AI-powered automation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Search className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Stop Manual Searching</h3>
              <p className="text-gray-600 mb-6">
                Save 50+ hours every month by eliminating manual tender searches across multiple government portals.
              </p>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                50+ Hours Saved Monthly
              </Badge>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Matching</h3>
              <p className="text-gray-600 mb-6">
                Our AI analyzes your profile and only shows relevant opportunities that match your expertise and capacity.
              </p>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                98% Relevance Rate
              </Badge>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                <Megaphone className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Automated Marketing</h3>
              <p className="text-gray-600 mb-6">
                Reach procurement officers directly with automated voice campaigns and personalized outreach.
              </p>
              <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                200-500% ROI
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join 500+ contractors who've already discovered the power of AI-driven tender matching
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
            Start Your 14-Day Free Trial
          </Button>
          
          <div className="flex items-center justify-center gap-8 mt-12 text-white/80 text-sm">
            <span>No Credit Card Required</span>
            <span>•</span>
            <span>Setup in 2 Minutes</span>
            <span>•</span>
            <span>Cancel Anytime</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">TF</span>
                </div>
                <span className="text-xl font-bold text-white">TenderFlow</span>
              </div>
              <p className="text-sm mb-4">
                AI-powered tender discovery platform helping contractors win more government contracts.
              </p>
              <div className="flex gap-4">
                <Twitter className="h-5 w-5 cursor-pointer hover:text-white" />
                <Linkedin className="h-5 w-5 cursor-pointer hover:text-white" />
                <Facebook className="h-5 w-5 cursor-pointer hover:text-white" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/features" className="hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/api" className="hover:text-white">API</Link></li>
                <li><Link to="/integrations" className="hover:text-white">Integrations</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/documentation" className="hover:text-white">Documentation</Link></li>
                <li><Link to="/status" className="hover:text-white">Status</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}