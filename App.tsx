import React, { useState } from 'react';
import { HomeView } from './components/Home';
import { ArtistPage } from './components/ArtistPage';
import { EventDetail } from './components/EventDetail';
import { Checkout } from './components/Checkout';
import { TicketWallet } from './components/TicketWallet';
import { Dashboard } from './components/Dashboard';
import { Home, Search, Library, Ticket, BarChart3 } from './components/Icons';
import { Artist, Event, ViewState } from './types';

// Mock Data Setup
const mockEvent: Event = {
  id: 'e1',
  artistName: 'The Midnight Echo',
  venue: 'Manpho Convention Center',
  city: 'Bangalore',
  date: 'Sat, Nov 12',
  time: '8:00 PM',
  price: { min: 2500, max: 5000, currency: '₹' },
  image: 'https://picsum.photos/800/600?random=10',
  status: 'selling_fast'
};

const mockArtist: Artist = {
  id: 'a1',
  name: 'The Midnight Echo',
  image: 'https://picsum.photos/1200/800?random=5',
  listeners: '2.4M',
  isTouring: true,
  upcomingShows: [mockEvent]
};

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [purchasedEvents, setPurchasedEvents] = useState<Event[]>([]);

  // Navigation Handlers
  const goHome = () => setView('home');
  const goToArtist = () => setView('artist');
  const goToWallet = () => setView('wallet');
  const goToDashboard = () => setView('dashboard');
  
  const handleEventClick = (e: Event) => {
    setSelectedEvent(e);
    setView('event_detail');
  };

  const startCheckout = () => {
    setView('checkout');
  };

  const completeCheckout = () => {
    if (selectedEvent) {
      setPurchasedEvents([...purchasedEvents, selectedEvent]);
    }
    setView('wallet');
  };

  // View Routing
  const renderView = () => {
    switch (view) {
      case 'home':
        return <HomeView events={[mockEvent, {...mockEvent, id: 'e2', artistName: 'Divine', city: 'Mumbai', image: 'https://picsum.photos/800/600?random=12'}]} onEventClick={handleEventClick} />;
      case 'artist':
        return <ArtistPage artist={mockArtist} onViewEvent={handleEventClick} onJoinBackstage={() => alert("Joined backstage!")} />;
      case 'event_detail':
        return selectedEvent ? <EventDetail event={selectedEvent} onBuyTickets={startCheckout} onBack={goHome} /> : <HomeView events={[mockEvent]} onEventClick={handleEventClick} />;
      case 'checkout':
        return selectedEvent ? <Checkout event={selectedEvent} onComplete={completeCheckout} onCancel={() => setView('event_detail')} /> : null;
      case 'wallet':
        return <TicketWallet purchasedEvents={purchasedEvents} />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <HomeView events={[mockEvent]} onEventClick={handleEventClick} />;
    }
  };

  // Navigation Bar Components
  const NavItem = ({ icon: Icon, label, active, onClick }: any) => (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 ${active ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
      <Icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} />
      <span className="text-[10px]">{label}</span>
    </button>
  );

  const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
    <button onClick={onClick} className={`flex items-center gap-4 px-6 py-3 w-full font-bold transition ${active ? 'text-white border-l-4 border-spotify-green bg-white/5' : 'text-gray-400 hover:text-white'}`}>
      <Icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="bg-black text-white min-h-screen flex">
      
      {/* Desktop Sidebar (Hidden on Mobile) */}
      {view !== 'dashboard' && (
        <div className="hidden md:flex w-[240px] flex-col bg-black h-screen fixed left-0 top-0 pt-6 border-r border-white/5 z-50">
          <div className="px-6 mb-8">
            <div className="flex items-center gap-2 text-white font-bold text-2xl tracking-tight">
               <div className="w-8 h-8 bg-spotify-green rounded-full"></div> Spotify Live
            </div>
          </div>
          <div className="flex-1">
             <SidebarItem icon={Home} label="Home" active={view === 'home'} onClick={goHome} />
             <SidebarItem icon={Search} label="Search" active={false} onClick={() => {}} />
             <SidebarItem icon={Library} label="Your Library" active={false} onClick={() => {}} />
             <div className="mt-6 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Live</div>
             <SidebarItem icon={Ticket} label="Your Tickets" active={view === 'wallet'} onClick={goToWallet} />
             <SidebarItem icon={BarChart3} label="Artist Dashboard" active={view === 'dashboard'} onClick={goToDashboard} />
          </div>
          <div className="px-6 pb-6">
             <div onClick={goToArtist} className="border-t border-white/10 pt-4 cursor-pointer hover:opacity-80 transition">
               <div className="text-xs text-gray-400 mb-2">Currently viewing as</div>
               <div className="flex items-center gap-3">
                  <img src={mockArtist.image} className="w-8 h-8 rounded-full object-cover" />
                  <span className="font-bold text-sm text-white truncate">{mockArtist.name}</span>
               </div>
             </div>
          </div>
        </div>
      )}

      {/* Mobile Viewport / Main Content */}
      <main className={`flex-1 relative ${view === 'dashboard' ? '' : 'md:ml-[240px]'}`}>
        {renderView()}
      </main>

      {/* Mobile Bottom Nav (Hidden on Desktop) */}
      {view !== 'dashboard' && view !== 'checkout' && (
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-black to-black/95 backdrop-blur-md border-t border-white/10 py-3 px-6 flex justify-between md:hidden z-50">
          <NavItem icon={Home} label="Home" active={view === 'home'} onClick={goHome} />
          <NavItem icon={Search} label="Search" active={false} onClick={() => {}} />
          <NavItem icon={Ticket} label="Live" active={view === 'wallet' || view === 'artist'} onClick={goToWallet} />
          <NavItem icon={Library} label="Library" active={false} onClick={() => {}} />
        </div>
      )}

      {/* Floating Dashboard Exit Button */}
      {view === 'dashboard' && (
        <button onClick={goHome} className="fixed bottom-6 left-6 bg-[#1DB954] text-black font-bold px-4 py-2 rounded-full shadow-lg z-50 hover:scale-105 transition">
          Exit Tour OS
        </button>
      )}
    </div>
  );
}