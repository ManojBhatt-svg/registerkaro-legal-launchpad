
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ApplicationCard from './ApplicationCard';
import { Application, Document } from './ApplicationCard';
import { Plus, FileText, CreditCard, User, Bell, CheckCircle2, Clock, FileUp } from 'lucide-react';

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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {userName}</h1>
            <p className="mt-2 text-blue-100 opacity-90">Manage your trademark applications and documents all in one place</p>
          </div>
          <Button 
            className="bg-white text-indigo-700 hover:bg-blue-50 flex items-center gap-2 text-sm font-medium py-5 px-6 rounded-xl shadow-sm transition-all duration-200"
          >
            <Plus size={18} />
            Start New Application
          </Button>
        </div>
        
        {/* Dashboard Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="bg-white bg-opacity-15 backdrop-filter backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
            <div className="bg-white bg-opacity-20 rounded-full p-2">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-blue-100">Applications</p>
              <p className="text-xl font-bold">{displayApplications.length}</p>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-15 backdrop-filter backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
            <div className="bg-white bg-opacity-20 rounded-full p-2">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-blue-100">Pending</p>
              <p className="text-xl font-bold">{displayApplications.filter(app => app.status === 'in_progress').length}</p>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-15 backdrop-filter backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
            <div className="bg-white bg-opacity-20 rounded-full p-2">
              <FileUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-blue-100">Missing Documents</p>
              <p className="text-xl font-bold">
                {displayApplications.reduce((count, app) => 
                  count + app.documents.filter(doc => doc.status === 'missing').length, 0)}
              </p>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-15 backdrop-filter backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
            <div className="bg-white bg-opacity-20 rounded-full p-2">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-blue-100">Completed</p>
              <p className="text-xl font-bold">{displayApplications.filter(app => app.status === 'completed').length}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white rounded-xl shadow-md p-3 mb-6">
          <TabsList className="grid grid-cols-4 gap-2 w-full p-1 bg-gray-50 rounded-lg">
            <TabsTrigger 
              value="applications" 
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-2.5 rounded-md transition-all duration-200 flex gap-2 items-center justify-center"
            >
              <FileText size={18} />
              Applications
            </TabsTrigger>
            <TabsTrigger 
              value="documents" 
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-2.5 rounded-md transition-all duration-200 flex gap-2 items-center justify-center"
            >
              <FileText size={18} />
              Documents
            </TabsTrigger>
            <TabsTrigger 
              value="payments" 
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-2.5 rounded-md transition-all duration-200 flex gap-2 items-center justify-center"
            >
              <CreditCard size={18} />
              Payments
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-2.5 rounded-md transition-all duration-200 flex gap-2 items-center justify-center"
            >
              <User size={18} />
              Profile
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="applications" className="space-y-6 mt-4">
          {displayApplications.map((application) => (
            <ApplicationCard key={application.id} application={application as Application} />
          ))}
        </TabsContent>
        
        <TabsContent value="documents" className="mt-4">
          <Card className="overflow-hidden border-none shadow-md rounded-xl">
            <CardHeader className="bg-gray-50 border-b p-6">
              <CardTitle className="text-xl font-bold text-gray-800">My Documents</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center py-16 px-4">
                <div className="bg-indigo-50 inline-flex p-5 rounded-full mb-4">
                  <FileText size={36} className="text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">No Documents Available</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Upload your documents to manage them all in one place. We'll keep them organized and secure for you.
                </p>
                <Button className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5">
                  <Plus size={16} className="mr-2" />
                  Upload Documents
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments" className="mt-4">
          <Card className="overflow-hidden border-none shadow-md rounded-xl">
            <CardHeader className="bg-gray-50 border-b p-6 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-800">Payment History</CardTitle>
              {displayApplications.flatMap(app => app.payments).filter(p => p.status === 'pending').length > 0 && (
                <Button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 text-sm">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay Pending Fees
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {displayApplications.flatMap(app => 
                  app.payments.map(payment => (
                    <div key={payment.id} className="flex justify-between items-center p-4 bg-white border rounded-xl hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="font-medium text-gray-900">{payment.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-500">
                            {payment.date || 'Scheduled'} 
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{app.name}</span>
                        </div>
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
              
              {displayApplications.flatMap(app => app.payments).length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-gray-50 inline-flex p-4 rounded-full mb-4">
                    <CreditCard size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Payment History</h3>
                  <p className="text-gray-500">
                    Your payment history will appear here once you make your first payment.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile" className="mt-4">
          <Card className="overflow-hidden border-none shadow-md rounded-xl">
            <CardHeader className="bg-gray-50 border-b p-6">
              <CardTitle className="text-xl font-bold text-gray-800">My Profile</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-5 rounded-xl">
                      <label className="text-sm font-medium text-gray-500 block mb-1">Full Name</label>
                      <p className="font-medium text-gray-900 text-lg">{userName}</p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-xl">
                      <label className="text-sm font-medium text-gray-500 block mb-1">Email</label>
                      <p className="font-medium text-gray-900 text-lg">user@example.com</p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-xl">
                      <label className="text-sm font-medium text-gray-500 block mb-1">Phone</label>
                      <p className="font-medium text-gray-900 text-lg">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5">
                      Edit Profile
                    </Button>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-6 text-gray-700">Notification Preferences</h3>
                  <div className="space-y-5">
                    <div className="flex items-center justify-between bg-gray-50 p-5 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-800">Email Notifications</p>
                        <p className="text-gray-500 text-sm">Receive updates via email</p>
                      </div>
                      <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-5 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-800">SMS Notifications</p>
                        <p className="text-gray-500 text-sm">Receive updates via text</p>
                      </div>
                      <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-5 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-800">WhatsApp Notifications</p>
                        <p className="text-gray-500 text-sm">Receive updates via WhatsApp</p>
                      </div>
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
      
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mt-8 flex items-start gap-3">
        <div className="bg-blue-100 p-2 rounded-full">
          <Bell className="w-5 h-5 text-blue-700" />
        </div>
        <div>
          <h4 className="font-semibold text-blue-800 mb-1">Important Notice</h4>
          <p className="text-blue-700 text-sm">
            Government fees may change. Additional documents may be required based on examination reports. 
            Keep checking your account for updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
