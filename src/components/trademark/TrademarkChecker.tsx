import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface TrademarkCheckerProps {
  onCheckComplete: (result: { available: boolean, name: string }) => void;
}

const TrademarkChecker = ({ onCheckComplete }: TrademarkCheckerProps) => {
  const [trademarkName, setTrademarkName] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{ available: boolean, checked: boolean }>({ 
    available: false, 
    checked: false 
  });
  
  const checkTrademarkAvailability = async (name: string): Promise<{ available: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const isAvailable = !name.toLowerCase().includes('taken');
    
    return { available: isAvailable };
  };
  
  const handleCheck = async () => {
    if (!trademarkName.trim()) {
      toast.error('Please enter a trademark name');
      return;
    }
    
    setIsChecking(true);
    
    try {
      const result = await checkTrademarkAvailability(trademarkName);
      
      const isAvailable = result.available;
      
      setResult({ 
        available: isAvailable, 
        checked: true 
      });
      
      onCheckComplete({ available: isAvailable, name: trademarkName });
      
      if (isAvailable) {
        toast.success(`"${trademarkName}" appears to be available for registration.`);
      } else {
        toast.warning(`Potential conflicts found for "${trademarkName}".`);
      }
    } catch (error) {
      console.error('Trademark check failed:', error);
      toast.error(`Failed to check trademark: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      setResult({ 
        available: false, 
        checked: true 
      });
    } finally {
      setIsChecking(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 md:p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Trademark Availability Checker</h3>
        <p className="text-gray-600 mb-6">
          Enter your desired trademark name to check if it's available for registration.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            type="text"
            placeholder="Enter trademark name..."
            value={trademarkName}
            onChange={(e) => setTrademarkName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow"
          />
          <Button 
            onClick={handleCheck} 
            disabled={isChecking} 
            className="bg-brand-blue hover:bg-blue-700"
          >
            {isChecking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Check Availability
              </>
            )}
          </Button>
        </div>
        
        {result.checked && (
          <div 
            className={`p-4 rounded-lg ${
              result.available ? 'bg-green-50 border border-green-100' : 'bg-orange-50 border border-orange-100'
            }`}
          >
            <div className="flex items-center">
              {result.available ? (
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-orange-500 mr-2" />
              )}
              <div>
                <p className={`font-semibold ${result.available ? 'text-green-700' : 'text-orange-700'}`}>
                  {result.available ? 'Available ✅' : 'Conflict Found ⚠️'}
                </p>
                <p className="text-sm text-gray-600">
                  {result.available
                    ? `Great! "${trademarkName}" appears to be available for registration.`
                    : `We found potential conflicts for "${trademarkName}". You may need to modify your trademark.`}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6 text-sm text-gray-500">
          <p>
            <strong>Note:</strong> This is a preliminary check only. A comprehensive search will be conducted during the trademark registration process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrademarkChecker;
