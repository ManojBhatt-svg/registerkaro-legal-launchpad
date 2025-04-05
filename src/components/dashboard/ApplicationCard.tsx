
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Upload,
  FileText,
  Download,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { toast } from 'sonner';

export interface Document {
  name: string;
  status: 'verified' | 'pending' | 'missing';
}

export interface Payment {
  amount: number;
  date: string;
  description: string;
  status: 'paid' | 'pending';
}

export interface Application {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'in_progress' | 'completed' | 'objected';
  dateUpdated: string;
  documents: Document[];
  payments: Payment[];
}

interface ApplicationCardProps {
  application: Application;
}

const ApplicationCard = ({ application }: ApplicationCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getStatusIcon = () => {
    switch (application.status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'objected':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusText = () => {
    switch (application.status) {
      case 'pending':
        return 'Pending';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'objected':
        return 'Objected';
      default:
        return '';
    }
  };
  
  const getStatusColor = () => {
    switch (application.status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'objected':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };
  
  const getProgress = () => {
    switch (application.status) {
      case 'pending':
        return 25;
      case 'in_progress':
        return 50;
      case 'completed':
        return 100;
      case 'objected':
        return 75;
      default:
        return 0;
    }
  };
  
  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'missing':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  const handleUploadDocument = () => {
    // In a real app, this would open a file picker
    toast.success('Document upload functionality would open here');
  };
  
  const handleDownloadTemplate = () => {
    // In a real app, this would download a template
    toast.success('Template would download here');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Card Header */}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h2 className="text-xl font-bold mr-3">{application.name}</h2>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                {getStatusText()}
              </span>
            </div>
            <p className="text-gray-500 mt-1">{application.type}</p>
          </div>
          <div className="flex items-center">
            {getStatusIcon()}
            <span className="text-sm text-gray-500 ml-2">
              Updated: {application.dateUpdated}
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">{getProgress()}%</span>
          </div>
          <Progress value={getProgress()} className="h-2" />
        </div>
        
        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          className="w-full mt-4 flex items-center justify-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <span>Hide Details</span>
              <ChevronUp className="h-4 w-4 ml-1" />
            </>
          ) : (
            <>
              <span>View Details</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </div>
      
      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-6">
          {/* Documents Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Required Documents</h3>
            
            <div className="space-y-3">
              {application.documents.map((doc, index) => (
                <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{doc.name}</span>
                  </div>
                  <div className="flex items-center">
                    {getDocumentStatusIcon(doc.status)}
                    <span className="text-sm ml-2">
                      {doc.status === 'verified' && 'Verified'}
                      {doc.status === 'pending' && 'Pending Verification'}
                      {doc.status === 'missing' && 'Required'}
                    </span>
                    
                    {doc.status === 'missing' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 text-brand-blue hover:text-blue-700"
                        onClick={handleUploadDocument}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Upload
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-brand-blue border-brand-blue"
                onClick={handleDownloadTemplate}
              >
                <Download className="h-4 w-4 mr-1" />
                Download Templates
              </Button>
              
              <Button
                size="sm"
                className="bg-brand-orange hover:bg-orange-600"
                onClick={handleUploadDocument}
              >
                <Upload className="h-4 w-4 mr-1" />
                Upload Documents
              </Button>
            </div>
          </div>
          
          {/* Payments Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Payments</h3>
            
            <div className="space-y-3">
              {application.payments.map((payment, index) => (
                <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <div>
                    <p className="font-medium">{payment.description}</p>
                    <p className="text-sm text-gray-500">{payment.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">₹{payment.amount.toLocaleString('en-IN')}</span>
                    {payment.status === 'paid' ? (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Paid
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-brand-orange hover:bg-orange-600"
                      >
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {application.payments.some(p => p.status === 'pending') && (
              <div className="mt-4 bg-blue-50 rounded-lg p-3 text-sm text-blue-700">
                <p>
                  <strong>Note:</strong> Please complete all pending payments to avoid delays in processing.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationCard;
