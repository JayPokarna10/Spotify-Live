import React, { useState } from 'react';
import { Event } from '../types';
import { CheckCircle2, CreditCard } from './Icons';

interface CheckoutProps {
  event: Event;
  onComplete: () => void;
  onCancel: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ event, onComplete, onCancel }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-spotify-base flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="w-20 h-20 bg-spotify-green rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle2 className="w-10 h-10 text-black" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">You're going!</h1>
        <p className="text-spotify-text mb-8">Tickets for {event.artistName} have been added to your library.</p>
        
        <div className="flex flex-col w-full max-w-xs gap-3">
           <button onClick={onComplete} className="bg-white text-black font-bold py-3 rounded-full hover:scale-105 transition">
             View Ticket
           </button>
           <button className="bg-transparent border border-white/30 text-white font-bold py-3 rounded-full hover:border-white transition">
             Add to Calendar
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-base p-4 md:p-8 max-w-4xl mx-auto pb-24">
      <header className="flex items-center justify-between mb-8">
        <button onClick={step === 1 ? onCancel : () => setStep(1)} className="text-white font-bold text-sm">
          {step === 1 ? 'Cancel' : 'Back'}
        </button>
        <span className="text-white font-bold">Checkout ({step}/2)</span>
        <div className="w-10" /> {/* Spacer */}
      </header>

      {step === 1 && (
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-white mb-6">Select Section</h1>
          
          {/* Visual Map Mock */}
          <div className="bg-[#1e1e1e] aspect-video rounded-lg mb-6 flex items-center justify-center relative overflow-hidden border border-white/10">
            <div className="absolute top-4 text-xs text-spotify-text uppercase tracking-widest">Stage</div>
            <div className="w-3/4 h-1 bg-white/20 absolute top-10 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
            
            <div className="grid grid-cols-3 gap-2 w-2/3 mt-12">
               <button 
                 onClick={() => setSelectedSection('VIP')}
                 className={`h-20 rounded border-2 transition flex items-center justify-center text-xs font-bold ${selectedSection === 'VIP' ? 'bg-spotify-green border-spotify-green text-black' : 'border-white/20 text-white hover:border-white'}`}
               >
                 VIP PIT
               </button>
               <button 
                 onClick={() => setSelectedSection('GA')}
                 className={`col-span-2 h-20 rounded border-2 transition flex items-center justify-center text-xs font-bold ${selectedSection === 'GA' ? 'bg-spotify-green border-spotify-green text-black' : 'border-white/20 text-white hover:border-white'}`}
               >
                 GENERAL ADMISSION
               </button>
               <button 
                 onClick={() => setSelectedSection('UB')}
                 className={`col-span-3 h-16 rounded border-2 transition flex items-center justify-center text-xs font-bold ${selectedSection === 'UB' ? 'bg-spotify-green border-spotify-green text-black' : 'border-white/20 text-white hover:border-white'}`}
               >
                 UPPER BALCONY
               </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-white p-4 bg-white/5 rounded">
               <span>Selected: <span className="font-bold">{selectedSection || 'None'}</span></span>
               <span className="font-bold">₹{selectedSection === 'VIP' ? event.price.max : event.price.min}</span>
            </div>
            <button 
               disabled={!selectedSection}
               onClick={() => setStep(2)}
               className={`w-full py-4 rounded-full font-bold transition ${selectedSection ? 'bg-spotify-green text-black hover:scale-105' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}
            >
               Continue to Payment
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-white mb-6">Payment</h1>
          
          <div className="bg-[#1e1e1e] rounded-xl p-6 mb-6">
             <h3 className="text-white font-bold mb-4">Order Summary</h3>
             <div className="flex justify-between text-sm text-spotify-text mb-2">
                <span>{selectedSection} Ticket x 1</span>
                <span className="text-white">₹{event.price.min}</span>
             </div>
             <div className="flex justify-between text-sm text-spotify-text mb-2">
                <span>Service Fee</span>
                <span className="text-white">₹200</span>
             </div>
             <div className="flex justify-between text-sm text-spotify-text mb-4">
                <span>Spotify Booking Fee</span>
                <span className="text-white">₹50</span>
             </div>
             <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-white text-lg">
                <span>Total</span>
                <span>₹{event.price.min + 250}</span>
             </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 border border-spotify-green bg-spotify-green/10 rounded-lg flex items-center gap-4 cursor-pointer">
               <CreditCard className="text-spotify-green" />
               <div className="flex-1">
                  <div className="text-white font-bold text-sm">Visa ending in 4242</div>
                  <div className="text-spotify-text text-xs">Exp 12/25</div>
               </div>
               <div className="w-4 h-4 bg-spotify-green rounded-full border-4 border-black ring-1 ring-spotify-green"></div>
            </div>
            <div className="p-4 border border-white/10 bg-white/5 rounded-lg flex items-center gap-4 cursor-pointer opacity-60">
               <div className="w-6 h-6 bg-white rounded text-black text-[10px] font-bold flex items-center justify-center">UPI</div>
               <div className="text-white font-bold text-sm">Pay with UPI</div>
            </div>
          </div>

          <button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-spotify-green text-black font-bold py-4 rounded-full mt-8 hover:scale-105 transition flex items-center justify-center"
          >
            {isProcessing ? 'Processing...' : `Pay ₹${event.price.min + 250}`}
          </button>
        </div>
      )}

    </div>
  );
};