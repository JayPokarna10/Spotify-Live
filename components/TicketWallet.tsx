import React, { useState } from 'react';
import { QrCode, Calendar, MapPin } from './Icons';
import { Event } from '../types';

interface WalletProps {
  purchasedEvents: Event[];
}

export const TicketWallet: React.FC<WalletProps> = ({ purchasedEvents }) => {
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);

  if (purchasedEvents.length === 0) {
    return (
      <div className="p-8 text-center min-h-screen bg-spotify-base pt-20">
         <h2 className="text-2xl font-bold text-white mb-2">No tickets yet</h2>
         <p className="text-spotify-text">When you buy concert tickets, they'll appear here.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-base pb-24 px-4 pt-16 md:px-8">
      <h1 className="text-3xl font-bold text-white mb-6">Your Tickets</h1>
      
      <div className="space-y-4 max-w-md mx-auto md:mx-0">
        {purchasedEvents.map(event => (
          <div key={event.id} className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition">
            
            {/* Header */}
            <div 
               className="p-4 cursor-pointer bg-gradient-to-r from-[#1e1e1e] to-[#252525]"
               onClick={() => setExpandedTicket(expandedTicket === event.id ? null : event.id)}
            >
               <div className="flex gap-4">
                  <div className="w-16 h-16 bg-zinc-800 rounded-md overflow-hidden shrink-0">
                    <img src={event.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                     <h3 className="text-white font-bold truncate">{event.artistName}</h3>
                     <p className="text-sm text-spotify-text truncate">{event.venue}, {event.city}</p>
                     <div className="mt-2 flex gap-2">
                        <span className="bg-spotify-green text-black text-[10px] font-bold px-2 py-0.5 rounded">UPCOMING</span>
                        <span className="bg-white/10 text-white text-[10px] font-bold px-2 py-0.5 rounded">{event.date}</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Expanded QR View */}
            {expandedTicket === event.id && (
              <div className="p-6 bg-white rounded-b-xl animate-fade-in">
                 <div className="flex flex-col items-center text-center">
                    <p className="text-black font-bold text-sm mb-4 tracking-widest uppercase">Scan for Entry</p>
                    <div className="w-48 h-48 bg-black mb-4 p-2">
                        {/* Mock QR */}
                       <div className="w-full h-full border-4 border-white bg-zinc-900 flex items-center justify-center text-white">
                          <QrCode className="w-20 h-20" />
                       </div>
                    </div>
                    <div className="text-black mb-4">
                       <div className="font-bold text-lg">Section GA</div>
                       <div className="text-sm text-gray-600">Row 4 • Seat 12</div>
                    </div>
                    <div className="w-full h-px bg-gray-200 mb-4"></div>
                    <button className="text-spotify-green font-bold text-sm uppercase tracking-wider hover:underline">
                       View Venue Directions
                    </button>
                 </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};