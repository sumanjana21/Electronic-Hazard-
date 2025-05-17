// app/dashboard/hooks/useDashboardData.ts
import { useState, useEffect } from 'react';
import { DashboardStats, Pickup } from '../types/dashboard.types';

export const useDashboardData = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPickups: 15,
    totalEarnings: 1250.75,
    pendingPickups: 3,
    completedPickups: 12
  });
  const [pickups, setPickups] = useState<Pickup[]>([
    {
      id: '1',
      date: new Date().toISOString(),
      status: 'pending',
      items: ['Laptop', 'Mobile Phone'],
      estimatedValue: 250.50
    }
  ]);
  const [loading, setLoading] = useState(false);

  // Simulate data fetching - replace with actual API call
  useEffect(() => {
    // Fetch logic would go here
  }, []);

  return { stats, pickups, loading };
};