import React, { useState, useEffect } from 'react';
import { Edit, Menu } from 'lucide-react';
import supabase from '@/lib/db';
import Sidebar from '@/components/SideBar';
import { useRouter } from 'next/router';

interface StatItem {
  key: string;
  value: number;
}

interface DashboardStatsState {
  pilarLazismu: number;
  totalHimpunan: number;
  targetHimpunan: number;
}

type DashboardStatKey =
  | 'pilar_lazismu'
  | 'total_himpunan'
  | 'target_himpunan';

const AdminDashboardStats: React.FC = () => {
  const formatNumberWithDots = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const [stats, setStats] = useState<DashboardStatsState>({
    pilarLazismu: 0,
    totalHimpunan: 0,
    targetHimpunan: 0
  });

  const [editingField, setEditingField] = useState<keyof DashboardStatsState | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [notification, setNotification] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin');
        return;
      }
      fetchStats();
    };
    checkUser();
  }, [router]);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('dashboard_stats')
        .select('key, value');

      if (error) {
        throw error;
      }

      const statsObject = (data as StatItem[]).reduce((acc, item) => {
        switch (item.key) {
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
      setNotification('Gagal mengambil statistik.');
    }
  };

  const updateStat = async (key: DashboardStatKey, value: number) => {
    try {
      const { error } = await supabase
        .from('dashboard_stats')
        .update({ value })
        .eq('key', key);

      if (error) {
        throw error;
      }

      setStats(prev => ({
        ...prev,
        ...(key === 'pilar_lazismu' ? { pilarLazismu: value } :
          key === 'total_himpunan' ? { totalHimpunan: value } :
            { targetHimpunan: value })
      }));

      setEditingField(null);
      setNotification('Statistik berhasil diperbarui!');
    } catch (err) {
      console.error('Error updating stat:', err);
      setNotification('Gagal memperbarui statistik.');
    } finally {
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleEditStart = (field: keyof DashboardStatsState) => {
    setEditingField(field);
    setEditValue(stats[field].toString());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: DashboardStatKey) => {
    if (e.key === 'Enter') {
      updateStat(field, Number(editValue));
    } else if (e.key === 'Escape') {
      setEditingField(null);
    }
  };

    const renderStatItem = (
    label: string,
    value: number,
    stateKey: keyof DashboardStatsState,
    isMonetary: boolean = false
  ) => {
    const isEditing = editingField === stateKey;

    return (
      <div className="bg-neutral-700 border border-neutral-600 rounded-lg p-4 md:ml-24 mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-neutral-300 text-sm">{label}</div>
          <button
            onClick={() => handleEditStart(stateKey)}
            className="text-neutral-300 hover:text-white"
          >
            <Edit size={16} />
          </button>
        </div>
        {isEditing ? (
          <div className="flex items-center bg-neutral-800 rounded">
            {isMonetary && <span className="pl-2 text-neutral-400">Rp</span>}
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => handleKeyDown(
                e,
                stateKey === 'pilarLazismu' ? 'pilar_lazismu' :
                  stateKey === 'totalHimpunan' ? 'total_himpunan' :
                    'target_himpunan'
              )}
              className="w-full bg-transparent text-white p-2 pl-0 text-center"
              autoFocus
            />
          </div>
        ) : (
          <div className="text-xl font-semibold text-white">
            {isMonetary
              ? `Rp ${formatNumberWithDots(value)}`
              : formatNumberWithDots(value)
            }
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 bg-black z-40 p-4 flex justify-between items-center">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-white"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold">Admin Dashboard Stats</h1>
        <div>{/* Placeholder for potential right-side actions */}</div>
      </div>

      {/* Main Content */}
      <div className="pt-20 px-4 pb-4">
        {notification && (
          <div className="bg-green-500 text-white p-2 rounded text-center mb-4">
            {notification}
          </div>
        )}

        <div className="space-y-4">
          {renderStatItem('Pilar Lazismu', stats.pilarLazismu, 'pilarLazismu')}
          {renderStatItem('Total Himpunan', stats.totalHimpunan, 'totalHimpunan', true)}
          {renderStatItem('Target Himpunan', stats.targetHimpunan, 'targetHimpunan', true)}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardStats;