
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Gift, CheckCircle2, ArrowRight } from 'lucide-react';
import LoginModal from '../auth/LoginModal';

const HeroSection = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-brand-orange opacity-5 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-blue opacity-5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-green-400 opacity-5 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          {/* Left content */}
          <div className="md:w-1/2 space-y-8 text-center md:text-left">
            <div>
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-brand-blue rounded-full font-medium text-sm mb-4 border border-blue-100">
                #1 Trademark Registration Service in India
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Protect Your <span className="text-brand-blue">Brand Identity</span> with Confidence
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed">
              Secure your brand with our fast, reliable trademark registration services backed by expert legal support and a seamless digital process.
            </p>
            
            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                <Button 
                  className="bg-brand-blue hover:bg-blue-900 text-white px-8 py-6 text-lg shadow-lg rounded-xl"
                  onClick={() => setShowLoginModal(true)}
                >
                  <Gift className="mr-2 h-5 w-5 animate-pulse-light" />
                  Register Your Trademark
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-6 text-lg rounded-xl"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Services
                </Button>
              </div>
              
              <div className="mt-6 inline-flex items-center px-6 py-3 bg-green-50 text-green-700 rounded-xl animate-float border border-green-100">
                <Gift className="h-5 w-5 mr-3 text-green-600" />
                <span className="font-medium">Limited Time Offer: FREE Trademark Registration</span>
              </div>
            </div>
            
            <div className="pt-6 grid grid-cols-2 gap-6">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-brand-blue mr-2 flex-shrink-0" />
                <span className="text-gray-700">100% Online Process</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-brand-blue mr-2 flex-shrink-0" />
                <span className="text-gray-700">Legal Protection</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-brand-blue mr-2 flex-shrink-0" />
                <span className="text-gray-700">Expert Guidance</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-brand-blue mr-2 flex-shrink-0" />
                <span className="text-gray-700">Fast Processing</span>
              </div>
            </div>
          </div>
          
          {/* Right content - Illustration */}
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-orange opacity-20 rounded-full"></div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-brand-blue opacity-20 rounded-full"></div>
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                  alt="Trademark Registration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              <div className="absolute top-10 -right-5 transform bg-white rounded-xl shadow-lg p-4 z-20 animate-float">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="h-5 w-5 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Status</p>
                    <p className="font-semibold text-gray-900">Trademark Approved</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-10 -left-5 transform bg-white rounded-xl shadow-lg p-4 z-20 animate-float">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="h-5 w-5 bg-brand-blue rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Process</p>
                    <p className="font-semibold text-gray-900">100% Digital</p>
                  </div>
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
