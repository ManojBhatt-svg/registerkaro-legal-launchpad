
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TrademarkChecker from '@/components/trademark/TrademarkChecker';
import OnboardingQuestions from '@/components/trademark/OnboardingQuestions';
import PackageSelection from '@/components/trademark/PackageSelection';
import PaymentPage from '@/components/trademark/PaymentPage';
import UserDashboard from '@/components/dashboard/UserDashboard';
import ChatAssistant from '@/components/chat/ChatAssistant';
import { ArrowLeft } from 'lucide-react';
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

  const getStepNumber = () => {
    switch (currentStep) {
      case 'checker': return 1;
      case 'onboarding': return 2;
      case 'packages': return 3;
      case 'payment': return 4;
      case 'dashboard': return 5;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress indicator */}
          {currentStep !== 'dashboard' && (
            <div className="mb-8">
              <div className="flex items-center justify-between max-w-2xl mx-auto mb-2">
                <div className="flex items-center">
                  {currentStep !== 'checker' && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mr-2"
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
                  <h2 className="text-xl font-semibold">
                    Step {getStepNumber()} of 5
                  </h2>
                </div>
                <p className="text-sm text-gray-500">
                  {currentStep === 'checker' && 'Check Trademark Availability'}
                  {currentStep === 'onboarding' && 'Answer Questions'}
                  {currentStep === 'packages' && 'Select Package'}
                  {currentStep === 'payment' && 'Complete Payment'}
                </p>
              </div>
              <div className="h-2 bg-gray-200 rounded-full max-w-2xl mx-auto">
                <div 
                  className="h-full bg-brand-orange rounded-full transition-all duration-300" 
                  style={{ width: `${(getStepNumber() / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {currentStep === 'checker' && (
            <>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Trademark Availability Check</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Enter your desired trademark name below to check its availability for registration.
                </p>
              </div>
              
              <TrademarkChecker onCheckComplete={handleTrademarkCheckComplete} />
            </>
          )}
          
          {currentStep === 'onboarding' && (
            <>
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
            </>
          )}
          
          {currentStep === 'packages' && (
            <>
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
            </>
          )}
          
          {currentStep === 'payment' && (
            <PaymentPage 
              packageName={trademarkData.selectedPackage}
              trademarkName={trademarkData.name}
              onBack={() => setCurrentStep('packages')}
              onComplete={handlePaymentComplete}
            />
          )}
          
          {currentStep === 'dashboard' && (
            <UserDashboard 
              userName="Jane Doe" 
              trademarkData={trademarkData}
            />
          )}
        </div>
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default TrademarkRegistrationPage;
