
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Navigation = () => {
  const pages = [
    { name: "Home", path: "/" },
    { name: "Trademark Registration", path: "/trademark-registration" },
    { name: "Services", path: "/services/trademark" },
  ];

  return (
    <div className="bg-gray-100 p-4 mb-6 rounded-lg">
      <h2 className="text-xl font-bold mb-3">Available Pages</h2>
      <div className="flex flex-wrap gap-3">
        {pages.map((page) => (
          <Link key={page.path} to={page.path}>
            <Button variant="outline">{page.name}</Button>
          </Link>
        ))}
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Direct Service Links:</h3>
        <Tabs defaultValue="trademark" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="trademark">
              <Link to="/services/trademark">Trademark</Link>
            </TabsTrigger>
            <TabsTrigger value="company">
              <Link to="/services/company">Company</Link>
            </TabsTrigger>
            <TabsTrigger value="gst">
              <Link to="/services/gst">GST</Link>
            </TabsTrigger>
            <TabsTrigger value="legal">
              <Link to="/services/legal-drafting">Legal Drafting</Link>
            </TabsTrigger>
            <TabsTrigger value="fssai">
              <Link to="/services/fssai">FSSAI</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default Navigation;
