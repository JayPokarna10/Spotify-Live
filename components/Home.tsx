import React from 'react';
import { Event } from '../types';
import { Calendar, MapPin } from './Icons';

interface HomeProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

export const HomeView: React.FC<HomeProps> = ({ events, onEventClick }) => {
  const greetings = ["Good evening", "Live near you", "Your top mixes", "Recently played"];

  return (
    <div className="pb-24 pt-16 px-4 md:px-8 bg-gradient-to-b from-spotify-highlight to-spotify-base min-h-screen">
      
      {/* Standard Spotify Header */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Good evening</h1>

      {/* Standard Grid (Mock) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white/5 hover:bg-white/10 transition rounded flex items-center overflow-hidden cursor-pointer group">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-zinc-800 shrink-0">
               <img src={`https://picsum.photos/100/100?random=${i}`} alt="cover" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-sm md:text-base px-4 truncate text-white">Daily Mix {i}</span>
          </div>
        ))}
      </div>

      {/* LIVE NEAR YOU RAIL */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white hover:underline cursor-pointer">Live near you</h2>
          <span className="text-xs text-spotify-text font-bold tracking-wider uppercase">Show all</span>
        </div>
        
        <div className="flex overflow-x-auto space-x-4 pb-4 no-scrollbar">
          {events.map((event) => (
            <div 
              key={event.id}
              onClick={() => onEventClick(event)}
              className="min-w-[200px] md:min-w-[240px] bg-[#181818] hover:bg-[#282828] p-4 rounded-lg cursor-pointer transition duration-300 group"
            >
              <div className="relative aspect-square mb-4 rounded-md overflow-hidden shadow-lg">
                <img src={event.image} alt={event.artistName} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-2 left-2 bg-spotify-green text-black text-xs font-bold px-2 py-1 rounded-full">
                  {event.status === 'selling_fast' ? 'Selling Fast' : 'Upcoming'}
                </div>
              </div>
              <h3 className="font-bold text-white truncate">{event.artistName}</h3>
              <p className="text-sm text-spotify-text truncate mt-1">
                {event.date} • {event.venue}
              </p>
              <div className="mt-3 flex items-center text-xs text-spotify-text">
                <div className="bg-white/10 px-2 py-1 rounded text-white/80">
                  From {event.price.currency}{event.price.min}
                </div>
              </div>
              {/* Contextual Reason */}
              <p className="text-[10px] text-spotify-green mt-2">
                Because you listen to {event.artistName}
              </p>
            </div>
          ))}
        </div>
      </section>
      
      <h2 className="text-xl md:text-2xl font-bold mb-4">Made for You</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4 no-scrollbar">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="min-w-[160px] bg-[#181818] p-4 rounded-lg">
               <img src={`https://picsum.photos/200/200?random=${i+10}`} className="w-full aspect-square rounded mb-3" />
               <h3 className="font-bold">Discover Weekly</h3>
               <p className="text-xs text-spotify-text mt-1">Your weekly mixtape of fresh music.</p>
            </div>
          ))}
      </div>

    </div>
  );
};