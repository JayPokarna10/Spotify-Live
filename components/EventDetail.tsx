import React from 'react';
import { Event } from '../types';
import { MapPin, Calendar, Share2, Users, TrendingUp, Heart } from './Icons';

interface EventDetailProps {
  event: Event;
  onBuyTickets: () => void;
  onBack: () => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({ event, onBuyTickets, onBack }) => {
  return (
    <div className="bg-spotify-base min-h-screen pb-24 relative animate-fade-in">
      {/* Hero */}
      <div className="relative h-[50vh]">
        <img src={event.image} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-spotify-base via-spotify-base/40 to-transparent" />
        
        <button onClick={onBack} className="absolute top-4 left-4 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 z-20">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
           <h1 className="text-4xl md:text-6xl font-black text-white mb-2">{event.artistName}</h1>
           <h2 className="text-xl md:text-2xl text-white/90 mb-6">Live in {event.city}</h2>
           
           <div className="flex flex-wrap gap-4 text-sm font-medium text-white/80">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                <Calendar className="w-4 h-4" />
                {event.date} • {event.time}
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                <MapPin className="w-4 h-4" />
                {event.venue}
              </div>
           </div>
        </div>
      </div>

      <div className="px-6 md:px-10 max-w-5xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Ticket Info */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Demand Pricing Indicator */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-spotify-green mt-1" />
              <div>
                <h3 className="text-white font-bold text-sm">Demand-based pricing active</h3>
                <p className="text-spotify-text text-xs mt-1">
                  Current prices: <span className="text-white">₹{event.price.min} - ₹{event.price.max}</span>. 
                  Demand is high, prices may increase soon.
                </p>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                   <div className="bg-spotify-green h-full w-3/4"></div>
                </div>
                <p className="text-[10px] text-right mt-1 text-spotify-green">High Demand</p>
              </div>
            </div>

            {/* Ticket Tiers (Preview) */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Select Tickets</h3>
              <div className="space-y-3">
                {[
                  { name: 'General Admission', price: event.price.min, status: 'Available' },
                  { name: 'VIP Pit', price: event.price.max, status: 'Selling Fast' },
                  { name: 'Balcony', price: event.price.min + 500, status: 'Limited' },
                ].map((tier, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[#1e1e1e] rounded-lg border border-transparent hover:border-white/30 transition cursor-pointer" onClick={onBuyTickets}>
                     <div>
                        <div className="font-bold text-white">{tier.name}</div>
                        <div className={`text-xs ${tier.status === 'Selling Fast' ? 'text-orange-400' : 'text-spotify-green'}`}>{tier.status}</div>
                     </div>
                     <div className="text-white font-bold">₹{tier.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why we recommend */}
            <div className="pt-4 border-t border-white/10">
               <div className="flex items-center gap-3 mb-2">
                 <div className="w-8 h-8 rounded-full bg-spotify-green flex items-center justify-center">
                   <Heart className="w-4 h-4 fill-black text-black" />
                 </div>
                 <span className="font-bold text-white">Why we're recommending this</span>
               </div>
               <p className="text-spotify-text text-sm ml-11">
                 You listened to {event.artistName} 42 times this month. Plus, 3 of your friends are going.
               </p>
               <div className="flex -space-x-2 ml-11 mt-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-black overflow-hidden">
                      <img src={`https://picsum.photos/50/50?random=${i+50}`} className="w-full h-full" />
                    </div>
                  ))}
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center text-[8px] font-bold text-white">+2</div>
               </div>
            </div>
          </div>

          {/* Right Column: Setlist Preview */}
          <div className="bg-[#181818] rounded-xl p-6 h-fit">
            <h3 className="font-bold text-white mb-4">Likely Setlist</h3>
            <p className="text-xs text-spotify-text mb-4">Based on recent shows in India</p>
            <div className="space-y-3">
               {[1, 2, 3, 4, 5].map((song) => (
                 <div key={song} className="flex items-center gap-3 group cursor-pointer">
                    <span className="text-spotify-text text-sm w-4">{song}</span>
                    <div className="w-8 h-8 bg-zinc-800 rounded overflow-hidden">
                       <img src={`https://picsum.photos/50/50?random=${song+100}`} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                       <div className="text-sm text-white truncate font-medium group-hover:text-spotify-green">Hit Song {song}</div>
                       <div className="text-xs text-spotify-text truncate">{event.artistName}</div>
                    </div>
                 </div>
               ))}
            </div>
            <button className="w-full mt-4 text-xs font-bold text-white border border-white/20 py-2 rounded-full hover:border-white transition">Listen to playlist</button>
          </div>
        </div>
      </div>
      
      {/* Floating Mobile CTA */}
      <div className="fixed bottom-20 left-0 w-full p-4 bg-gradient-to-t from-black via-black to-transparent md:hidden">
         <button 
            onClick={onBuyTickets}
            className="w-full bg-spotify-green text-black font-bold py-3 rounded-full shadow-xl hover:scale-105 transition"
         >
           Get Tickets • From ₹{event.price.min}
         </button>
      </div>
    </div>
  );
};