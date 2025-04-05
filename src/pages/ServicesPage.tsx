
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatAssistant from '@/components/chat/ChatAssistant';
import LoginModal from '@/components/auth/LoginModal';

const serviceDetails = {
  trademark: {
    title: 'Trademark Registration',
    description: 'Protect your brand identity with our comprehensive trademark registration services.',
    icon: '™️',
    benefits: [
      'Exclusive rights to use your trademark nationwide',
      'Legal protection against unauthorized use',
      'Enhanced brand value and credibility',
      'Ability to license your trademark',
      'Prevention of trademark theft'
    ],
    process: [
      'Trademark Search & Availability Check',
      'Preparation & Filing of Application',
      'Examination by Trademark Registrar',
      'Publication in Trademark Journal',
      'Registration Certificate Issuance'
    ],
    packages: [
      {
        name: 'Basic',
        price: '7,999',
        features: [
          'Trademark Search Report',
          'Application Filing',
          'Government Fee for 1 Class',
          'Basic Documentation',
          'Email Support'
        ],
        recommended: false,
        duration: '18-24 months'
      },
      {
        name: 'Standard',
        price: '12,999',
        features: [
          'Everything in Basic',
          'Response to Examination Report',
          'Certificate Delivery',
          'Documentation Support',
          'Phone & Email Support'
        ],
        recommended: true,
        duration: '18-24 months'
      },
      {
        name: 'Premium',
        price: '19,999',
        features: [
          'Everything in Standard',
          'Priority Processing',
          'Multi-class Filing Support',
          'Dedicated Legal Expert',
          '1 Year of Post-Registration Support'
        ],
        recommended: false,
        duration: '18-24 months'
      }
    ],
    faqs: [
      {
        question: 'How long does it take to register a trademark in India?',
        answer: 'The trademark registration process in India typically takes 18-24 months from filing to registration, assuming there are no objections or oppositions.'
      },
      {
        question: 'What information do I need to provide for trademark registration?',
        answer: 'You need to provide the trademark name/logo, applicant details, class of goods/services, date of first use (if applicable), and power of attorney.'
      },
      {
        question: 'How many classes should I register my trademark in?',
        answer: 'It depends on your business. You should register in all classes that cover your current and future business activities. Each additional class incurs an additional fee.'
      }
    ]
  },
  company: {
    title: 'Company Registration',
    description: 'Start your business journey with hassle-free company incorporation services.',
    icon: '🏢',
    benefits: [
      'Limited liability protection',
      'Enhanced credibility and trust',
      'Separate legal entity status',
      'Perpetual existence',
      'Easy transfer of ownership'
    ],
    process: [
      'Name Approval',
      'Document Preparation',
      'Filing with Registrar of Companies',
      'Certificate of Incorporation',
      'Post-Incorporation Compliance'
    ],
    packages: [
      {
        name: 'Basic',
        price: '5,999',
        features: [
          'Company Name Search',
          'Digital Signature Certificate (1)',
          'Director Identification Number (2)',
          'Certificate of Incorporation',
          'Basic Documentation'
        ],
        recommended: false,
        duration: '15-20 days'
      },
      {
        name: 'Standard',
        price: '8,999',
        features: [
          'Everything in Basic',
          'Company PAN & TAN',
          'Bank Account Opening Assistance',
          'GST Registration',
          'Email & Phone Support'
        ],
        recommended: true,
        duration: '15-20 days'
      },
      {
        name: 'Premium',
        price: '14,999',
        features: [
          'Everything in Standard',
          'Priority Processing',
          'Company Seal & Rubber Stamp',
          'Share Certificates',
          '3 Months Compliance Support'
        ],
        recommended: false,
        duration: '10-15 days'
      }
    ],
    faqs: [
      {
        question: 'What are the types of companies I can register in India?',
        answer: 'In India, you can register Private Limited Company, Public Limited Company, One Person Company, Limited Liability Partnership, and Section 8 Company (Non-profit).'
      },
      {
        question: 'What is the minimum capital required to register a company?',
        answer: 'There is no minimum paid-up capital requirement for Private Limited Company registration in India as per the Companies Act, 2013.'
      },
      {
        question: 'How many directors are required to form a Private Limited Company?',
        answer: 'A minimum of 2 directors and 2 shareholders are required to form a Private Limited Company in India. One person can be both a director and a shareholder.'
      }
    ]
  },
  gst: {
    title: 'GST Registration',
    description: 'Comply with GST regulations and streamline your tax filing process.',
    icon: '📑',
    benefits: [
      'Legal compliance with GST regulations',
      'Ability to collect GST from customers',
      'Input tax credits on purchases',
      'Seamless interstate business operations',
      'Enhanced business credibility'
    ],
    process: [
      'Eligibility Verification',
      'Document Collection',
      'Application Filing',
      'ARN Generation',
      'GSTIN Issuance'
    ],
    packages: [
      {
        name: 'Basic',
        price: '1,499',
        features: [
          'GST Application Filing',
          'ARN Generation',
          'GSTIN Certificate',
          'Basic Documentation',
          'Email Support'
        ],
        recommended: false,
        duration: '3-5 working days'
      },
      {
        name: 'Standard',
        price: '2,999',
        features: [
          'Everything in Basic',
          'GST Returns (1 Month)',
          'Consultation on GST Compliance',
          'Account Setup on GST Portal',
          'Phone & Email Support'
        ],
        recommended: true,
        duration: '3-5 working days'
      },
      {
        name: 'Premium',
        price: '5,999',
        features: [
          'Everything in Standard',
          'GST Returns (3 Months)',
          'E-Way Bill Registration',
          'Dedicated GST Expert',
          'Monthly Compliance Reminders'
        ],
        recommended: false,
        duration: '2-4 working days'
      }
    ],
    faqs: [
      {
        question: 'When is GST registration mandatory?',
        answer: 'GST registration is mandatory when your annual turnover exceeds Rs. 20 lakhs (Rs. 10 lakhs for North Eastern states), or if you engage in interstate supplies, online sales, or are a specific type of business.'
      },
      {
        question: 'What documents are required for GST registration?',
        answer: 'Required documents include PAN, address proof, business registration documents, bank account details, digital signature, and photographs.'
      },
      {
        question: 'How long does it take to get GST registration?',
        answer: 'Once all documents are properly submitted, GST registration is typically issued within 3-5 working days.'
      }
    ]
  },
  'legal-drafting': {
    title: 'Legal Drafting',
    description: 'Get professionally drafted legal documents tailored to your business needs.',
    icon: '📝',
    benefits: [
      'Legally sound documentation',
      'Customized for your specific needs',
      'Drafted by legal experts',
      'Protection from future disputes',
      'Compliance with latest regulations'
    ],
    process: [
      'Requirement Analysis',
      'Legal Consultation',
      'Document Drafting',
      'Review & Revision',
      'Final Delivery'
    ],
    packages: [
      {
        name: 'Basic',
        price: '2,999',
        features: [
          'Standard Agreement Template',
          'Basic Customization',
          'Digital Delivery',
          'Single Revision',
          'Email Support'
        ],
        recommended: false,
        duration: '3-5 working days'
      },
      {
        name: 'Standard',
        price: '4,999',
        features: [
          'Fully Customized Agreement',
          'Legal Consultation (30 mins)',
          'Digital & Physical Delivery',
          'Two Revisions',
          'Phone & Email Support'
        ],
        recommended: true,
        duration: '5-7 working days'
      },
      {
        name: 'Premium',
        price: '9,999',
        features: [
          'Complex Legal Documentation',
          'Legal Consultation (60 mins)',
          'Digital & Physical Delivery',
          'Unlimited Revisions',
          'Dedicated Legal Expert'
        ],
        recommended: false,
        duration: '7-10 working days'
      }
    ],
    faqs: [
      {
        question: 'What types of legal documents do you draft?',
        answer: 'We draft various documents including employment contracts, NDAs, partnership agreements, shareholders agreements, terms & conditions, privacy policies, and more.'
      },
      {
        question: 'Can you customize legal documents for my specific needs?',
        answer: 'Yes, our legal experts customize all documents according to your specific business requirements and the latest legal regulations.'
      },
      {
        question: 'How long does it take to draft a legal document?',
        answer: 'Depending on the complexity of the document, it typically takes 3-10 working days to complete the drafting process including revisions.'
      }
    ]
  },
  fssai: {
    title: 'FSSAI License',
    description: 'Obtain food business licenses and certifications for your food business.',
    icon: '🍽️',
    benefits: [
      'Legal compliance with food safety regulations',
      'Enhanced consumer trust',
      'Ability to operate food business legally',
      'Access to larger markets and partnerships',
      'Protection from legal penalties'
    ],
    process: [
      'License Type Determination',
      'Document Collection',
      'Application Filing',
      'Inspection (if required)',
      'License Issuance'
    ],
    packages: [
      {
        name: 'Basic Registration',
        price: '3,499',
        features: [
          'FSSAI Registration Certificate',
          'Application Filing',
          'Document Verification',
          'Basic Consultation',
          'Email Support'
        ],
        recommended: false,
        duration: '7-10 working days'
      },
      {
        name: 'State License',
        price: '5,999',
        features: [
          'State FSSAI License',
          'Document Preparation',
          'Application Filing',
          'Inspection Coordination',
          'Phone & Email Support'
        ],
        recommended: true,
        duration: '15-20 working days'
      },
      {
        name: 'Central License',
        price: '9,999',
        features: [
          'Central FSSAI License',
          'Complete Documentation',
          'Application Filing',
          'Inspection Coordination',
          'Dedicated Expert Support'
        ],
        recommended: false,
        duration: '25-30 working days'
      }
    ],
    faqs: [
      {
        question: 'What type of FSSAI license do I need for my food business?',
        answer: 'The type of license depends on your annual turnover. Basic Registration (under Rs. 12 lakhs), State License (Rs. 12 lakhs to 20 crores), or Central License (above Rs. 20 crores).'
      },
      {
        question: 'What documents are required for FSSAI license?',
        answer: 'Required documents include ID and address proof, business registration documents, food safety management plan, NOC from local authority, layout plan, and water test report.'
      },
      {
        question: 'How long is the FSSAI license valid?',
        answer: 'The FSSAI license is valid for 1-5 years depending on the type of license and can be renewed before expiration.'
      }
    ]
  },
  ipr: {
    title: 'IPR Services',
    description: 'Comprehensive intellectual property rights services for businesses.',
    icon: '📚',
    benefits: [
      'Protection of intellectual assets',
      'Competitive advantage in the market',
      'Additional revenue through licensing',
      'Prevention of IP infringement',
      'Enhanced business valuation'
    ],
    process: [
      'IP Assessment & Strategy',
      'Application Preparation',
      'Filing with Respective Authority',
      'Responding to Objections',
      'IP Grant & Maintenance'
    ],
    packages: [
      {
        name: 'Copyright Registration',
        price: '9,999',
        features: [
          'Copyright Application',
          'Government Fees',
          'Documentation Support',
          'Certificate Delivery',
          'Basic Consultation'
        ],
        recommended: false,
        duration: '30-45 days'
      },
      {
        name: 'Patent Search & Analysis',
        price: '15,999',
        features: [
          'Comprehensive Patent Search',
          'Prior Art Analysis',
          'Patentability Report',
          'Filing Strategy Consultation',
          'Phone & Email Support'
        ],
        recommended: false,
        duration: '15-20 days'
      },
      {
        name: 'Patent Filing',
        price: '49,999',
        features: [
          'Patent Draft Preparation',
          'Application Filing',
          'Responding to Office Actions',
          'Technical Support',
          'Dedicated Patent Attorney'
        ],
        recommended: true,
        duration: '3-5 years (up to grant)'
      }
    ],
    faqs: [
      {
        question: 'What types of intellectual property can be protected?',
        answer: 'The main types of intellectual property include patents (inventions), trademarks (brand identifiers), copyrights (creative works), and trade secrets (confidential business information).'
      },
      {
        question: 'How long does patent protection last in India?',
        answer: 'In India, a patent is granted for 20 years from the date of filing the application, subject to annual renewal fee payment.'
      },
      {
        question: 'Can I file for international protection of my intellectual property?',
        answer: 'Yes, we assist with international protection through PCT for patents, Madrid Protocol for trademarks, and other international filing systems based on your business needs.'
      }
    ]
  }
};

const ServicesPage = () => {
  const { serviceId = 'trademark' } = useParams<{ serviceId: string }>();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  
  // Default to trademark if service is not found
  const service = serviceDetails[serviceId as keyof typeof serviceDetails] || serviceDetails.trademark;

  // Handle login success for trademark registration flow
  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    if (serviceId === 'trademark') {
      navigate('/trademark-registration');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2 space-y-6 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  {service.title}
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                  {service.description}
                </p>
                <Button 
                  className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-6 text-lg"
                  onClick={() => setShowLoginModal(true)}
                >
                  Get Started Now
                </Button>
              </div>
              <div className="md:w-1/2">
                <div className="text-center bg-white rounded-lg p-12 shadow-xl">
                  <div className="text-7xl mb-6">{service.icon}</div>
                  <h2 className="text-2xl font-bold">{service.title}</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Benefits</h2>
              <p className="text-lg text-gray-600 mt-4">
                Why you should consider our {service.title.toLowerCase()} services
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-brand-orange" />
                    </div>
                    <p className="ml-3 text-gray-700">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Our Process</h2>
              <p className="text-lg text-gray-600 mt-4">
                Simple steps to get your {service.title.toLowerCase()}
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {service.process.map((step, index) => (
                <div key={index} className="flex mb-8">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-brand-orange text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-900">{step}</h3>
                    {index < service.process.length - 1 && (
                      <div className="mt-2 ml-6 h-10 border-l-2 border-dashed border-gray-300"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Packages Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Our Packages</h2>
              <p className="text-lg text-gray-600 mt-4">
                Choose the package that fits your needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.packages.map((pkg, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 ${
                    pkg.recommended ? 'border-2 border-brand-orange' : 'border border-gray-200'
                  }`}
                >
                  {pkg.recommended && (
                    <div className="bg-brand-orange text-white text-center py-2">
                      <p className="font-semibold">Recommended</p>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{pkg.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-brand-blue">₹{pkg.price}</span>
                    </div>
                    
                    <div className="mb-6 border-t border-gray-200 pt-4">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <span>Estimated Duration: </span>
                        <span className="ml-1 font-medium">{pkg.duration}</span>
                      </div>
                    </div>
                    
                    <ul className="mb-6 space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="h-5 w-5 text-brand-orange flex-shrink-0 mr-2" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${
                        pkg.recommended 
                          ? 'bg-brand-orange hover:bg-orange-600 text-white' 
                          : 'border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white'
                      }`}
                      onClick={() => setShowLoginModal(true)}
                    >
                      Select Package
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 mt-4">
                Common questions about {service.title.toLowerCase()}
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto divide-y divide-gray-200">
              {service.faqs.map((faq, index) => (
                <div key={index} className="py-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-brand-blue text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-lg mb-8 text-blue-100">
                Our experts will guide you through the {service.title.toLowerCase()} process.
              </p>
              
              <Button 
                onClick={() => setShowLoginModal(true)}
                className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-6 text-lg shadow-lg"
              >
                Contact Us Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatAssistant />
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default ServicesPage;
