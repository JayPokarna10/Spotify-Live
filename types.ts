export interface Artist {
  id: string;
  name: string;
  image: string;
  listeners: string;
  isTouring: boolean;
  upcomingShows: Event[];
}

export interface Event {
  id: string;
  artistName: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  price: {
    min: number;
    max: number;
    currency: string;
  };
  image: string;
  status: 'selling_fast' | 'available' | 'sold_out';
}

export interface Ticket {
  id: string;
  eventId: string;
  seat: string;
  section: string;
  qrCode: string;
  purchaseDate: string;
}

export type ViewState = 
  | 'home' 
  | 'artist' 
  | 'event_detail' 
  | 'checkout' 
  | 'wallet' 
  | 'dashboard'
  | 'backstage';
