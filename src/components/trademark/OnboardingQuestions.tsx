
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface OnboardingQuestionsProps {
  trademarkName: string;
  onComplete: (data: any) => void;
  onBack: () => void;
}

const OnboardingQuestions = ({ trademarkName, onComplete, onBack }: OnboardingQuestionsProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    applicantType: '',
    businessNature: '',
    trademarkClass: '',
    includesLogo: false
  });
  
  const steps = [
    {
      title: 'Applicant Type',
      question: 'What type of applicant are you?',
      options: ['Individual', 'Startup', 'Company'],
      field: 'applicantType'
    },
    {
      title: 'Business Nature',
      question: 'What is the nature of your business?',
      options: ['Products', 'Services', 'Both Products & Services'],
      field: 'businessNature'
    },
    {
      title: 'Trademark Class',
      question: 'Which trademark class best describes your business?',
      options: [
        'Class 9 - Electronic & Scientific Devices',
        'Class 35 - Advertising & Business Services',
        'Class 42 - Scientific & Technology Services',
        'Class 25 - Clothing & Apparel',
        'Class 30 - Food & Beverages'
      ],
      field: 'trademarkClass'
    },
    {
      title: 'Logo Inclusion',
      question: 'Does your trademark include a logo?',
      isCheckbox: true,
      field: 'includesLogo'
    }
  ];
  
  const currentStepData = steps[currentStep];
  
  const handleRadioChange = (value: string) => {
    setAnswers({
      ...answers,
      [currentStepData.field]: value
    });
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setAnswers({
      ...answers,
      [currentStepData.field]: checked
    });
  };
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };
  
  const isNextDisabled = () => {
    const currentField = currentStepData.field;
    if (currentField === 'includesLogo') return false;
    return !answers[currentField as keyof typeof answers];
  };
  
  const getEstimatedCost = () => {
    // Simple pricing logic based on answers
    let basePrice = 7999;
    
    if (answers.applicantType === 'Company') {
      basePrice += 2000;
    } else if (answers.applicantType === 'Startup') {
      basePrice += 1000;
    }
    
    if (answers.businessNature === 'Both Products & Services') {
      basePrice += 1500;
    }
    
    if (answers.includesLogo) {
      basePrice += 1000;
    }
    
    return basePrice.toLocaleString('en-IN');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900">
            Trademark Registration for "{trademarkName}"
          </h3>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-orange transition-all duration-300" 
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            {currentStepData.title}
          </h4>
          <p className="text-gray-600 mb-6">{currentStepData.question}</p>
          
          {!currentStepData.isCheckbox ? (
            <RadioGroup 
              value={answers[currentStepData.field as keyof typeof answers] as string} 
              onValueChange={handleRadioChange}
              className="space-y-3"
            >
              {currentStepData.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="flex-grow cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200">
              <Checkbox 
                id="logo" 
                checked={answers.includesLogo}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="logo" className="cursor-pointer">
                Yes, my trademark includes a logo
              </Label>
            </div>
          )}
        </div>
        
        {/* Current Estimate */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Current Estimate</h4>
          <div className="flex justify-between">
            <span>Basic Registration</span>
            <span className="font-semibold">₹{getEstimatedCost()}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Final price may vary based on additional requirements
          </p>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={handleBack}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={isNextDisabled()}
            className="bg-brand-orange hover:bg-orange-600 flex items-center"
          >
            {currentStep < steps.length - 1 ? 'Next' : 'View Packages'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingQuestions;
