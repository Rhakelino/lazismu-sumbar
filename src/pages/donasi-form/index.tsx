import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { Switch } from '@headlessui/react';
import Image from 'next/image';

// Define types for Midtrans Snap
declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          onSuccess: (result: MidtransResult) => void;
          onPending: (result: MidtransResult) => void;
          onError: (result: MidtransResult) => void;
          onClose: () => void;
        }
      ) => void;
    };
  }
}

// Define types
interface DonationOption {
  value: number;
  label: string;
}

interface MidtransResult {
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status?: string;
  status_code: string;
  status_message: string;
}

interface TransactionResponse {
  token?: {
    token: string;
    redirect_url: string;
  };
  orderId?: string;
  error?: string;
}

interface FormErrors {
  amount?: string;
  name?: string;
  email?: string;
  phone?: string;
  general?: string;
}

// Validation constants
const MIN_DONATION = 10000;
const MAX_DONATION = 100000000;

const DonationForm: React.FC = () => {
  const router = useRouter();
  const { programSlug, programName, programImage } = router.query;
  const customAmountInputRef = useRef<HTMLInputElement>(null);
  const [midtransLoaded, setMidtransLoaded] = useState(false);

  // Form state
  const [donationAmount, setDonationAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [salutation, setSalutation] = useState<'Bapak' | 'Ibu' | 'Kak'>('Bapak');
  const [hideName, setHideName] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  // Focus on custom amount input when showCustomAmount changes
  useEffect(() => {
    if (showCustomAmount && customAmountInputRef.current) {
      customAmountInputRef.current.focus();
    }
  }, [showCustomAmount]);

  // Donation options
  const donationOptions: DonationOption[] = [
    { value: 10000, label: 'Rp 10.000' },
    { value: 25000, label: 'Rp 25.000' },
    { value: 50000, label: 'Rp 50.000' },
    { value: 100000, label: 'Rp 100.000' }
  ];

  const paymentOptions = [
    { value: '', label: 'Pilih Metode Pembayaran' },
    { value: 'bank_transfer', label: 'Transfer Bank' },
    { value: 'gopay', label: 'GoPay' },
    { value: 'qris', label: 'QRIS' },
  ];

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate amount
    const amount = customAmount ? parseInt(customAmount) : donationAmount;
    if (!amount || amount < MIN_DONATION) {
      newErrors.amount = `Minimal donasi Rp ${MIN_DONATION.toLocaleString('id-ID')}`;
    } else if (amount > MAX_DONATION) {
      newErrors.amount = `Maksimal donasi Rp ${MAX_DONATION.toLocaleString('id-ID')}`;
    }

    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Nama lengkap minimal 3 karakter';
    }

    // Validate email if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Format email tidak valid';
    }

    // Validate phone if provided
    if (phone && !/^[0-9+\-\s()]{10,15}$/.test(phone)) {
      newErrors.phone = 'Format nomor telepon tidak valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Handle payment
  const handlePayment = async (): Promise<void> => {
    if (!validateForm()) return;

    // Check if Midtrans is loaded
    if (!midtransLoaded || typeof window.snap === 'undefined') {
      setErrors({
        general: 'Layanan pembayaran belum siap. Mohon tunggu sebentar dan coba lagi.'
      });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const amount = customAmount ? parseInt(customAmount) : donationAmount;
      if (!amount) throw new Error('Invalid amount');

      // Create transaction
      const response = await fetch('/api/create-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          programName: programName || 'Donasi Umum',
          donorName: hideName ? 'Hamba Allah' : name,
          donorEmail: email || undefined,
          donorPhone: phone || undefined,
          message: message || undefined
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal membuat transaksi');
      }

      const data: TransactionResponse = await response.json();

      if (!data.token?.token) {
        throw new Error('Token pembayaran tidak ditemukan');
      }

      console.log('Opening payment window with token:', data.token.token);

      // Open Midtrans Snap payment page
      window.snap.pay(data.token.token, {
        onSuccess: (result: MidtransResult) => {
          console.log('🎉 Payment success!', result);
          // Store transaction data in localStorage for reference
          localStorage.setItem(`donation_${result.order_id}`, JSON.stringify({
            orderId: result.order_id,
            amount: result.gross_amount,
            status: 'success',
            donorName: hideName ? 'Hamba Allah' : name,
            programName: programName,
            timestamp: new Date().toISOString()
          }));

          // Try both navigation methods for reliability
          try {
            router.push({
              pathname: '/donasi-sukses',
              query: {
                orderId: result.order_id,
                amount: result.gross_amount,
                donorName: hideName ? 'Hamba Allah' : name
              }
            });
          } catch (error) {
            console.error('Navigation error:', error);
            // Fallback to basic navigation
            window.location.href = `/donasi-sukses?orderId=${result.order_id}&amount=${result.gross_amount}&donorName=${encodeURIComponent(hideName ? 'Hamba Allah' : name)}`;
          }
        },
        onPending: (result: MidtransResult) => {
          console.log('Payment pending:', result);
          // Store pending transaction data
          localStorage.setItem(`donation_${result.order_id}`, JSON.stringify({
            orderId: result.order_id,
            amount: result.gross_amount,
            status: 'pending',
            donorName: hideName ? 'Hamba Allah' : name,
            programName: programName,
            paymentType: result.payment_type,
            timestamp: new Date().toISOString()
          }));

          try {
            router.push({
              pathname: '/donasi-pending',
              query: {
                orderId: result.order_id,
                amount: result.gross_amount,
                paymentType: result.payment_type
              }
            });
          } catch (error) {
            console.error('Navigation error:', error);
            window.location.href = `/donasi-pending?orderId=${result.order_id}&amount=${result.gross_amount}&paymentType=${result.payment_type}`;
          }
        },
        onError: (result: MidtransResult) => {
          console.error('Payment error:', result);
          setErrors({
            general: `Pembayaran gagal: ${result.status_message}`
          });
          setLoading(false);
        },
        onClose: () => {
          console.log('Customer closed the payment window');
          setErrors({
            general: 'Anda menutup popup pembayaran sebelum menyelesaikan transaksi'
          });
          setLoading(false);
        }
      });
    } catch (error) {
      console.error('Payment error:', error);
      setErrors({
        general: error instanceof Error ? error.message : 'Terjadi kesalahan dalam memproses pembayaran'
      });
      setLoading(false);
    }
  };

  // Get selected amount display
  const getSelectedAmountDisplay = (): string => {
    if (customAmount && !isNaN(parseInt(customAmount))) {
      return formatCurrency(parseInt(customAmount));
    }
    if (donationAmount) {
      return formatCurrency(donationAmount);
    }
    return 'Rp 0';
  };

  // Handle amount selection
  const handleAmountSelect = (amount: number) => {
    setDonationAmount(amount);
    setCustomAmount('');
    setShowCustomAmount(false);
    setErrors({ ...errors, amount: undefined });
  };

  // Handle custom amount button click
  const handleCustomAmountClick = () => {
    setDonationAmount(null);
    setShowCustomAmount(true);
    setCustomAmount(''); // Start with empty value
    setErrors({ ...errors, amount: undefined });
  };

  // Handle custom amount change
  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setDonationAmount(null);
    setErrors({ ...errors, amount: undefined });
  };

  // Handle input change with error clearing
  const handleInputChange = (
    setter: (value: string) => void,
    field?: keyof FormErrors
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setter(e.target.value);
    if (field) {
      setErrors({ ...errors, [field]: undefined, general: undefined });
    }
  };

  return (
    <>
      <Head>
        <title>Donasi - {programName || 'Donasi Umum'}</title>
      </Head>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
        onLoad={() => {
          console.log('Midtrans Snap script loaded successfully');
          setMidtransLoaded(true);
        }}
        onError={(e) => {
          console.error('Error loading Midtrans Snap script:', e);
          setErrors({
            general: 'Gagal memuat layanan pembayaran. Silakan muat ulang halaman.'
          });
        }}
      />
      <div className="min-h-screen bg-[#F4F6FA] flex flex-col pb-28">
        {/* Header Program */}
        <div className="max-w-lg w-full mx-auto mt-8 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center p-4 gap-4">
            <div className="w-28 h-28 relative rounded-lg border overflow-hidden">
              {programImage ? (
                <Image
                  src={programImage as string}
                  alt={programName as string || "Program"}
                  fill
                  sizes="(max-width: 112px) 100vw, 112px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              ) : (
                <Image
                  src="/program-dummy.jpg"
                  alt="Program"
                  fill
                  sizes="(max-width: 112px) 100vw, 112px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              )}
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Anda akan berdonasi dalam program:</div>
              <div className="font-bold text-base text-orange-600 leading-tight mb-1">
                {programName || 'Judul Program Donasi'}
              </div>
              <div className="text-xs text-gray-600">Deskripsi singkat program donasi...</div>
            </div>
          </div>
        </div>
        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-4"
        >
          <div className="p-6 pb-2">
            {/* Pilihan Nominal */}
            <div className="mb-6">
              <div className="block text-sm font-semibold text-gray-700 mb-2">Donasi Terbaik Anda</div>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {donationOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleAmountSelect(option.value)}
                    className={`py-3 rounded-lg border text-center text-base font-semibold transition-colors shadow-sm focus:outline-none
                      ${donationAmount === option.value && !showCustomAmount
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-orange-500'}
                    `}
                  >
                    {option.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleCustomAmountClick}
                  className={`py-3 rounded-lg border text-center text-base font-semibold transition-colors shadow-sm focus:outline-none
                    ${showCustomAmount ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-700 border-gray-300 hover:border-orange-500'}
                  `}
                >
                  Nominal<br />lainnya
                </button>
              </div>
              {showCustomAmount && (
                <div className="relative mb-2">
                  <input
                    ref={customAmountInputRef}
                    type="number"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="w-full pl-12 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base"
                    placeholder="Masukkan nominal"
                    min={MIN_DONATION}
                    max={MAX_DONATION}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                </div>
              )}
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
              )}
            </div>
            {/* Nama Lengkap */}
            <div className="mb-4">
              <input
                type="text"
                value={name}
                onChange={handleInputChange(setName, 'name')}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base"
                placeholder="Nama Lengkap"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            {/* Sembunyikan Nama */}
            <div className="mb-4 flex items-center gap-2">
              <Switch
                checked={hideName}
                onChange={setHideName}
                className={`${hideName ? 'bg-orange-500' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
              >
                <span className="sr-only">Sembunyikan nama saya</span>
                <span
                  className={`${hideName ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
                />
              </Switch>
              <span className="text-sm text-gray-700">Sembunyikan nama saya (Hamba Allah)</span>
            </div>
            {/* No HP */}
            <div className="mb-4">
              <input
                type="tel"
                value={phone}
                onChange={handleInputChange(setPhone, 'phone')}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base"
                placeholder="No Whatsapp atau Handphone"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={handleInputChange(setEmail, 'email')}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base"
                placeholder="Email (optional)"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            {/* Pesan/Doa */}
            <div className="mb-4">
              <textarea
                value={message}
                onChange={handleInputChange(setMessage)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base"
                rows={3}
                placeholder="Tuliskan pesan atau doa disini (optional)"
              ></textarea>
            </div>
            {/* Error Message */}
            {errors.general && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg">
                {errors.general}
              </div>
            )}
          </div>
        </motion.div>
        {/* Tombol Donasi Fixed Bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
          <div className="max-w-lg w-full mx-auto px-4 py-3">
            <button
              type="button"
              onClick={handlePayment}
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-bold text-lg transition-colors
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Memproses...
                </span>
              ) : (
                `Donasi - ${getSelectedAmountDisplay()}`
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationForm;