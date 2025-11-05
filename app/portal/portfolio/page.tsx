'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generateMockData } from './interface/portfolioData';
import { PortfolioHeader } from './components/portfolioHeader';
import { KpiCards } from './components/keepcard';
import { TradesTable } from './components/TradesTable';


export default function PortfolioPage() {
  const router = useRouter();
  const [data] = useState(generateMockData());
  const [showValues, setShowValues] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if broker is connected
    const brokerConnected = localStorage.getItem('brokerConnected') === 'true';
    
    if (!brokerConnected) {
      router.push('/portal/dashboard');
      return;
    }
    
    setIsConnected(true);
  }, [router]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <PortfolioHeader
          title={data.header.title}
          subtitle={data.header.subtitle}
          duration={data.header.duration}
          showValues={showValues}
          setShowValues={setShowValues}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />

        <KpiCards kpis={data.kpis} />

        <TradesTable trades={data.trades} />
      </div>
    </div>
  );
}