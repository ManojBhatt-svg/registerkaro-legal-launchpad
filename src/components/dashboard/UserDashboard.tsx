
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bell,
  CheckCircle,
  Clock,
  AlertTriangle,
  Upload,
  FileText,
  Download,
  X,
  User,
  ShieldCheck,
  CreditCard,
  Settings,
  LogOut,
} from 'lucide-react';
import ApplicationCard, { Application } from './ApplicationCard';

interface UserDashboardProps {
  userName: string;
}

const UserDashboard = ({ userName = 'John Doe' }: UserDashboardProps) => {
  const [activeTab, setActiveTab] = useState('applications');
  
  const applications: Application[] = [
    {
      id: '1',
      name: 'TechNova',
      type: 'Trademark',
      status: 'pending' as const,
      dateUpdated: '2023-12-10',
      documents: [
        { name: 'ID Proof', status: 'verified' as const },
        { name: 'Business Proof', status: 'pending' as const },
        { name: 'Authorization Letter', status: 'missing' as const }
      ],
      payments: [
        { amount: 12999, date: '2023-12-01', description: 'Initial Payment', status: 'paid' as const },
        { amount: 4500, date: '2024-02-15', description: 'Government Fee', status: 'pending' as const }
      ]
    },
    {
      id: '2',
      name: 'EcoFresh',
      type: 'Trademark',
      status: 'in_progress' as const,
      dateUpdated: '2023-11-20',
      documents: [
        { name: 'ID Proof', status: 'verified' as const },
        { name: 'Business Proof', status: 'verified' as const },
        { name: 'Logo File', status: 'verified' as const }
      ],
      payments: [
        { amount: 7999, date: '2023-11-15', description: 'Initial Payment', status: 'paid' as const }
      ]
    },
    {
      id: '3',
      name: 'CloudServe Solutions',
      type: 'Company Registration',
      status: 'completed' as const,
      dateUpdated: '2023-10-05',
      documents: [
        { name: 'Director ID Proof', status: 'verified' as const },
        { name: 'Address Proof', status: 'verified' as const },
        { name: 'NOC', status: 'verified' as const }
      ],
      payments: [
        { amount: 8999, date: '2023-09-20', description: 'Initial Payment', status: 'paid' as const },
        { amount: 2500, date: '2023-09-30', description: 'Government Fee', status: 'paid' as const }
      ]
    }
  ];
  
  const notifications = [
    {
      id: '1',
      title: 'Document Required',
      message: 'Please upload the business proof for TechNova trademark application.',
      date: '2023-12-12',
      type: 'urgent'
    },
    {
      id: '2',
      title: 'Payment Due',
      message: 'Government fee of ₹4,500 is pending for TechNova trademark application.',
      date: '2023-12-10',
      type: 'payment'
    },
    {
      id: '3',
      title: 'Status Update',
      message: 'Your EcoFresh trademark application has been examined by the Registrar.',
      date: '2023-12-05',
      type: 'info'
    },
    {
      id: '4',
      title: 'Registration Complete',
      message: 'CloudServe Solutions company registration has been completed.',
      date: '2023-10-05',
      type: 'success'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl mb-4">
                  {userName.charAt(0)}
                </div>
                <h2 className="text-xl font-bold">{userName}</h2>
                <p className="text-gray-500 text-sm">Member since Dec 2023</p>
              </div>
              
              <div className="space-y-2">
                <Button 
                  variant={activeTab === 'applications' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('applications')}
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  My Applications
                </Button>
                <Button 
                  variant={activeTab === 'notifications' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                </Button>
                <Button 
                  variant={activeTab === 'payments' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('payments')}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payments
                </Button>
                <Button 
                  variant={activeTab === 'profile' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('profile')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button 
                  variant={activeTab === 'settings' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">My Applications</h1>
                  <Button 
                    className="bg-brand-orange hover:bg-orange-600"
                    onClick={() => window.location.href = '/services/trademark'}
                  >
                    New Application
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {applications.map((app) => (
                    <ApplicationCard key={app.id} application={app} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Notifications</h1>
                
                <div className="bg-white rounded-lg shadow-md">
                  {notifications.map((notification, index) => (
                    <div 
                      key={notification.id}
                      className={`p-4 flex items-start ${
                        index !== notifications.length - 1 
                          ? 'border-b border-gray-200' 
                          : ''
                      }`}
                    >
                      <div className="mr-4 mt-1">
                        {notification.type === 'urgent' && (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        )}
                        {notification.type === 'payment' && (
                          <CreditCard className="h-5 w-5 text-blue-500" />
                        )}
                        {notification.type === 'info' && (
                          <Bell className="h-5 w-5 text-yellow-500" />
                        )}
                        {notification.type === 'success' && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          <span className="text-xs text-gray-500">{notification.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        {notification.type === 'urgent' && (
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-brand-blue text-sm mt-2"
                          >
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Payment History</h1>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {applications.flatMap(app => 
                        app.payments.map((payment, index) => (
                          <tr key={`${app.id}-${index}`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {payment.description}
                              </div>
                              <div className="text-sm text-gray-500">
                                {app.name} - {app.type}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                ₹{payment.amount.toLocaleString('en-IN')}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {payment.date}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {payment.status === 'paid' ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Paid
                                </span>
                              ) : (
                                <Button
                                  size="sm"
                                  className="bg-brand-orange hover:bg-orange-600 text-xs h-7"
                                >
                                  Pay Now
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mt-6 flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-yellow-700">
                    <strong>Note:</strong> Government fees may change. Additional documents may be required based on the examination report.
                  </p>
                </div>
              </div>
            )}
            
            {(activeTab === 'profile' || activeTab === 'settings') && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6">
                  {activeTab === 'profile' ? 'Your Profile' : 'Account Settings'}
                </h1>
                
                <p className="text-gray-500">This section is under development.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
