import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TF</span>
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              TenderFlow
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Login
            </Link>
            <Button asChild className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white border-0 rounded-full px-6 py-2">
              <Link to="/signup">Start Free Trial</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
} 