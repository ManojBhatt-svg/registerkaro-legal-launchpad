
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import LoginModal from '../auth/LoginModal';

const HeroSection = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Protect Your Brand with Hassle-free Trademark Registration
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl">
              Secure your brand identity with our comprehensive trademark registration services. Quick, reliable, and guided by legal experts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <Button 
                className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-6 text-lg shadow-lg" 
                onClick={() => setShowLoginModal(true)}
              >
                <Gift className="mr-2 h-5 w-5 animate-pulse-light" />
                Register your Trademark NOW
              </Button>
              
              <Button 
                variant="outline" 
                className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white px-8 py-6 text-lg"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Services
              </Button>
            </div>
            
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full animate-float">
              <Gift className="h-4 w-4 mr-2 text-green-600" />
              <span className="text-sm font-medium">Trademark Registration is FREE for a limited time! Claim your offer now.</span>
            </div>
          </div>
          
          {/* Right content - Illustration */}
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-brand-orange rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-blue rounded-full opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                alt="Trademark Registration"
                className="rounded-lg shadow-xl relative z-10 w-full"
              />
              <div className="absolute top-1/3 right-0 transform translate-x-1/4 bg-white rounded-lg shadow-lg p-4 z-20">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Trademark Filed</span>
                </div>
              </div>
              <div className="absolute bottom-1/3 left-0 transform -translate-x-1/4 bg-white rounded-lg shadow-lg p-4 z-20">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">100% Online Process</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
};

export default HeroSection;
