import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { generateTourInsights } from '../services/geminiService';
import { Users, MapPin, TrendingUp, Music } from './Icons';

// Mock Data
const cityData = [
  { name: 'Bangalore', demand: 4000, capacity: 2500 },
  { name: 'Mumbai', demand: 3000, capacity: 3000 },
  { name: 'Delhi', demand: 2000, capacity: 5000 },
  { name: 'Pune', demand: 2780, capacity: 2000 },
];

export const Dashboard: React.FC = () => {
  const [insights, setInsights] = useState<string[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(false);

  const fetchInsights = async () => {
    setLoadingInsights(true);
    const result = await generateTourInsights('The Midnight Echo', cityData);
    setInsights(result);
    setLoadingInsights(false);
  };

  useEffect(() => {
    // Simulate initial fetch
    // fetchInsights(); 
  }, []);

  return (
    <div className="min-h-screen bg-[#090909] text-white p-6 md:p-10 ml-0 md:ml-[240px]">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Tour OS</h1>
          <p className="text-gray-400">Artist: The Midnight Echo</p>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-md font-bold text-sm hover:bg-gray-200">
          Manage Tour
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Stats Cards */}
        <div className="bg-[#121212] p-6 rounded-lg border border-white/5">
           <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-400 font-medium">Total Sales</h3>
              <TrendingUp className="text-spotify-green w-5 h-5" />
           </div>
           <div className="text-3xl font-bold mb-1">₹4.2M</div>
           <div className="text-sm text-spotify-green">+12% vs last tour</div>
        </div>
        <div className="bg-[#121212] p-6 rounded-lg border border-white/5">
           <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-400 font-medium">Ticket Velocity</h3>
              <Users className="text-blue-400 w-5 h-5" />
           </div>
           <div className="text-3xl font-bold mb-1">84 tix/hr</div>
           <div className="text-sm text-gray-400">Peak: 120 tix/hr</div>
        </div>
        <div className="bg-[#121212] p-6 rounded-lg border border-white/5">
           <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-400 font-medium">Top City</h3>
              <MapPin className="text-red-400 w-5 h-5" />
           </div>
           <div className="text-3xl font-bold mb-1">Bangalore</div>
           <div className="text-sm text-gray-400">98% Sold Out</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-[#121212] p-6 rounded-lg border border-white/5">
          <h3 className="font-bold mb-6">Demand vs Capacity</h3>
          <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#181818', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="demand" fill="#1DB954" radius={[4, 4, 0, 0]} name="Demand" />
                  <Bar dataKey="capacity" fill="#333" radius={[4, 4, 0, 0]} name="Venue Capacity" />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Gemini Insights */}
        <div className="bg-[#121212] p-6 rounded-lg border border-white/5 flex flex-col">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
               <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">AI</span>
               </div>
               <h3 className="font-bold">Tour Intelligence</h3>
             </div>
             <button 
                onClick={fetchInsights} 
                className="text-xs text-spotify-green hover:underline disabled:opacity-50"
                disabled={loadingInsights}
             >
               {loadingInsights ? 'Analyzing...' : 'Refresh Insights'}
             </button>
           </div>

           <div className="flex-1 bg-[#181818] rounded p-4 space-y-3 overflow-y-auto">
              {insights.length === 0 && !loadingInsights && (
                 <div className="text-center text-gray-500 mt-10">
                    Click refresh to analyze your tour data using Gemini.
                 </div>
              )}
              {loadingInsights && (
                <div className="animate-pulse space-y-3">
                   <div className="h-4 bg-white/10 rounded w-3/4"></div>
                   <div className="h-4 bg-white/10 rounded w-1/2"></div>
                   <div className="h-4 bg-white/10 rounded w-5/6"></div>
                </div>
              )}
              {insights.map((insight, idx) => (
                <div key={idx} className="flex gap-3 items-start text-sm text-gray-300 border-b border-white/5 pb-2 last:border-0">
                   <span className="text-spotify-green mt-1">•</span>
                   <p>{insight}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};