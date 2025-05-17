// app/dashboard/types/dashboard.types.ts
export interface DashboardStats {
    totalPickups: number;
    totalEarnings: number;
    pendingPickups: number;
    completedPickups: number;
  }
  
  export interface Pickup {
    id: string;
    date: string;
    status: 'pending' | 'completed' | 'cancelled';
    items: string[];
    estimatedValue: number;
  }