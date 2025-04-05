
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import LoginModal from '../auth/LoginModal';

const CTASection = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <section className="py-16 bg-gradient-to-r from-brand-blue to-blue-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Brand?</h2>
          <p className="text-lg mb-8 text-blue-100">
            Take the first step towards protecting your intellectual property. Our experts will guide you through the entire process.
          </p>
          
          <div className="inline-block mb-6 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
            <div className="flex items-center">
              <Gift className="h-5 w-5 text-brand-orange mr-2" />
              <span className="text-sm font-medium">Limited Time Offer: FREE Trademark Registration</span>
            </div>
          </div>
          
          <Button 
            onClick={() => setShowLoginModal(true)}
            className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-6 text-lg shadow-lg"
          >
            Start Your Trademark Registration Now
          </Button>
        </div>
      </div>
      
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </section>
  );
};

export default CTASection;
