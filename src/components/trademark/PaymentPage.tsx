import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, CreditCard, CheckCircle, Plus, Lock, Calendar, CreditCardIcon, Building, Banknote } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';

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
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-4xl mx-auto"
    >
      <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-brand-orange to-amber-500 text-white p-8">
          <CardTitle className="text-3xl font-bold">Complete Your Payment</CardTitle>
          <CardDescription className="text-white text-opacity-90 text-lg mt-2">
            Finish trademark registration for "{trademarkName}"
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="px-8 pt-8 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step 4 of 5 – Payment
              </span>
              <span className="text-sm font-medium text-gray-700">
                80%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-brand-orange to-amber-500 transition-all duration-300" 
                style={{ width: '80%' }}
              />
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Trademark: {trademarkName}</p>
                        <p className="text-sm text-gray-500">Package: {packageName}</p>
                      </div>
                      <span className="font-semibold text-lg">₹{basePrice.toLocaleString('en-IN')}</span>
                    </div>
                    
                    {addons.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm font-medium mb-2">Add-on Services:</p>
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
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Add-on Services</h3>
                  <div className="space-y-4">
                    {addonOptions.map((addon) => (
                      <motion.div
                        key={addon.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`border rounded-xl p-5 transition-all duration-200 ${
                          addons.includes(addon.id) 
                            ? 'border-brand-orange bg-orange-50 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start">
                          <Checkbox
                            id={addon.id}
                            checked={addons.includes(addon.id)}
                            onCheckedChange={() => toggleAddon(addon.id)}
                            className={`mt-1 ${addons.includes(addon.id) ? 'text-brand-orange' : ''}`}
                          />
                          <div className="ml-3 flex-grow">
                            <div className="flex items-center justify-between">
                              <Label htmlFor={addon.id} className="font-medium text-gray-900 text-lg cursor-pointer">
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
                              className="text-sm p-0 h-auto text-brand-orange"
                              onClick={() => toggleAddon(addon.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h3>
                  
                  <div className="space-y-4">
                    <div
                      className={`border rounded-xl p-5 cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-brand-orange bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="flex items-center">
                        <div className={`h-5 w-5 rounded-full border ${
                          paymentMethod === 'card'
                            ? 'border-brand-orange'
                            : 'border-gray-300'
                          }`}
                        >
                          {paymentMethod === 'card' && (
                            <div className="h-3 w-3 m-[4px] rounded-full bg-brand-orange"></div>
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
                            <div className="relative">
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                className="mt-1 pl-10"
                              />
                              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry" className="text-sm">Expiry Date</Label>
                              <div className="relative">
                                <Input
                                  id="expiry"
                                  placeholder="MM/YY"
                                  className="mt-1 pl-10"
                                />
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="cvv" className="text-sm">CVV</Label>
                              <div className="relative">
                                <Input
                                  id="cvv"
                                  placeholder="123"
                                  type="password"
                                  className="mt-1 pl-10"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              </div>
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
                    
                    <div
                      className={`border rounded-xl p-5 cursor-pointer transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-brand-orange bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <div className="flex items-center">
                        <div className={`h-5 w-5 rounded-full border ${
                          paymentMethod === 'upi'
                            ? 'border-brand-orange'
                            : 'border-gray-300'
                          }`}
                        >
                          {paymentMethod === 'upi' && (
                            <div className="h-3 w-3 m-[4px] rounded-full bg-brand-orange"></div>
                          )}
                        </div>
                        <div className="ml-3 flex items-center">
                          <Banknote className="h-5 w-5 text-gray-500 mr-2" />
                          <span className="font-medium">UPI</span>
                        </div>
                      </div>
                      
                      {paymentMethod === 'upi' && (
                        <div className="mt-4">
                          <Label htmlFor="upiId" className="text-sm">UPI ID</Label>
                          <Input
                            id="upiId"
                            placeholder="name@upi"
                            className="mt-1"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div
                      className={`border rounded-xl p-5 cursor-pointer transition-all ${
                        paymentMethod === 'netbanking'
                          ? 'border-brand-orange bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod('netbanking')}
                    >
                      <div className="flex items-center">
                        <div className={`h-5 w-5 rounded-full border ${
                          paymentMethod === 'netbanking'
                            ? 'border-brand-orange'
                            : 'border-gray-300'
                          }`}
                        >
                          {paymentMethod === 'netbanking' && (
                            <div className="h-3 w-3 m-[4px] rounded-full bg-brand-orange"></div>
                          )}
                        </div>
                        <div className="ml-3 flex items-center">
                          <Building className="h-5 w-5 text-gray-500 mr-2" />
                          <span className="font-medium">Net Banking</span>
                        </div>
                      </div>
                      
                      {paymentMethod === 'netbanking' && (
                        <div className="mt-4 grid grid-cols-3 gap-3">
                          {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Bank', 'Others'].map((bank) => (
                            <Button
                              key={bank}
                              variant="outline"
                              className="py-2 px-3 h-auto text-sm"
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
              
              <div>
                <div className="bg-gray-50 rounded-xl p-6 sticky top-6 border border-gray-100">
                  <h4 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h4>
                  
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
                      <span className="text-xl text-brand-orange">₹{getTotal().toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="promoCode" className="text-sm">Promo Code</Label>
                    <div className="flex mt-1 gap-2">
                      <Input
                        id="promoCode"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                      />
                      <Button 
                        onClick={handleApplyPromo}
                        className="bg-brand-blue whitespace-nowrap"
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
                  
                  <div className="space-y-3">
                    <Button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-brand-orange to-amber-500 hover:from-amber-500 hover:to-brand-orange h-12 text-lg"
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
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
                      className="w-full flex items-center justify-center"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Packages
                    </Button>
                  </div>
                  
                  <div className="mt-6 text-center flex items-center justify-center">
                    <Lock className="h-4 w-4 text-green-600 mr-1" />
                    <p className="text-xs text-gray-500">Secure payment • SSL Encrypted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PaymentPage;
