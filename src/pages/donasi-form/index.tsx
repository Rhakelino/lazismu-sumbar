import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
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

interface SuccessData {
  orderId: string;
  amount: string;
  donorName: string;
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
  
  // Success state
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  
  // Pending state
  const [showPending, setShowPending] = useState(false);
  const [pendingData, setPendingData] = useState<any>(null);

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

  // Reset form
  const resetForm = () => {
    setDonationAmount(null);
    setCustomAmount('');
    setShowCustomAmount(false);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setHideName(false);
    setErrors({});
    setShowSuccess(false);
    setSuccessData(null);
    setShowPending(false);
    setPendingData(null);
  };

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

  // Handle payment success with improved redirect
  const handlePaymentSuccess = async (result: MidtransResult, orderId: string, amount: number) => {
    try {
      console.log('🎉 Payment Success! Processing redirect...', { orderId, amount });
      
      const transactionData = {
        orderId,
        amount: formatCurrency(amount),
        donorName: hideName ? 'Hamba Allah' : name,
        programName: programName as string || 'Donasi Umum',
        timestamp: new Date().toISOString(),
        status: 'success',
        paymentType: result.payment_type,
        transactionTime: result.transaction_time
      };

      // Store transaction data in localStorage
      localStorage.setItem(`donation_${orderId}`, JSON.stringify(transactionData));
      console.log('💾 Transaction data saved to localStorage');
      
      // Create success URL with proper encoding
      const successUrl = `/donasi-sukses?orderId=${encodeURIComponent(orderId)}&amount=${encodeURIComponent(amount.toString())}&donorName=${encodeURIComponent(hideName ? 'Hamba Allah' : name)}`;
      console.log('🔗 Redirecting to:', successUrl);
      
      // Multiple redirect strategies for maximum compatibility
      try {
        // Strategy 1: Router push with replace for immediate redirect
        await router.replace(successUrl);
        console.log('✅ Router.replace successful');
      } catch (routerError) {
        console.warn('⚠️ Router.replace failed, trying router.push:', routerError);
        try {
          await router.push(successUrl);
          console.log('✅ Router.push successful');
        } catch (pushError) {
          console.warn('⚠️ Router.push failed, using window.location:', pushError);
          // Strategy 2: Force page redirect with window.location
          window.location.href = successUrl;
        }
      }
      
    } catch (error) {
      console.error('❌ Error handling payment success:', error);
      // Fallback: show success overlay if redirect fails
      setSuccessData({
        orderId,
        amount: formatCurrency(amount),
        donorName: hideName ? 'Hamba Allah' : name
      });
      setShowSuccess(true);
    }
  };

  // Handle payment
  const handlePayment = async (): Promise<void> => {
    console.log('🚀 Starting payment process...');
    
    if (!validateForm()) {
      console.log('❌ Form validation failed');
      return;
    }
    
    // Check if Midtrans is loaded
    if (!midtransLoaded || !window.snap) {
      console.error('❌ Midtrans not loaded');
      setErrors({
        general: 'Layanan pembayaran belum siap. Silakan tunggu sebentar dan coba lagi.'
      });
      return;
    }
    
    setLoading(true);
    setErrors({});

    try {
      const amount = customAmount ? parseInt(customAmount) : donationAmount;
      if (!amount) throw new Error('Invalid amount');

      console.log('📝 Creating transaction with amount:', amount);

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

      if (!data.token?.token || !data.orderId) {
        throw new Error('Data transaksi tidak lengkap');
      }

      console.log('✅ Transaction created successfully:', data.orderId);
      console.log('💳 Opening Midtrans payment window...');

      // Initialize Midtrans Snap with improved callbacks
      window.snap.pay(data.token.token, {
        onSuccess: (result: MidtransResult) => {
          console.log('✅ Payment success callback triggered:', result);
          setLoading(false);
          handlePaymentSuccess(result, data.orderId!, amount);
        },
        onPending: (result: MidtransResult) => {
          console.log('⏳ Payment pending callback triggered:', result);
          setLoading(false);
          
          // Update transaction status in localStorage
          const transactionData = {
            orderId: data.orderId!,
            amount: formatCurrency(amount),
            donorName: hideName ? 'Hamba Allah' : name,
            programName: programName as string || 'Donasi Umum',
            timestamp: new Date().toISOString(),
            status: 'pending',
            paymentType: result.payment_type,
            transactionTime: result.transaction_time
          };
          localStorage.setItem(`donation_${data.orderId}`, JSON.stringify(transactionData));
          
          // Show pending overlay
          setPendingData({
            orderId: data.orderId,
            amount: formatCurrency(amount),
            paymentType: result.payment_type
          });
          setShowPending(true);
        },
        onError: (result: MidtransResult) => {
          console.error('❌ Payment error callback triggered:', result);
          setLoading(false);
          setErrors({
            general: `Pembayaran gagal: ${result.status_message || 'Silakan coba lagi'}`
          });
        },
        onClose: () => {
          console.log('🚪 Payment window closed by user');
          setLoading(false);
        }
      });

    } catch (error) {
      console.error('❌ Payment process error:', error);
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
    setCustomAmount('');
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

  // Handle redirect to success page manually
  const redirectToSuccessPage = (orderId: string, amount: string, donorName: string) => {
    const successUrl = `/donasi-sukses?orderId=${encodeURIComponent(orderId)}&amount=${encodeURIComponent(amount)}&donorName=${encodeURIComponent(donorName)}`;
    console.log('🔗 Manual redirect to:', successUrl);
    
    // Force redirect with window.location for maximum compatibility
    window.location.href = successUrl;
  };

  return (
    <>
      <Head>
        <title>Donasi - {programName || 'Donasi Umum'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Form donasi untuk program kebaikan" />
      </Head>
      
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
        onLoad={() => {
          console.log('✅ Midtrans Snap script loaded successfully');
          setMidtransLoaded(true);
        }}
        onError={(e) => {
          console.error('❌ Error loading Midtrans Snap script:', e);
          setErrors({
            general: 'Gagal memuat layanan pembayaran. Silakan muat ulang halaman.'
          });
        }}
      />
      
      <div className="min-h-screen bg-[#F4F6FA] flex flex-col pb-28">
        {/* Success Overlay */}
        <AnimatePresence>
          {showSuccess && successData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative"
              >
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Terima Kasih!</h2>
                  <p className="text-gray-600 mb-6">Donasi Anda telah berhasil diproses</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                    <div className="mb-2">
                      <span className="text-sm text-gray-500">Order ID:</span>
                      <span className="block font-medium text-gray-800">{successData.orderId}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-sm text-gray-500">Jumlah:</span>
                      <span className="block font-medium text-gray-800">{successData.amount}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Donatur:</span>
                      <span className="block font-medium text-gray-800">{successData.donorName}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => redirectToSuccessPage(successData.orderId, successData.amount, successData.donorName)}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex-1"
                    >
                      Lihat Detail
                    </button>
                    <button
                      onClick={resetForm}
                      className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors flex-1"
                    >
                      Donasi Lagi
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pending Overlay */}
        <AnimatePresence>
          {showPending && pendingData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative"
              >
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Pembayaran Tertunda</h2>
                  <p className="text-gray-600 mb-6">Silakan selesaikan pembayaran Anda</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                    <div className="mb-2">
                      <span className="text-sm text-gray-500">Order ID:</span>
                      <span className="block font-medium text-gray-800">{pendingData.orderId}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-sm text-gray-500">Jumlah:</span>
                      <span className="block font-medium text-gray-800">{pendingData.amount}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Metode Pembayaran:</span>
                      <span className="block font-medium text-gray-800 capitalize">
                        {pendingData.paymentType?.replace('_', ' ') || 'Unknown'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setShowPending(false)}
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex-1"
                    >
                      Tutup
                    </button>
                    <button
                      onClick={() => router.push('/')}
                      className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors flex-1"
                    >
                      Kembali ke Beranda
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Anda akan berdonasi dalam program:</div>
              <div className="font-bold text-base text-orange-600 leading-tight mb-1">
                {programName || 'Judul Program Donasi'}
              </div>
              <div className="text-xs text-gray-600">Mari berbagi kebaikan untuk sesama</div>
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
                maxLength={50}
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
                className={`${hideName ? 'bg-orange-500' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
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
                placeholder="No Whatsapp atau Handphone (opsional)"
                maxLength={15}
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
                placeholder="Email (opsional)"
                maxLength={100}
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
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base resize-none"
                rows={3}
                placeholder="Tuliskan pesan atau doa disini (opsional)"
                maxLength={250}
              ></textarea>
              {message && (
                <p className="mt-1 text-xs text-gray-500 text-right">{message.length}/250</p>
              )}
            </div>
            
            {/* Midtrans Loading Status */}
            {!midtransLoaded && (
              <div className="mb-4 p-3 bg-yellow-50 text-yellow-600 border border-yellow-200 rounded-lg text-sm">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
                  Memuat layanan pembayaran...
                </div>
              </div>
            )}
            
            {/* Error Message */}
            {errors.general && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{errors.general}</span>
                </div>
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
              disabled={loading || !midtransLoaded}
              className={`w-full py-3 px-4 rounded-lg text-white font-bold text-lg transition-all duration-200 transform
                ${loading || !midtransLoaded 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg active:scale-95'}`}
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
              ) : !midtransLoaded ? (
                'Memuat layanan pembayaran...'
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