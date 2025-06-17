// Payment utility functions for donation system

export interface PaymentStatus {
  orderId: string;
  status: 'pending' | 'success' | 'failed' | 'expired' | 'cancelled';
  amount: string;
  donorName: string;
  programName: string;
  timestamp: string;
  paymentType?: string;
  transactionTime?: string;
}

export interface MidtransResult {
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

/**
 * Store payment data in localStorage
 */
export const storePaymentData = (data: PaymentStatus): void => {
  localStorage.setItem(`donation_${data.orderId}`, JSON.stringify(data));
};

/**
 * Get payment data from localStorage
 */
export const getPaymentData = (orderId: string): PaymentStatus | null => {
  const data = localStorage.getItem(`donation_${orderId}`);
  return data ? JSON.parse(data) : null;
};

/**
 * Update payment status
 */
export const updatePaymentStatus = (orderId: string, status: PaymentStatus['status'], additionalData?: Partial<PaymentStatus>): void => {
  const existingData = getPaymentData(orderId);
  if (existingData) {
    const updatedData = {
      ...existingData,
      status,
      ...additionalData
    };
    storePaymentData(updatedData);
  }
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount: number | string): string => {
  const numAmount = typeof amount === 'string' ? parseInt(amount) : amount;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numAmount);
};

/**
 * Format payment type for display
 */
export const formatPaymentType = (type?: string): string => {
  if (!type) return '-';
  const types: { [key: string]: string } = {
    'bank_transfer': 'Transfer Bank',
    'gopay': 'GoPay',
    'qris': 'QRIS',
    'credit_card': 'Kartu Kredit',
    'cstore': 'Convenience Store',
    'echannel': 'E-Channel'
  };
  return types[type] || type;
};

/**
 * Get payment status display text
 */
export const getPaymentStatusText = (status: PaymentStatus['status']): string => {
  const statusTexts: { [key in PaymentStatus['status']]: string } = {
    pending: 'Menunggu Pembayaran',
    success: 'Pembayaran Berhasil',
    failed: 'Pembayaran Gagal',
    expired: 'Pembayaran Kadaluarsa',
    cancelled: 'Pembayaran Dibatalkan'
  };
  return statusTexts[status];
};

/**
 * Get payment status color for UI
 */
export const getPaymentStatusColor = (status: PaymentStatus['status']): string => {
  const statusColors: { [key in PaymentStatus['status']]: string } = {
    pending: 'text-yellow-600 bg-yellow-100',
    success: 'text-green-600 bg-green-100',
    failed: 'text-red-600 bg-red-100',
    expired: 'text-gray-600 bg-gray-100',
    cancelled: 'text-red-600 bg-red-100'
  };
  return statusColors[status];
};

/**
 * Check if payment is successful
 */
export const isPaymentSuccessful = (status: PaymentStatus['status']): boolean => {
  return status === 'success';
};

/**
 * Check if payment is pending
 */
export const isPaymentPending = (status: PaymentStatus['status']): boolean => {
  return status === 'pending';
};

/**
 * Check if payment failed
 */
export const isPaymentFailed = (status: PaymentStatus['status']): boolean => {
  return ['failed', 'expired', 'cancelled'].includes(status);
};

/**
 * Generate success URL with query parameters
 */
export const generateSuccessUrl = (orderId: string, amount: string, donorName: string): string => {
  const params = new URLSearchParams({
    orderId,
    amount,
    donorName
  });
  return `/donasi-sukses?${params.toString()}`;
};

/**
 * Generate pending URL with query parameters
 */
export const generatePendingUrl = (orderId: string, amount: string, donorName: string): string => {
  const params = new URLSearchParams({
    orderId,
    amount,
    donorName
  });
  return `/donasi-pending?${params.toString()}`;
}; 