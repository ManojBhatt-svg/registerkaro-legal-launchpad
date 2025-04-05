
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import LoginModal from '../auth/LoginModal';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const services = [
    { name: 'Trademark Registration', path: '/trademark-registration' },
    { name: 'Company Registration', path: '/services/company' },
    { name: 'GST Registration', path: '/services/gst' },
    { name: 'Legal Drafting', path: '/services/legal-drafting' },
    { name: 'FSSAI License', path: '/services/fssai' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-brand-blue">
              Register<span className="text-brand-orange">Karo</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-brand-orange">
                <span>Services</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {/* Dropdown */}
              <div className="absolute left-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50">
                <div className="py-1">
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      to={service.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-orange"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link to="/pricing" className="text-gray-700 hover:text-brand-orange">
              Pricing
            </Link>
            
            <Link to="/about" className="text-gray-700 hover:text-brand-orange">
              About Us
            </Link>
            
            <Link to="/contact" className="text-gray-700 hover:text-brand-orange">
              Contact
            </Link>
          </nav>
          
          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setLoginModalOpen(true)}
              className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
            >
              Log in
            </Button>
            <Button 
              onClick={() => setLoginModalOpen(true)}
              className="bg-brand-orange hover:bg-orange-600 text-white"
            >
              Sign up
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-brand-orange focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white p-4 space-y-3 shadow-lg">
          <div className="space-y-1">
            <div className="py-2 border-b">
              <p className="text-sm font-medium text-gray-500 px-3">Services</p>
              {services.map((service) => (
                <Link
                  key={service.name}
                  to={service.path}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-orange"
                >
                  {service.name}
                </Link>
              ))}
            </div>
            <Link
              to="/pricing"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-orange"
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-orange"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-orange"
            >
              Contact
            </Link>
          </div>
          <div className="pt-4 border-t border-gray-200 flex flex-col space-y-2">
            <Button 
              variant="outline" 
              onClick={() => setLoginModalOpen(true)}
              className="w-full justify-center border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
            >
              Log in
            </Button>
            <Button 
              onClick={() => setLoginModalOpen(true)}
              className="w-full justify-center bg-brand-orange hover:bg-orange-600 text-white"
            >
              Sign up
            </Button>
          </div>
        </div>
      )}
      
      {/* Login/Signup Modal */}
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </header>
  );
};

export default Header;
