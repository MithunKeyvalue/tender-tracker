import { Facebook, Linkedin, Twitter } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Left Column - Logo and Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TF</span>
              </div>
              <span className="text-xl font-bold text-white">TenderFlow</span>
            </div>
            <p className="text-sm mb-6 text-gray-400 leading-relaxed">
              Revolutionary AI-powered tender discovery platform transforming how contractors win government contracts.
            </p>
            <div className="flex gap-4">
              <Twitter className="h-5 w-5 cursor-pointer hover:text-white transition-colors" />
              <Linkedin className="h-5 w-5 cursor-pointer hover:text-white transition-colors" />
              <Facebook className="h-5 w-5 cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>
          
          {/* Platform Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/ai-matching" className="text-gray-400 hover:text-white transition-colors">AI Matching</Link></li>
              <li><Link to="/smart-alerts" className="text-gray-400 hover:text-white transition-colors">Smart Alerts</Link></li>
              <li><Link to="/analytics" className="text-gray-400 hover:text-white transition-colors">Analytics</Link></li>
              <li><Link to="/api-access" className="text-gray-400 hover:text-white transition-colors">API Access</Link></li>
            </ul>
          </div>
          
          {/* Company Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/press" className="text-gray-400 hover:text-white transition-colors">Press</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Resources Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/help-center" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/documentation" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/system-status" className="text-gray-400 hover:text-white transition-colors">System Status</Link></li>
              <li><Link to="/security" className="text-gray-400 hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2024 TenderFlow. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-4 md:mt-0">
            Crafted with <span className="text-red-500">❤️</span> in India
          </p>
        </div>
      </div>
    </footer>
  )
}