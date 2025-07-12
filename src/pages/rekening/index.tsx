import React, { useState, useEffect } from 'react';
import { Copy, DollarSign, Heart, Users, BookOpen, Phone } from 'lucide-react';
import Image from 'next/image';
import HeroSection from '@/components/HeroSection';

// Types
interface BankAccount {
  id: number;
  bank: string;
  no_rekening: string;
  img: string;
  keterangan: string;
}

interface RekeningData {
  lazismu_zakat: BankAccount[];
  lazismu_infaq_sedekah: BankAccount[];
  lazismu_amil: BankAccount[];
  lazismu_bantuan_kemanusiaan: BankAccount[];
  lazismu_qurban: BankAccount[];
}

// Data
const rekeningData: RekeningData = {
  lazismu_zakat: [
    {
      id: 1,
      bank: 'Bank Muamalat',
      no_rekening: '4210655769',
      img: '/images/bank-muamalat.png',
      keterangan: 'Lazismu Sumbar Zakat',
    },
    {
      id: 4,
      bank: 'Bank Nagari Syariah',
      no_rekening: '71000210161016',
      img: '/images/bank-nagari.png',
      keterangan: 'Lazismu Sumbar Zakat',
    },
    {
      id: 7,
      bank: 'Bank Syariah Indonesia (BSI)',
      no_rekening: '7999095077',
      img: '/images/bank-bsi.png',
      keterangan: 'Lazismu Sumbar Zakat',
    },
    {
      id: 10,
      bank: 'Bank Syariah Bukopin',
      no_rekening: '7702061247',
      img: '/images/bank-bukopin.png',
      keterangan: 'Lazismu Wilayah Sumbar Zakat',
    }
  ],
  lazismu_infaq_sedekah: [
    {
      id: 2,
      bank: 'Bank Muamalat',
      no_rekening: '4210655770',
      img: '/images/bank-muamalat.png',
      keterangan: 'Lazismu Sumbar Infaq Sedekah',
    },
    {
      id: 5,
      bank: 'Bank Nagari Syariah',
      no_rekening: '7100021060666',
      img: '/images/bank-nagari.png',
      keterangan: 'Lazismu Sumbar Infaq Sedekah',
    },
    {
      id: 8,
      bank: 'Bank Mega Syariah',
      no_rekening: '2008742353',
      img: '/images/bank-mega.png',
      keterangan: 'Lazismu Sumbar Infaq Sedekah dan Kemanusiaan',
    },
    {
      id: 11,
      bank: 'Bank Syariah Bukopin',
      no_rekening: '7702061248',
      img: '/images/bank-bukopin.png',
      keterangan: 'Lazismu Wilayah Sumbar Infaq',
    }
  ],
  lazismu_amil: [
    {
      id: 3,
      bank: 'Bank Muamalat',
      no_rekening: '4210655780',
      img: '/images/bank-muamalat.png',
      keterangan: 'Lazismu Sumbar Amil',
    },
    {
      id: 6,
      bank: 'Bank Nagari Syariah',
      no_rekening: '7100021070700',
      img: '/images/bank-nagari.png',
      keterangan: 'Lazismu Sumbar Amil',
    },
    {
      id: 9,
      bank: 'Bank Syariah Indonesia (BSI)',
      no_rekening: '2009756077',
      img: '/images/bank-bsi.png',
      keterangan: 'Lazismu Sumbar Amil',
    },
    {
      id: 12,
      bank: 'Bank Syariah Bukopin',
      no_rekening: '7702061250',
      img: '/images/bank-bukopin.png',
      keterangan: 'Lazismu Wilayah Sumbar Amil',
    }
  ],
  lazismu_bantuan_kemanusiaan: [
    {
      id: 4,
      bank: 'Bank Nagari Syariah',
      no_rekening: '7100021090959',
      img: '/images/bank-nagari.png',
      keterangan: 'Lazismu Sumbar Bantuan Kemanusiaan',
    },
    {
      id: 8,
      bank: 'Bank Syariah Indonesia (BSI)',
      no_rekening: '2003193769',
      img: '/images/bank-bsi.png',
      keterangan: 'Lazismu Sumbar Bantuan Kemanusiaan',
    }
  ],
  lazismu_qurban: [
    {
      id: 5,
      bank: 'Bank Mega Syariah',
      no_rekening: '2009756077',
      img: '/images/bank-mega.png',
      keterangan: 'Lazismu Sumbar Qurban',
    },
    {
      id: 9,
      bank: 'Bank Syariah Indonesia (BSI)',
      no_rekening: '2003193984',
      img: '/images/bank-bsi.png',
      keterangan: 'Lazismu Sumbar Qurban',
    }
  ]
};

// Tab configurations
const tabConfigs = [
  { 
    id: 'lazismu_zakat', 
    label: 'Zakat', 
    icon: DollarSign,
    gradient: 'from-orange-500 to-amber-500',
    hoverColor: 'orange',
    badge: 'Rekening Zakat'
  },
  { 
    id: 'lazismu_infaq_sedekah', 
    label: 'Infaq & Sedekah', 
    icon: Heart,
    gradient: 'from-green-500 to-emerald-500',
    hoverColor: 'green',
    badge: 'Rekening Infaq'
  },
  { 
    id: 'lazismu_amil', 
    label: 'Amil', 
    icon: Users,
    gradient: 'from-blue-500 to-indigo-500',
    hoverColor: 'blue',
    badge: 'Rekening Amil'
  },
  { 
    id: 'lazismu_bantuan_kemanusiaan', 
    label: 'Bantuan Kemanusiaan', 
    icon: Heart,
    gradient: 'from-red-500 to-pink-500',
    hoverColor: 'red',
    badge: 'Rekening Bantuan'
  },
  { 
    id: 'lazismu_qurban', 
    label: 'Qurban', 
    icon: BookOpen,
    gradient: 'from-purple-500 to-violet-500',
    hoverColor: 'purple',
    badge: 'Rekening Qurban'
  }
];

const DaftarRekening: React.FC = () => {
  const [activeTab, setActiveTab] = useState('lazismu_zakat');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });

      // Highlight the section briefly
      section.classList.add('ring-4', 'ring-orange-300', 'ring-opacity-50');
      setTimeout(() => {
        section.classList.remove('ring-4', 'ring-orange-300', 'ring-opacity-50');
      }, 1000);
    }
    setActiveTab(sectionId);
  };

  const copyToClipboard = async (text: string, accountId: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback method
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      
      setCopiedAccount(accountId);
      setTimeout(() => setCopiedAccount(null), 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const renderAccountCard = (rekening: BankAccount, index: number, category: string, hoverColor: string) => {
    const accountId = `${category}_${index}`;
    const isCopied = copiedAccount === accountId;

    return (
      <div
        key={rekening.id}
        className={`bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-200 hover:border-${hoverColor}-200 ${isCopied ? 'ring-2 ring-green-300' : ''}`}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">{rekening.bank}</h3>
          <Image
            src={rekening.img}
            alt={rekening.bank}
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
        </div>
        <div className="p-5">
          <div className="flex items-start mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-600 text-sm flex-1">{rekening.keterangan}</p>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Nomor Rekening:</p>
              <div className="flex items-center">
                <span className={`font-mono font-medium text-gray-800 ${isCopied ? 'text-green-600' : ''}`}>
                  {rekening.no_rekening}
                </span>
                <button
                  onClick={() => copyToClipboard(rekening.no_rekening, accountId)}
                  className={`ml-2 p-1 rounded-full transition-colors ${isCopied ? `text-green-500 bg-green-50` : `text-gray-400 hover:text-${hoverColor}-500 hover:bg-${hoverColor}-50`}`}
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSection = (sectionId: keyof RekeningData, config: typeof tabConfigs[0]) => {
    const accounts = rekeningData[sectionId];
    const Icon = config.icon;

    return (
      <div id={sectionId} className="mb-12 rounded-xl overflow-hidden">
        <div className={`bg-gradient-to-r ${config.gradient} p-5 flex justify-between items-center`}>
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center">
            <Icon className="h-6 w-6 mr-2" />
            {sectionId === 'lazismu_bantuan_kemanusiaan' ? 'Bantuan Kemanusiaan / Palestina' : config.label}
          </h2>
          <span className="text-white/80 text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
            {config.badge}
          </span>
        </div>
        <div className="bg-gray-50 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accounts.map((rekening, index) => 
              renderAccountCard(rekening, index, sectionId, config.hoverColor)
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gray-50">
       <HeroSection
        title="Daftar Rekening"
        subtitle="Program donasi pilihan untuk kebaikan bersama"
        imageSrc="/images/logo-zis.png"
      />
      {/* Toast Notification */}
      {copiedAccount && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Nomor rekening berhasil disalin!
        </div>
      )}

      <div className="container mx-auto py-8">
        {/* Header Section */}
       

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3 mb-6 px-4">
            {tabConfigs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-5 py-2.5 rounded-lg font-medium shadow-sm transition duration-200 ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-4 md:mx-auto max-w-6xl">
          {tabConfigs.map((config) => 
            renderSection(config.id as keyof RekeningData, config)
          )}

          {/* Help Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 text-center">
            <div className="flex flex-col items-center">
              <Phone className="h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Butuh Bantuan?</h3>
              <p className="text-gray-600 mb-4 max-w-lg mx-auto">
                Jika Anda memiliki pertanyaan tentang donasi atau membutuhkan bantuan lebih lanjut, silakan hubungi kami.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://wa.me/082391707227"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Hubungi Kami
                </a>
                <a
                  href="https://wa.me/082391707227"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaftarRekening;