
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Gift, ArrowRight, Check } from 'lucide-react';
import LoginModal from '../auth/LoginModal';

const CTASection = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-blue-800"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm p-1 rounded-full max-w-max mx-auto mb-8">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full">
              <div className="flex items-center">
                <Gift className="h-5 w-5 text-white mr-2" />
                <span className="text-sm font-medium text-white">Limited Time Offer: FREE Trademark Registration</span>
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-6">Ready to Secure Your Brand?</h2>
          
          <p className="text-lg md:text-xl text-blue-100 text-center max-w-2xl mx-auto mb-10">
            Take the first step towards protecting your intellectual property. Our experts will guide you through the entire process.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">What You Get</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-brand-orange mr-3" />
                  <span className="text-blue-50">Full legal protection</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-brand-orange mr-3" />
                  <span className="text-blue-50">Expert consultations</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-brand-orange mr-3" />
                  <span className="text-blue-50">Document preparation</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-brand-orange mr-3" />
                  <span className="text-blue-50">Government filing</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Why Register Now</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-brand-orange mr-3" />
                  <span className="text-blue-50">Limited time free offer</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-brand-orange mr-3" />
                  <span className="text-blue-50">Prevent brand theft</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-brand-orange mr-3" />
                  <span className="text-blue-50">Build brand credibility</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-brand-orange mr-3" />
                  <span className="text-blue-50">Enhance business value</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              onClick={() => setShowLoginModal(true)}
              className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-6 text-lg shadow-xl rounded-xl"
            >
              Start Your Trademark Registration
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </section>
  );
};

export default CTASection;
