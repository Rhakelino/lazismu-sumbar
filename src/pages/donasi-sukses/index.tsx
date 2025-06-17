import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface DonationData {
  orderId: string;
  amount: string;
  donorName: string;
  programName?: string;
  paymentType?: string;
  transactionTime?: string;
  timestamp?: string;
}

const DonasiSukses: React.FC = () => {
  const router = useRouter();
  const { orderId, amount, donorName } = router.query;
  const [donationData, setDonationData] = useState<DonationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🎉 Success page loaded with params:', { orderId, amount, donorName });
    
    // Get donation data from localStorage or query params
    if (orderId) {
      const storedData = localStorage.getItem(`donation_${orderId}`);
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          console.log('💾 Found stored donation data:', parsedData);
          setDonationData(parsedData);
        } catch (error) {
          console.error('❌ Error parsing stored donation data:', error);
        }
      }
      
      // Fallback to query params if no stored data
      if (!donationData && orderId && amount && donorName) {
        console.log('📋 Using query params as fallback');
        setDonationData({
          orderId: orderId as string,
          amount: amount as string,
          donorName: donorName as string,
          programName: (router.query.programName as string) || undefined
        });
      }
    }
    
    setLoading(false);
  }, [orderId, amount, donorName, donationData]);

  // Format currency
  const formatCurrency = (amount: string | number): string => {
    const numAmount = typeof amount === 'string' ? parseInt(amount.replace(/[^\d]/g, '')) : amount;
    if (isNaN(numAmount)) return 'Rp 0';
    
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numAmount);
  };

  // Format date
  const formatDate = (dateString?: string): string => {
    if (!dateString) return new Date().toLocaleString('id-ID');
    
    try {
      return new Date(dateString).toLocaleString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return new Date().toLocaleString('id-ID');
    }
  };

  const handleDonateAgain = () => {
    console.log('🔄 Redirecting to donate again');
    router.push('/');
  };

  const handleBackToHome = () => {
    console.log('🏠 Redirecting to home');
    router.push('/');
  };

  const handleShareDonation = async () => {
    const shareText = `Alhamdulillah, saya telah berdonasi sebesar ${donationData?.amount || formatCurrency(amount as string)} untuk ${donationData?.programName || 'program donasi'}. Mari berbagi kebaikan! 🤲`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Donasi Berhasil',
          text: shareText,
          url: window.location.origin
        });
        console.log('✅ Successfully shared via Web Share API');
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareText);
        alert('Pesan berhasil disalin ke clipboard!');
        console.log('📋 Text copied to clipboard');
      }
    } catch (error) {
      console.error('❌ Error sharing:', error);
      // Final fallback
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Pesan berhasil disalin!');
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F6FA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data donasi...</p>
        </div>
      </div>
    );
  }

  if (!orderId || (!donationData && !amount)) {
    return (
      <div className="min-h-screen bg-[#F4F6FA] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Data Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">Data donasi tidak dapat ditemukan atau telah kadaluarsa.</p>
          <button
            onClick={handleBackToHome}
            className="w-full py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  // Use stored data if available, otherwise use query params
  const displayData = donationData || {
    orderId: orderId as string,
    amount: amount as string,
    donorName: donorName as string
  };

  return (
    <>
      <Head>
        <title>Donasi Berhasil - Terima Kasih</title>
        <meta name="description" content="Terima kasih atas donasi Anda. Semoga menjadi amal jariyah yang berkah." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="min-h-screen bg-[#F4F6FA] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Success Header */}
          <div className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 p-8 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", duration: 0.5 }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 relative z-10"
            >
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative z-10"
            >
              <h1 className="text-2xl font-bold text-white mb-2">Alhamdulillah!</h1>
              <p className="text-green-100">Donasi Anda telah berhasil diproses</p>
            </motion.div>
          </div>

          {/* Donation Details */}
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-gray-50 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <h3 className="font-semibold text-gray-800">Detail Donasi</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Order ID:</span>
                  <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">{displayData.orderId}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Jumlah:</span>
                  <span className="font-bold text-lg text-orange-600">
                    {displayData.amount.startsWith('Rp') ? displayData.amount : formatCurrency(displayData.amount)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Donatur:</span>
                  <span className="font-medium text-gray-800">{displayData.donorName}</span>
                </div>
                
                {displayData.programName && (
                  <div className="flex justify-between items-start">
                    <span className="text-gray-500">Program:</span>
                    <span className="font-medium text-gray-800 text-right max-w-48">{displayData.programName}</span>
                  </div>
                )}
                
                {displayData.paymentType && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Metode:</span>
                    <span className="font-medium text-gray-800 capitalize">
                      {displayData.paymentType.replace('_', ' ')}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Waktu:</span>
                  <span className="font-medium text-gray-800 text-right">
                    {formatDate(displayData.transactionTime || displayData.timestamp)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Appreciation Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <div className="text-2xl mb-2">🤲</div>
              <p className="text-gray-700 text-sm leading-relaxed mb-2">
                <strong>Barakallahu fiikum!</strong>
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Semoga donasi Anda menjadi amal jariyah yang berkah dan bermanfaat untuk sesama. 
                Terima kasih atas kebaikan hati Anda.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-3"
            >
              {/* Primary Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleShareDonation}
                  className="py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                  </svg>
                  Bagikan
                </button>
                
                <button
                  onClick={handlePrintReceipt}
                  className="py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                  </svg>
                  Cetak
                </button>
              </div>
              
              {/* Secondary Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleDonateAgain}
                  className="py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm"
                >
                  Donasi Lagi
                </button>
                <button
                  onClick={handleBackToHome}
                  className="py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm"
                >
                  Beranda
                </button>
              </div>
            </motion.div>

            {/* Footer Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6 p-3 bg-gray-50 rounded-lg border-l-4 border-orange-500"
            >
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Catatan:</strong> Bukti donasi ini telah tersimpan di perangkat Anda. 
                Jika Anda memerlukan kwitansi resmi, silakan hubungi tim kami.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default DonasiSukses;