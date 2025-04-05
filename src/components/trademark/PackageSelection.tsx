
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Award } from 'lucide-react';
import { toast } from 'sonner';

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
      recommended: false
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
      recommended: true
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
      recommended: false
    }
  ];

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900">
            Choose Your Package for "{trademarkName}"
          </h3>
        </div>
        
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${
                  selectedPackage === pkg.name
                    ? 'border-brand-orange shadow-lg'
                    : pkg.recommended
                    ? 'border-brand-orange border-opacity-50'
                    : 'border-gray-200'
                }`}
              >
                {pkg.recommended && (
                  <div className="bg-brand-orange text-white text-center py-2 font-medium text-sm">
                    RECOMMENDED
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{pkg.name}</h4>
                      <p className="text-sm text-gray-500">{pkg.description}</p>
                    </div>
                    {pkg.recommended && (
                      <Award className="h-6 w-6 text-brand-orange" />
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-gray-900">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </p>
                    <p className="text-sm text-gray-500">
                      Est. duration: {pkg.duration}
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-brand-orange flex-shrink-0 mr-2 mt-0.5" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    onClick={() => handleSelectPackage(pkg.name)}
                    className={`w-full ${
                      pkg.recommended
                        ? 'bg-brand-orange hover:bg-orange-600'
                        : 'bg-brand-blue hover:bg-blue-700'
                    }`}
                  >
                    Select Package
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Button 
            variant="outline"
            onClick={onBack}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Questions
          </Button>
          
          <div className="text-sm text-gray-500">
            <p>Need help choosing? <a href="#" className="text-brand-blue hover:underline">Talk to our expert</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageSelection;
