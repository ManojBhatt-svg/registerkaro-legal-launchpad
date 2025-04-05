
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TrademarkChecker from '@/components/trademark/TrademarkChecker';
import OnboardingQuestions from '@/components/trademark/OnboardingQuestions';
import PackageSelection from '@/components/trademark/PackageSelection';
import PaymentPage from '@/components/trademark/PaymentPage';
import UserDashboard from '@/components/dashboard/UserDashboard';
import ChatAssistant from '@/components/chat/ChatAssistant';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type RegistrationStep = 'checker' | 'onboarding' | 'packages' | 'payment' | 'dashboard';

const TrademarkRegistrationPage = () => {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('checker');
  const [trademarkData, setTrademarkData] = useState({
    name: '',
    available: false,
    onboardingData: {},
    selectedPackage: '',
    additionalServices: [] as string[]
  });
  
  const handleTrademarkCheckComplete = (result: { available: boolean, name: string }) => {
    setTrademarkData({
      ...trademarkData,
      name: result.name,
      available: result.available
    });
    
    if (result.available) {
      setCurrentStep('onboarding');
    }
  };
  
  const handleOnboardingComplete = (data: any) => {
    setTrademarkData({
      ...trademarkData,
      onboardingData: data
    });
    setCurrentStep('packages');
  };
  
  const handlePackageSelected = (packageName: string) => {
    setTrademarkData({
      ...trademarkData,
      selectedPackage: packageName
    });
    setCurrentStep('payment');
  };
  
  const handlePaymentComplete = (additionalServices: string[] = []) => {
    setTrademarkData({
      ...trademarkData,
      additionalServices
    });
    setCurrentStep('dashboard');
  };

  const steps = [
    { id: 'checker', name: 'Check Availability', number: 1 },
    { id: 'onboarding', name: 'Answer Questions', number: 2 },
    { id: 'packages', name: 'Select Package', number: 3 },
    { id: 'payment', name: 'Complete Payment', number: 4 },
    { id: 'dashboard', name: 'Dashboard', number: 5 }
  ];

  const getStepNumber = () => {
    return steps.find(step => step.id === currentStep)?.number || 1;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress indicator */}
          {currentStep !== 'dashboard' && (
            <div className="mb-12 max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {currentStep !== 'checker' && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mr-3 text-gray-500 hover:text-gray-900"
                      onClick={() => {
                        if (currentStep === 'onboarding') setCurrentStep('checker');
                        if (currentStep === 'packages') setCurrentStep('onboarding');
                        if (currentStep === 'payment') setCurrentStep('packages');
                      }}
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                  )}
                  <h2 className="text-2xl font-bold text-gray-900">
                    {steps.find(step => step.id === currentStep)?.name || 'Registration'}
                  </h2>
                </div>
                <span className="text-brand-blue font-semibold">
                  Step {getStepNumber()} of {steps.length - 1}
                </span>
              </div>
              
              <div className="relative">
                <div className="overflow-hidden h-2 mb-2 text-xs flex rounded-full bg-gray-200">
                  <div 
                    style={{ width: `${(getStepNumber() / (steps.length - 1)) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-brand-blue to-blue-700 rounded-full transition-all duration-500 ease-in-out"
                  ></div>
                </div>
                
                <div className="flex justify-between">
                  {steps.slice(0, -1).map((step) => (
                    <div key={step.id} className="relative">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.number < getStepNumber() 
                            ? 'bg-brand-blue text-white' 
                            : step.number === getStepNumber() 
                              ? 'bg-white border-2 border-brand-blue text-brand-blue' 
                              : 'bg-white border border-gray-300 text-gray-500'
                        } transition-colors duration-300`}
                      >
                        {step.number < getStepNumber() ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <span className="text-xs font-bold">{step.number}</span>
                        )}
                      </div>
                      <span className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium ${
                        step.number <= getStepNumber() ? 'text-brand-blue' : 'text-gray-500'
                      }`}>
                        {step.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className={`${currentStep !== 'dashboard' ? 'max-w-3xl mx-auto' : ''}`}>
            {currentStep === 'checker' && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 text-brand-blue mb-4">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">Trademark Availability Check</h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Enter your desired trademark name below to check its availability for registration.
                  </p>
                </div>
                
                <TrademarkChecker onCheckComplete={handleTrademarkCheckComplete} />
              </div>
            )}
            
            {currentStep === 'onboarding' && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-center mb-10">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">Trademark Registration</h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Please provide some information to help us determine the best registration package for you.
                  </p>
                </div>
                
                <OnboardingQuestions 
                  trademarkName={trademarkData.name}
                  onComplete={handleOnboardingComplete}
                  onBack={() => setCurrentStep('checker')}
                />
              </div>
            )}
            
            {currentStep === 'packages' && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-center mb-10">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">Select Your Package</h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Choose the trademark registration package that best suits your needs.
                  </p>
                </div>
                
                <PackageSelection 
                  trademarkName={trademarkData.name}
                  onboardingData={trademarkData.onboardingData}
                  onSelectPackage={handlePackageSelected}
                  onBack={() => setCurrentStep('onboarding')}
                />
              </div>
            )}
            
            {currentStep === 'payment' && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <PaymentPage 
                  packageName={trademarkData.selectedPackage}
                  trademarkName={trademarkData.name}
                  onBack={() => setCurrentStep('packages')}
                  onComplete={handlePaymentComplete}
                />
              </div>
            )}
            
            {currentStep === 'dashboard' && (
              <UserDashboard 
                userName="Jane Doe" 
                trademarkData={trademarkData}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default TrademarkRegistrationPage;
