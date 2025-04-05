
import { Shield, Clock, FileCheck, Award, Check } from 'lucide-react';

const features = [
  {
    title: 'Legal Protection',
    description: 'Get exclusive rights to use your trademark nationwide and prevent others from using similar marks.',
    icon: Shield,
    benefits: ['Brand protection', 'Legal ownership', 'Exclusive rights']
  },
  {
    title: 'Quick Process',
    description: 'Our streamlined process ensures your trademark application is filed quickly and accurately.',
    icon: Clock,
    benefits: ['Fast filing', 'Reduced waiting time', 'Regular updates']
  },
  {
    title: 'Expert Guidance',
    description: 'Our legal experts guide you through every step of the trademark registration process.',
    icon: FileCheck,
    benefits: ['Professional advice', 'Document review', '24/7 support']
  },
  {
    title: 'Brand Value',
    description: 'Enhance your brand value and credibility with a registered trademark.',
    icon: Award,
    benefits: ['Increased credibility', 'Better market position', 'Customer trust']
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-blue font-semibold text-sm tracking-wider uppercase">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-6">Why Register Your Trademark?</h2>
          <div className="h-1 w-20 bg-brand-orange mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Protecting your brand identity is crucial for business success. Our trademark registration services offer several key benefits.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full"
            >
              <div className="mb-6">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-brand-blue bg-opacity-10 text-brand-blue mb-4">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
              </div>
              
              <div className="mt-auto">
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="h-4 w-4 text-brand-orange mr-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
