
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ApplicationCard from './ApplicationCard';

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
        { name: 'Proof of Identity', status: 'pending' },
        { name: 'Proof of Business', status: 'pending' },
        { name: 'Logo File (High Resolution)', status: 'missing' }
      ],
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
      status: 'pending' as const, // Using as const to ensure it's the literal type
      dateUpdated: new Date().toISOString().split('T')[0],
      documents: [
        { name: 'Proof of Identity', status: 'missing' },
        { name: 'Proof of Business', status: 'missing' },
        { name: 'Logo File (High Resolution)', status: 'missing' }
      ],
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Welcome, {userName}</h1>
        <Button>Add New Application</Button>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="applications" className="space-y-4">
          {displayApplications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </TabsContent>
        
        <TabsContent value="documents">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">My Documents</h3>
            <p>All your uploaded documents will appear here.</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Payment History</h3>
            <div className="space-y-4">
              {displayApplications.flatMap(app => 
                app.payments.map(payment => (
                  <div key={payment.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">{payment.description}</p>
                      <p className="text-sm text-gray-500">{payment.date || 'Pending'} - {app.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹ {payment.amount}</p>
                      <p className={`text-sm ${payment.status === 'paid' ? 'text-green-600' : 'text-amber-600'}`}>
                        {payment.status === 'paid' ? 'Paid' : 'Pending'}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">My Profile</h3>
            <p>Your profile information and settings.</p>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
        <p className="text-amber-800 text-sm">
          <span className="font-bold">⚠️ Note:</span> Government fees may change. Additional documents may be required based on examination reports.
        </p>
      </div>
    </div>
  );
};

export default UserDashboard;
