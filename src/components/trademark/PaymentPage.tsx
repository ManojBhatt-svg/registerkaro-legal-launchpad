
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, CreditCard, CheckCircle, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentPageProps {
  packageName: string;
  trademarkName: string;
  onBack: () => void;
  onComplete: () => void;
}

const PaymentPage = ({ packageName, trademarkName, onBack, onComplete }: PaymentPageProps) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [addons, setAddons] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const basePrice = packageName === 'Basic' 
    ? 7999 
    : packageName === 'Standard' 
      ? 12999 
      : 19999;
  
  const addonOptions = [
    {
      id: 'gst',
      name: 'GST Registration',
      price: 1499,
      description: 'Complete GST registration service'
    },
    {
      id: 'fssai',
      name: 'FSSAI Registration',
      price: 3499,
      description: 'Food safety license for your business'
    },
    {
      id: 'legal',
      name: 'Legal Documentation',
      price: 2999,
      description: 'Custom legal documents for your business'
    }
  ];
  
  const toggleAddon = (addonId: string) => {
    setAddons(prevAddons => 
      prevAddons.includes(addonId)
        ? prevAddons.filter(id => id !== addonId)
        : [...prevAddons, addonId]
    );
  };
  
  const getAddonPrice = (addonId: string) => {
    const addon = addonOptions.find(a => a.id === addonId);
    return addon ? addon.price : 0;
  };
  
  const getSubtotal = () => {
    return basePrice + addons.reduce((total, addonId) => total + getAddonPrice(addonId), 0);
  };
  
  const getGST = () => {
    return Math.round(getSubtotal() * 0.18);
  };
  
  const getTotal = () => {
    return getSubtotal() + getGST();
  };
  
  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === 'first10') {
      toast.success('Promo code applied! 10% discount.');
    } else {
      toast.error('Invalid promo code. Please try again.');
    }
  };
  
  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Payment successful!');
      onComplete();
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 md:p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Complete Your Payment
        </h3>
        
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step 4 of 5 – Payment
            </span>
            <span className="text-sm font-medium text-gray-700">
              80%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-orange transition-all duration-300" 
              style={{ width: '80%' }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Payment Methods */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Summary */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>Trademark: {trademarkName}</span>
                  <span className="font-semibold">₹{basePrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Package: {packageName}</span>
                </div>
                
                {addons.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium mb-2">Add-ons:</p>
                    {addons.map(addonId => {
                      const addon = addonOptions.find(a => a.id === addonId);
                      return addon ? (
                        <div key={addonId} className="flex justify-between text-sm mb-1">
                          <span>{addon.name}</span>
                          <span>₹{addon.price.toLocaleString('en-IN')}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </div>
            
            {/* Add-on Services */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Add-on Services</h4>
              <div className="space-y-4">
                {addonOptions.map((addon) => (
                  <div
                    key={addon.id}
                    className={`border rounded-lg p-4 transition-all duration-200 ${
                      addons.includes(addon.id) 
                        ? 'border-brand-orange bg-orange-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start">
                      <Checkbox
                        id={addon.id}
                        checked={addons.includes(addon.id)}
                        onCheckedChange={() => toggleAddon(addon.id)}
                        className="mt-1"
                      />
                      <div className="ml-3 flex-grow">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={addon.id} className="font-medium text-gray-900">
                            {addon.name}
                          </Label>
                          <span className="font-medium text-gray-900">
                            ₹{addon.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {addon.description}
                        </p>
                      </div>
                    </div>
                    
                    {addons.includes(addon.id) && (
                      <div className="mt-3 pl-7">
                        <Button 
                          variant="link" 
                          className="text-sm p-0 h-auto text-brand-blue"
                          onClick={() => toggleAddon(addon.id)}
                        >
                          <Minus className="h-3 w-3 mr-1" />
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Payment Methods */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h4>
              
              <div className="space-y-3">
                {/* Credit Card */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-brand-orange bg-orange-50'
                      : 'border-gray-200'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center">
                    <div className={`h-4 w-4 rounded-full border ${
                      paymentMethod === 'card'
                        ? 'border-brand-orange'
                        : 'border-gray-300'
                      }`}
                    >
                      {paymentMethod === 'card' && (
                        <div className="h-2 w-2 m-[3px] rounded-full bg-brand-orange"></div>
                      )}
                    </div>
                    <div className="ml-3 flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="font-medium">Credit/Debit Card</span>
                    </div>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber" className="text-sm">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry" className="text-sm">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-sm">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="name" className="text-sm">Name on Card</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* UPI */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-brand-orange bg-orange-50'
                      : 'border-gray-200'
                  }`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <div className="flex items-center">
                    <div className={`h-4 w-4 rounded-full border ${
                      paymentMethod === 'upi'
                        ? 'border-brand-orange'
                        : 'border-gray-300'
                      }`}
                    >
                      {paymentMethod === 'upi' && (
                        <div className="h-2 w-2 m-[3px] rounded-full bg-brand-orange"></div>
                      )}
                    </div>
                    <div className="ml-3">
                      <span className="font-medium">UPI</span>
                    </div>
                  </div>
                  
                  {paymentMethod === 'upi' && (
                    <div className="mt-4">
                      <Label htmlFor="upiId" className="text-sm">UPI ID</Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@upi"
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
                
                {/* Netbanking */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer ${
                    paymentMethod === 'netbanking'
                      ? 'border-brand-orange bg-orange-50'
                      : 'border-gray-200'
                  }`}
                  onClick={() => setPaymentMethod('netbanking')}
                >
                  <div className="flex items-center">
                    <div className={`h-4 w-4 rounded-full border ${
                      paymentMethod === 'netbanking'
                        ? 'border-brand-orange'
                        : 'border-gray-300'
                      }`}
                    >
                      {paymentMethod === 'netbanking' && (
                        <div className="h-2 w-2 m-[3px] rounded-full bg-brand-orange"></div>
                      )}
                    </div>
                    <div className="ml-3">
                      <span className="font-medium">Net Banking</span>
                    </div>
                  </div>
                  
                  {paymentMethod === 'netbanking' && (
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Bank', 'Others'].map((bank) => (
                        <Button
                          key={bank}
                          variant="outline"
                          className="py-2 px-3 h-auto"
                        >
                          {bank}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Order Summary */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h4>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{getSubtotal().toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span>₹{getGST().toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-3 border-t border-gray-300 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{getTotal().toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              {/* Promo Code */}
              <div className="mb-6">
                <Label htmlFor="promoCode" className="text-sm">Promo Code</Label>
                <div className="flex mt-1">
                  <Input
                    id="promoCode"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="rounded-r-none"
                  />
                  <Button 
                    onClick={handleApplyPromo}
                    className="rounded-l-none"
                  >
                    Apply
                  </Button>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-start">
                  <Checkbox id="terms" className="mt-1" />
                  <Label htmlFor="terms" className="ml-2 text-sm text-gray-500">
                    I agree to the <a href="#" className="text-brand-blue hover:underline">Terms of Service</a> and <a href="#" className="text-brand-blue hover:underline">Privacy Policy</a>
                  </Label>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="bg-brand-orange hover:bg-orange-600"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Processing...
                    </div>
                  ) : (
                    <>Pay ₹{getTotal().toLocaleString('en-IN')}</>
                  )}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={onBack}
                  disabled={isProcessing}
                  className="flex items-center justify-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center">
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure Payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
