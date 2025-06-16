import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface DonationData {
  orderId: string;
  amount: string;
  status: string;
  donorName: string;
  programName: string;
  timestamp: string;
  paymentType?: string;
  transactionTime?: string;
}

const DonasiSukses: React.FC = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [donationData, setDonationData] = useState<DonationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      // Get donation data from localStorage
      const storedData = localStorage.getItem(`donation_${orderId}`);
      if (storedData) {
        setDonationData(JSON.parse(storedData));
      }
      setLoading(false);
    }
  }, [orderId]);

  // Format currency
  const formatCurrency = (amount: string): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(parseInt(amount));
  };

  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format payment type
  const formatPaymentType = (type?: string): string => {
    if (!type) return '-';
    const types: { [key: string]: string } = {
      'bank_transfer': 'Transfer Bank',
      'gopay': 'GoPay',
      'qris': 'QRIS',
      'credit_card': 'Kartu Kredit'
    };
    return types[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!donationData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Donasi Tidak Ditemukan</h2>
          <Link href="/">
            <span className="text-orange-500 hover:text-orange-600">Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="p-6 text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg
              className="h-10 w-10 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Donasi Berhasil!
          </h2>
          <p className="text-gray-600 mb-6">
            Terima kasih atas donasi Anda. Semoga kebaikan ini menjadi amal jariyah
            dan bermanfaat bagi yang membutuhkan.
          </p>

          {/* Donation Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Detail Donasi
            </h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-600">Program</dt>
                <dd className="font-medium text-gray-900">
                  {donationData.programName}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Nominal</dt>
                <dd className="font-medium text-gray-900">
                  {donationData.amount}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Tanggal</dt>
                <dd className="font-medium text-gray-900">
                  {formatDate(donationData.timestamp)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Status</dt>
                <dd className="font-medium text-green-600">Berhasil</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Metode Pembayaran</dt>
                <dd className="font-medium text-gray-900">
                  {formatPaymentType(donationData.paymentType)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Order ID</dt>
                <dd className="font-medium text-gray-900">
                  {donationData.orderId}
                </dd>
              </div>
            </dl>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <Link href="/program">
              <span className="block w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                Kembali ke Program
              </span>
            </Link>
            <button
              onClick={() => window.print()}
              className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cetak Bukti Donasi
            </button>
          </div>

          {/* Additional Information */}
          <div className="mt-6 text-sm text-gray-500">
            <p>
              Bukti donasi telah dikirim ke email Anda (jika email diisi).
              Silakan simpan bukti ini sebagai referensi.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DonasiSukses;