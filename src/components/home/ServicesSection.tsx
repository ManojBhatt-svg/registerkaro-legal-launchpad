
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'trademark',
    title: 'Trademark Registration',
    description: 'Protect your brand identity with our comprehensive trademark registration services.',
    icon: '™️',
    path: '/services/trademark',
    popular: true,
    priceFrom: '7,999',
  },
  {
    id: 'company',
    title: 'Company Registration',
    description: 'Start your business journey with hassle-free company incorporation services.',
    icon: '🏢',
    path: '/services/company',
    popular: false,
    priceFrom: '5,999',
  },
  {
    id: 'gst',
    title: 'GST Registration',
    description: 'Comply with GST regulations and streamline your tax filing process.',
    icon: '📑',
    path: '/services/gst',
    popular: false,
    priceFrom: '1,499',
  },
  {
    id: 'legal',
    title: 'Legal Drafting',
    description: 'Get professionally drafted legal documents tailored to your business needs.',
    icon: '📝',
    path: '/services/legal-drafting',
    popular: false,
    priceFrom: '2,999',
  },
  {
    id: 'fssai',
    title: 'FSSAI License',
    description: 'Obtain food business licenses and certifications for your food business.',
    icon: '🍽️',
    path: '/services/fssai',
    popular: false,
    priceFrom: '3,499',
  },
  {
    id: 'ipr',
    title: 'IPR Services',
    description: 'Comprehensive intellectual property rights services for businesses.',
    icon: '📚',
    path: '/services/ipr',
    popular: false,
    priceFrom: '9,999',
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Legal Services</h2>
          <p className="text-lg text-gray-600">
            From trademark registration to company formation, we offer comprehensive legal services to help your business grow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`bg-white border ${service.popular ? 'border-brand-orange ring-2 ring-brand-orange/20' : 'border-gray-200'} rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl relative`}
            >
              {service.popular && (
                <div className="absolute top-4 right-4 bg-brand-orange text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Popular
                </div>
              )}
              
              <div className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-500 text-sm">Starting from</span>
                    <p className="font-bold text-brand-blue">₹ {service.priceFrom}</p>
                  </div>
                  <Link
                    to={service.path}
                    className="flex items-center text-brand-orange hover:text-orange-600 font-semibold"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
