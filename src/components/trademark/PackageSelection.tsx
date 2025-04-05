
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Award, Shield, Star, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface PackageSelectionProps {
  trademarkName: string;
  onboardingData: any;
  onBack: () => void;
  onSelectPackage: (packageName: string) => void;
}

const PackageSelection = ({ trademarkName, onboardingData, onBack, onSelectPackage }: PackageSelectionProps) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleSelectPackage = (packageName: string) => {
    setSelectedPackage(packageName);
    onSelectPackage(packageName);
    toast.success(`${packageName} package selected for "${trademarkName}"`);
  };
  
  // Calculate package prices based on onboarding data
  const getBasePrice = () => {
    let basePrice = 7999;
    
    if (onboardingData.applicantType === 'Company') {
      basePrice += 2000;
    } else if (onboardingData.applicantType === 'Startup') {
      basePrice += 1000;
    }
    
    if (onboardingData.businessNature === 'Both Products & Services') {
      basePrice += 1500;
    }
    
    if (onboardingData.includesLogo) {
      basePrice += 1000;
    }
    
    return basePrice;
  };
  
  const basePrice = getBasePrice();
  const standardPrice = Math.round(basePrice * 1.6);
  const premiumPrice = Math.round(basePrice * 2.5);

  const packages = [
    {
      name: 'Basic',
      price: basePrice,
      description: 'Essential trademark registration services',
      features: [
        'Trademark Search Report',
        'Application Filing',
        'Government Fee for 1 Class',
        'Basic Documentation',
        'Email Support'
      ],
      duration: '18-24 months',
      recommended: false,
      icon: Shield,
      color: 'blue'
    },
    {
      name: 'Standard',
      price: standardPrice,
      description: 'Comprehensive registration with support',
      features: [
        'Everything in Basic',
        'Response to Examination Report',
        'Certificate Delivery',
        'Documentation Support',
        'Phone & Email Support'
      ],
      duration: '18-24 months',
      recommended: true,
      icon: Award,
      color: 'orange'
    },
    {
      name: 'Premium',
      price: premiumPrice,
      description: 'Complete protection with priority handling',
      features: [
        'Everything in Standard',
        'Priority Processing',
        'Multi-class Filing Support',
        'Dedicated Legal Expert',
        '1 Year of Post-Registration Support'
      ],
      duration: '18-24 months',
      recommended: false,
      icon: Star,
      color: 'purple'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-brand-blue to-blue-600 text-white p-8">
        <h2 className="text-3xl font-bold mb-2">Choose Your Package</h2>
        <p className="text-blue-100 text-lg">
          Select the best protection plan for "{trademarkName}"
        </p>
      </div>
      
      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 gap-8 mb-10">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card 
                className={`overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  selectedPackage === pkg.name
                    ? 'ring-2 ring-brand-orange ring-offset-2'
                    : 'border border-gray-200'
                }`}
              >
                <div className="relative">
                  {pkg.recommended && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-brand-orange text-white text-center py-2 font-semibold">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className={`px-8 pt-8 pb-4 flex items-start justify-between ${pkg.recommended ? 'pt-14' : ''}`}>
                    <div className="flex items-start space-x-4">
                      <div className={`h-16 w-16 rounded-full flex items-center justify-center ${
                        pkg.color === 'blue' ? 'bg-blue-100 text-brand-blue' : 
                        pkg.color === 'orange' ? 'bg-orange-100 text-brand-orange' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {pkg.icon && <pkg.icon className="h-8 w-8" />}
                      </div>
                      
                      <div>
                        <h3 className={`text-2xl font-bold ${
                          pkg.color === 'orange' ? 'text-brand-orange' : 
                          pkg.color === 'purple' ? 'text-purple-600' :
                          'text-brand-blue'
                        }`}>
                          {pkg.name}
                        </h3>
                        <p className="text-gray-500 mb-2 text-lg">{pkg.description}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">
                          ₹{pkg.price.toLocaleString('en-IN')}
                        </p>
                        <p className="text-sm text-gray-500">
                          Est. duration: {pkg.duration}
                        </p>
                      </div>
                    </div>
                    
                    {pkg.recommended && (
                      <div className="bg-orange-100 text-brand-orange text-sm font-semibold py-1 px-3 rounded-full">
                        Recommended
                      </div>
                    )}
                  </div>
                  
                  <div className="px-8 pt-4">
                    <div className="w-full h-px bg-gray-200 mb-6"></div>
                    
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <Check className={`h-5 w-5 flex-shrink-0 mr-3 mt-0.5 ${
                            pkg.color === 'blue' ? 'text-brand-blue' : 
                            pkg.color === 'orange' ? 'text-brand-orange' :
                            'text-purple-600'
                          }`} />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pb-8">
                      <Button
                        onClick={() => handleSelectPackage(pkg.name)}
                        className={`w-full py-6 text-lg ${
                          pkg.color === 'blue' ? 'bg-brand-blue hover:bg-blue-700' : 
                          pkg.color === 'orange' ? 'bg-brand-orange hover:bg-orange-600' :
                          'bg-purple-600 hover:bg-purple-700'
                        } transition-all duration-300`}
                        size="lg"
                      >
                        Select {pkg.name} Package
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-gray-200">
          <Button 
            variant="outline"
            onClick={onBack}
            className="mb-4 md:mb-0 flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Questions
          </Button>
          
          <div className="flex items-center bg-blue-50 p-4 rounded-lg">
            <Zap className="text-brand-blue h-5 w-5 mr-2" />
            <p className="text-sm text-gray-700">
              Need help choosing? <a href="#" className="text-brand-blue font-medium hover:underline">Chat with our trademark expert</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageSelection;
