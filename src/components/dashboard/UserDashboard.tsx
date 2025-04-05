
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ApplicationCard from './ApplicationCard';
import { Application, Document } from './ApplicationCard';
import { Plus, FileText, CreditCard, User } from 'lucide-react';

interface UserDashboardProps {
  userName: string;
  trademarkData?: {
    name: string;
    available: boolean;
    onboardingData: any;
    selectedPackage: string;
    additionalServices?: string[];
  };
}

const UserDashboard = ({ userName, trademarkData }: UserDashboardProps) => {
  const [activeTab, setActiveTab] = useState('applications');
  
  // Mock data for user applications - updated to match the Application interface
  const applications = [
    {
      id: 'tm-1',
      name: trademarkData?.name || 'Brand Name',
      type: 'Trademark Registration',
      status: 'in_progress' as const, // Using as const to ensure it's the literal type
      dateUpdated: '2023-08-18',
      documents: [
        { name: 'Proof of Identity', status: 'pending' as const },
        { name: 'Proof of Business', status: 'pending' as const },
        { name: 'Logo File (High Resolution)', status: 'missing' as const }
      ] as Document[],
      payments: [
        { id: 'pay-1', amount: 7999, status: 'paid', date: '2023-08-15', description: 'Initial Payment' },
        { id: 'pay-2', amount: 4500, status: 'pending', date: '2023-09-15', description: 'Government Fee' }
      ]
    }
  ];
  
  // If trademark data exists, we can use it to create a dynamic application
  let displayApplications = applications;
  if (trademarkData && trademarkData.name) {
    // We have new trademark data, so let's add it
    const newApplication = {
      id: `tm-${Math.random().toString(36).substr(2, 9)}`,
      name: trademarkData.name,
      type: 'Trademark Registration',
      status: 'in_progress' as const,
      dateUpdated: new Date().toISOString().split('T')[0],
      documents: [
        { name: 'Proof of Identity', status: 'missing' as const },
        { name: 'Proof of Business', status: 'missing' as const },
        { name: 'Logo File (High Resolution)', status: 'missing' as const }
      ] as Document[],
      payments: [
        { 
          id: `pay-${Math.random().toString(36).substr(2, 9)}`, 
          amount: trademarkData.selectedPackage === 'Premium' ? 19999 : 
                  trademarkData.selectedPackage === 'Standard' ? 12999 : 7999, 
          status: 'paid', 
          date: new Date().toISOString().split('T')[0], 
          description: 'Initial Payment' 
        },
        { 
          id: `pay-${Math.random().toString(36).substr(2, 9)}`, 
          amount: 4500, 
          status: 'pending', 
          date: '', 
          description: 'Government Fee' 
        }
      ]
    };
    
    displayApplications = [newApplication, ...applications];
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-brand-blue to-blue-700 text-white rounded-xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {userName}</h1>
            <p className="mt-2 text-blue-100">Manage your trademark applications and documents</p>
          </div>
          <Button 
            className="bg-white text-brand-blue hover:bg-blue-50 flex items-center gap-2"
            size="lg"
          >
            <Plus size={18} />
            Add New Application
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <TabsList className="grid grid-cols-4 gap-4 w-full">
            <TabsTrigger 
              value="applications" 
              className="data-[state=active]:bg-brand-blue data-[state=active]:text-white flex gap-2 items-center"
            >
              <FileText size={16} />
              Applications
            </TabsTrigger>
            <TabsTrigger 
              value="documents" 
              className="data-[state=active]:bg-brand-blue data-[state=active]:text-white flex gap-2 items-center"
            >
              <FileText size={16} />
              Documents
            </TabsTrigger>
            <TabsTrigger 
              value="payments" 
              className="data-[state=active]:bg-brand-blue data-[state=active]:text-white flex gap-2 items-center"
            >
              <CreditCard size={16} />
              Payments
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-brand-blue data-[state=active]:text-white flex gap-2 items-center"
            >
              <User size={16} />
              Profile
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="applications" className="space-y-6">
          {displayApplications.map((application) => (
            <ApplicationCard key={application.id} application={application as Application} />
          ))}
        </TabsContent>
        
        <TabsContent value="documents">
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-xl">My Documents</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center py-12 px-4">
                <div className="bg-blue-50 inline-flex p-4 rounded-full mb-4">
                  <FileText size={32} className="text-brand-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Documents Available</h3>
                <p className="text-gray-500 mb-6">Upload your documents to manage them all in one place.</p>
                <Button className="bg-brand-blue hover:bg-blue-700">
                  <Plus size={16} className="mr-2" />
                  Upload Documents
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments">
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-xl">Payment History</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {displayApplications.flatMap(app => 
                  app.payments.map(payment => (
                    <div key={payment.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="font-medium text-gray-900">{payment.description}</p>
                        <p className="text-sm text-gray-500">
                          {payment.date || 'Pending'} • {app.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">₹ {payment.amount.toLocaleString('en-IN')}</p>
                        <p className={`text-sm font-medium ${payment.status === 'paid' ? 'text-green-600' : 'text-amber-600'}`}>
                          {payment.status === 'paid' ? 'Paid' : 'Pending'}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {displayApplications.flatMap(app => app.payments).filter(p => p.status === 'pending').length > 0 && (
                <div className="mt-6">
                  <Button className="bg-brand-orange hover:bg-orange-600 w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay All Pending Fees
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile">
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-xl">My Profile</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-1">Full Name</label>
                      <p className="font-medium text-gray-900">{userName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-1">Email</label>
                      <p className="font-medium text-gray-900">user@example.com</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-1">Phone</label>
                      <p className="font-medium text-gray-900">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button className="bg-brand-blue hover:bg-blue-700">
                      Edit Profile
                    </Button>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-4">Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Email Notifications</span>
                      <div className="w-12 h-6 bg-brand-blue rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>SMS Notifications</span>
                      <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mt-8">
        <div className="flex items-start gap-3">
          <div className="bg-amber-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-800">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-amber-800 mb-1">Important Notice</h4>
            <p className="text-amber-800 text-sm">
              Government fees may change. Additional documents may be required based on examination reports. Keep checking your account for updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
