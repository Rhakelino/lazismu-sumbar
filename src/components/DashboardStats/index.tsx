import React, { useState, useEffect } from 'react';
import supabase from '@/lib/db';

interface StatItem {
  key: string;
  value: number;
}

interface DashboardStatsState {
  pilarLazismu: number;
  totalHimpunan: number;
  targetHimpunan: number;
}

const AdminDashboardStats: React.FC = () => {
  const formatNumberWithDots = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const [stats, setStats] = useState<DashboardStatsState>({
    pilarLazismu: 0,
    totalHimpunan: 0,
    targetHimpunan: 0
  });

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('dashboard_stats')
        .select('key, value');

      if (error) {
        throw error;
      }

      const statsObject = (data as StatItem[]).reduce((acc, item) => {
        switch(item.key) {
          case 'pilar_lazismu':
            acc.pilarLazismu = item.value;
            break;
          case 'total_himpunan':
            acc.totalHimpunan = item.value;
            break;
          case 'target_himpunan':
            acc.targetHimpunan = item.value;
            break;
        }
        return acc;
      }, {
        pilarLazismu: 0,
        totalHimpunan: 0,
        targetHimpunan: 0
      });

      setStats(statsObject);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="relative mt-[-40px] z-10 bg-orange-600 text-white mx-4 sm:mx-0 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 rounded-2xl shadow-lg">
      <div className="bg-orange-500/30 rounded-xl p-3 sm:p-4 text-center transition-all duration-300 hover:bg-orange-500/40 hover:scale-[1.02]">
        <h3 className="text-sm sm:text-base font-medium text-white/90 mb-1 sm:mb-2">
          Pilar Lazismu
        </h3>
        <p className="text-xl sm:text-3xl font-bold text-white">
          {stats.pilarLazismu}
        </p>
      </div>
      <div className="bg-orange-500/30 rounded-xl p-3 sm:p-4 text-center transition-all duration-300 hover:bg-orange-500/40 hover:scale-[1.02]">
        <h3 className="text-sm sm:text-base font-medium text-white/90 mb-1 sm:mb-2">
          Total Himpunan
        </h3>
        <p className="text-xl sm:text-3xl font-bold text-white">
          Rp {formatNumberWithDots(stats.totalHimpunan)}
        </p>
      </div>
      <div className="bg-orange-500/30 rounded-xl p-3 sm:p-4 text-center transition-all duration-300 hover:bg-orange-500/40 hover:scale-[1.02]">
        <h3 className="text-sm sm:text-base font-medium text-white/90 mb-1 sm:mb-2">
          Target Himpunan
        </h3>
        <p className="text-xl sm:text-3xl font-bold text-white">
          Rp {formatNumberWithDots(stats.targetHimpunan)}
        </p>
      </div>
    </div>
  );
};

export default AdminDashboardStats;