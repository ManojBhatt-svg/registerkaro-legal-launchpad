
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Home, Star, BarChart2, Shield, ChevronRight } from "lucide-react";

const Navigation = () => {
  const pages = [
    { name: "Home", path: "/", icon: Home },
    { name: "Services", path: "/services/trademark", icon: FileText },
  ];

  const services = [
    { name: "Trademark", path: "/services/trademark", icon: Shield },
    { name: "Company", path: "/services/company", icon: BarChart2 },
    { name: "GST", path: "/services/gst", icon: FileText },
    { name: "Legal Drafting", path: "/services/legal-drafting", icon: FileText },
    { name: "FSSAI", path: "/services/fssai", icon: Star },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm mb-8">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="h-6 w-1 bg-brand-blue rounded-full mr-3"></span>
          Navigation
        </h2>
        
        <div className="flex flex-wrap gap-3 mb-6">
          {pages.map((page) => (
            <Link key={page.path} to={page.path}>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-gray-200 hover:border-brand-blue hover:text-brand-blue"
              >
                <page.icon className="h-4 w-4" />
                {page.name}
              </Button>
            </Link>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
            <span className="h-5 w-5 bg-brand-orange bg-opacity-20 rounded-full flex items-center justify-center mr-2">
              <span className="h-2.5 w-2.5 bg-brand-orange rounded-full"></span>
            </span>
            Our Services
          </h3>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <Tabs defaultValue="trademark" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 bg-white shadow-sm">
                {services.map(service => (
                  <TabsTrigger 
                    key={service.path} 
                    value={service.name.toLowerCase()}
                    className="data-[state=active]:bg-brand-blue data-[state=active]:text-white"
                  >
                    <Link to={service.path} className="flex items-center gap-2">
                      <service.icon className="h-4 w-4" />
                      {service.name}
                    </Link>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <div className="h-10 w-10 bg-brand-blue bg-opacity-10 rounded-full flex items-center justify-center mr-4 mt-1">
                  <Shield className="h-5 w-5 text-brand-blue" />
                </div>
                <div>
                  <h4 className="font-medium text-brand-blue mb-1">Trademark Registration</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Protect your brand identity with our comprehensive trademark registration services.
                  </p>
                  <Link to="/trademark-registration">
                    <Button 
                      size="sm" 
                      className="bg-brand-blue hover:bg-blue-800 text-white flex items-center"
                    >
                      Register Now
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
