
import { Shield, Clock, FileCheck, Award } from 'lucide-react';

const features = [
  {
    title: 'Legal Protection',
    description: 'Get exclusive rights to use your trademark nationwide and prevent others from using similar marks.',
    icon: Shield,
  },
  {
    title: 'Quick Process',
    description: 'Our streamlined process ensures your trademark application is filed quickly and accurately.',
    icon: Clock,
  },
  {
    title: 'Expert Guidance',
    description: 'Our legal experts guide you through every step of the trademark registration process.',
    icon: FileCheck,
  },
  {
    title: 'Brand Value',
    description: 'Enhance your brand value and credibility with a registered trademark.',
    icon: Award,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Register Your Trademark?</h2>
          <p className="text-lg text-gray-600">
            Protecting your brand identity is crucial for business success. Our trademark registration services offer several key benefits.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-brand-orange text-white mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
