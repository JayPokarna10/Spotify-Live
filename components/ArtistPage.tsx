import React, { useState } from 'react';
import { Artist, Event } from '../types';
import { CheckCircle2, Play, Heart, MoreHorizontal, Bell, Ticket } from './Icons';

interface ArtistPageProps {
  artist: Artist;
  onViewEvent: (e: Event) => void;
  onJoinBackstage: () => void;
}

export const ArtistPage: React.FC<ArtistPageProps> = ({ artist, onViewEvent, onJoinBackstage }) => {
  const [following, setFollowing] = useState(false);
  const [notifying, setNotifying] = useState(false);

  return (
    <div className="pb-24 bg-spotify-base min-h-screen relative">
      {/* Header Image Background */}
      <div 
        className="h-[40vh] w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${artist.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-spotify-base" />
        <div className="absolute bottom-6 left-4 md:left-8">
          <div className="flex items-center gap-2 text-white mb-2">
             <CheckCircle2 className="w-5 h-5 fill-blue-500 text-white" />
             <span className="text-sm">Verified Artist</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">{artist.name}</h1>
          <p className="text-white/90 text-base">{artist.listeners} monthly listeners</p>
        </div>
      </div>

      <div className="px-4 md:px-8 relative z-10">
        {/* Controls */}
        <div className="flex items-center gap-4 mb-8">
          <button className="w-14 h-14 bg-spotify-green rounded-full flex items-center justify-center hover:scale-105 transition">
            <Play className="w-6 h-6 text-black fill-black pl-1" />
          </button>
          <button 
            onClick={() => setFollowing(!following)}
            className={`px-6 py-1.5 border border-gray-500 rounded-full text-sm font-bold hover:border-white transition ${following ? 'text-spotify-green border-spotify-green' : 'text-white'}`}
          >
            {following ? 'FOLLOWING' : 'FOLLOW'}
          </button>
          <MoreHorizontal className="text-gray-400 w-8 h-8" />
        </div>

        {/* TOUR BANNER */}
        <div className="bg-gradient-to-r from-emerald-900/80 to-gray-900/80 border border-white/10 rounded-xl p-4 md:p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between group cursor-pointer hover:border-white/20 transition">
           <div className="mb-4 md:mb-0">
             <div className="flex items-center gap-2 mb-1">
                <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">On Tour</span>
                <span className="text-spotify-text text-xs">Recommended for you</span>
             </div>
             <h2 className="text-xl font-bold text-white mb-1">Live in Bangalore</h2>
             <p className="text-spotify-text text-sm">Sat, Nov 12 • Manpho Convention Center</p>
           </div>
           <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
                <p className="text-white font-bold">From ₹2,500</p>
                <p className="text-xs text-spotify-text">Selling fast</p>
             </div>
             <button 
               onClick={() => onViewEvent(artist.upcomingShows[0])}
               className="bg-white text-black font-bold px-6 py-3 rounded-full text-sm hover:scale-105 transition w-full md:w-auto"
             >
               Get tickets
             </button>
           </div>
        </div>

        {/* BACKSTAGE PASS MEMBERSHIP */}
        <div className="mb-8">
          <div className="bg-[#1e1e1e] rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="bg-purple-600/20 p-4 rounded-lg text-purple-400">
               <Ticket className="w-8 h-8" />
            </div>
            <div className="flex-1">
               <h3 className="text-white font-bold text-lg mb-1">{artist.name} Backstage</h3>
               <p className="text-spotify-text text-sm mb-2">Join the inner circle for early access to tickets, exclusive merch drops, and members-only livestreams.</p>
               <div className="flex gap-2 text-xs font-medium text-white/60">
                 <span className="bg-white/5 px-2 py-1 rounded">Exclusive Audio</span>
                 <span className="bg-white/5 px-2 py-1 rounded">Presale Access</span>
               </div>
            </div>
            <div className="flex flex-col items-end gap-2 w-full md:w-auto">
               <span className="text-white font-bold">₹299/mo</span>
               <button onClick={onJoinBackstage} className="w-full md:w-auto border border-white/30 hover:border-white text-white font-bold px-6 py-2 rounded-full text-sm transition">
                 Join Backstage
               </button>
            </div>
          </div>
        </div>

        {/* LIVE SECTION */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-xl font-bold text-white">Upcoming Shows</h2>
             
             {/* Never Miss Toggle */}
             <button 
               onClick={() => setNotifying(!notifying)}
               className={`flex items-center gap-2 text-sm font-bold transition ${notifying ? 'text-spotify-green' : 'text-spotify-text hover:text-white'}`}
             >
               <Bell className={`w-4 h-4 ${notifying ? 'fill-current' : ''}`} />
               {notifying ? 'Notifications On' : 'Never miss a show'}
             </button>
          </div>
          
          <div className="space-y-2">
            {artist.upcomingShows.map((show, idx) => (
              <div 
                key={show.id}
                onClick={() => onViewEvent(show)}
                className="flex items-center group hover:bg-white/10 p-3 rounded-md cursor-pointer transition"
              >
                <div className="w-12 text-center mr-4">
                   <div className="text-sm font-bold text-white">{show.date.split(' ')[0]}</div>
                   <div className="text-xs text-spotify-text uppercase">{show.date.split(' ')[1]}</div>
                </div>
                <div className="flex-1">
                   <div className="text-white font-bold group-hover:underline">{show.venue}</div>
                   <div className="text-sm text-spotify-text">{show.city}</div>
                </div>
                <div className="text-sm text-white font-medium hidden md:block mr-4">
                   {show.date.split(',')[1]}
                </div>
                <button className="text-white text-sm font-bold border border-white/30 px-4 py-1.5 rounded-full hover:border-white hover:scale-105 transition">
                  See Tickets
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};