
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TrademarkChecker from '@/components/trademark/TrademarkChecker';
import OnboardingQuestions from '@/components/trademark/OnboardingQuestions';
import PackageSelection from '@/components/trademark/PackageSelection';
import PaymentPage from '@/components/trademark/PaymentPage';
import UserDashboard from '@/components/dashboard/UserDashboard';
import ChatAssistant from '@/components/chat/ChatAssistant';

type RegistrationStep = 'checker' | 'onboarding' | 'packages' | 'payment' | 'dashboard';

const TrademarkRegistrationPage = () => {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('checker');
  const [trademarkData, setTrademarkData] = useState({
    name: '',
    available: false,
    onboardingData: {},
    selectedPackage: ''
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
  
  const handlePaymentComplete = () => {
    setCurrentStep('dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            <UserDashboard userName="Jane Doe" />
          )}
        </div>
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default TrademarkRegistrationPage;
