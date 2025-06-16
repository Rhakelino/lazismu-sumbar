import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface PendingDonationData {
  orderId: string;
  amount: string;
  status: string;
  donorName: string;
  programName: string;
  paymentType: string;
  timestamp: string;
}

const DonasiPending: React.FC = () => {
  const router = useRouter();
  const { orderId, amount, paymentType } = router.query;
  const [donationData, setDonationData] = useState<PendingDonationData | null>(null);

  useEffect(() => {
    if (orderId) {
      // Try to get donation data from localStorage
      const storedData = localStorage.getItem(`donation_${orderId}`);
      if (storedData) {
        setDonationData(JSON.parse(storedData));
      }
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

  // Get payment instructions based on payment type
  const getPaymentInstructions = (type: string): { title: string; instructions: string[] } => {
    switch (type.toLowerCase()) {
      case 'bank_transfer':
        return {
          title: 'Transfer Bank',
          instructions: [
            'Silakan transfer ke rekening bank yang tersedia',
            'Pembayaran akan diverifikasi secara otomatis',
            'Mohon transfer sesuai nominal yang tertera'
          ]
        };
      case 'gopay':
        return {
          title: 'Pembayaran GoPay',
          instructions: [
            'Buka aplikasi Gojek',
            'Pilih menu Pay',
            'Scan QR Code atau masukkan kode pembayaran',
            'Konfirmasi pembayaran'
          ]
        };
      case 'shopeepay':
        return {
          title: 'Pembayaran ShopeePay',
          instructions: [
            'Buka aplikasi Shopee',
            'Pilih menu ShopeePay',
            'Scan QR Code atau masukkan kode pembayaran',
            'Konfirmasi pembayaran'
          ]
        };
      default:
        return {
          title: 'Pembayaran',
          instructions: [
            'Silakan selesaikan pembayaran sesuai metode yang dipilih',
            'Pembayaran akan diverifikasi secara otomatis',
            'Mohon transfer sesuai nominal yang tertera'
          ]
        };
    }
  };

  const paymentInfo = donationData ? getPaymentInstructions(donationData.paymentType) : null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="p-6">
          {/* Pending Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
            <svg
              className="h-10 w-10 text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Pending Message */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Pembayaran Pending
            </h2>
            <p className="text-gray-600">
              Silakan selesaikan pembayaran Anda sesuai dengan instruksi di bawah ini.
            </p>
          </div>

          {/* Donation Details */}
          {donationData && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
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
                    {formatCurrency(donationData.amount)}
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
                  <dd className="font-medium text-yellow-600">Menunggu Pembayaran</dd>
                </div>
              </dl>
            </div>
          )}

          {/* Payment Instructions */}
          {paymentInfo && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {paymentInfo.title}
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                {paymentInfo.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Important Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-yellow-800 mb-2">Catatan Penting:</h4>
            <ul className="list-disc list-inside space-y-1 text-yellow-700 text-sm">
              <li>Pembayaran akan kadaluarsa dalam 24 jam</li>
              <li>Pastikan nominal transfer sesuai</li>
              <li>Simpan bukti pembayaran Anda</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link href="/program">
              <span className="block w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors text-center">
                Kembali ke Program
              </span>
            </Link>
            <button
              onClick={() => window.print()}
              className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cetak Instruksi Pembayaran
            </button>
          </div>

          {/* Help Section */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-2">
              Butuh bantuan? Hubungi kami di:
            </p>
            <a
              href="https://wa.me/082391707227"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-orange-500 hover:text-orange-600"
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              WhatsApp Support
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DonasiPending; 