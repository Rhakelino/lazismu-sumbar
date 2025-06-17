import type { NextApiRequest, NextApiResponse } from 'next';
import midtransClient from 'midtrans-client';

// Definisikan tipe untuk notifikasi Midtrans
interface MidtransNotification {
  transaction_time: string;
  transaction_status: string;
  transaction_id: string;
  status_message: string;
  status_code: string;
  signature_key: string;
  payment_type: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  fraud_status?: string;
  currency: string;
} 

// Definisikan tipe untuk respons API
type ApiResponse = {
  success?: boolean;
  message?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const notificationJson = req.body as MidtransNotification;
    
    // Perbaikan tipe untuk Midtrans config
    const serverKey: string = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-Leqc5AAKLuykwW93JEnRohs';
    const clientKey: string = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-mwIpXErSanUaIi3G';
    
    const core = new midtransClient.CoreApi({
      isProduction: false,
      serverKey,
      clientKey
    });
    
    const notification = await core.transaction.notification(notificationJson);
    
    const orderId: string = notification.order_id;
    const transactionStatus: string = notification.transaction_status;
    const fraudStatus: string | undefined = notification.fraud_status;
    const paymentType: string = notification.payment_type;
    const grossAmount: string = notification.gross_amount;
    const transactionTime: string = notification.transaction_time;
    
    console.log(`Transaction notification received:
      Order ID: ${orderId}
      Status: ${transactionStatus}
      Fraud Status: ${fraudStatus || 'N/A'}
      Payment Type: ${paymentType}
      Amount: ${grossAmount}
      Transaction Time: ${transactionTime}
    `);
    
    // Proses status transaksi berdasarkan status
    switch (transactionStatus) {
      case 'capture':
      case 'settlement':
        // Payment successful
        console.log(`✅ Payment successful for order: ${orderId}`);
        // Here you can add database operations, email notifications, etc.
        break;
        
      case 'pending':
        // Payment pending
        console.log(`⏳ Payment pending for order: ${orderId}`);
        break;
        
      case 'deny':
        // Payment denied
        console.log(`❌ Payment denied for order: ${orderId}`);
        break;
        
      case 'expire':
        // Payment expired
        console.log(`⏰ Payment expired for order: ${orderId}`);
        break;
        
      case 'cancel':
        // Payment cancelled
        console.log(`🚫 Payment cancelled for order: ${orderId}`);
        break;
        
      default:
        console.log(`❓ Unknown status for order: ${orderId} - ${transactionStatus}`);
    }
    
    // Handle fraud status
    if (fraudStatus === 'challenge') {
      console.log(`⚠️ Fraud challenge for order: ${orderId}`);
    } else if (fraudStatus === 'accept') {
      console.log(`✅ Fraud check passed for order: ${orderId}`);
    } else if (fraudStatus === 'deny') {
      console.log(`❌ Fraud check failed for order: ${orderId}`);
    }
    
    // Proses status transaksi
    // Di sini Anda bisa menyimpan data ke database
    // Contoh: await saveTransactionToDatabase(notification);
    
    res.status(200).json({ 
      success: true, 
      message: `Notification processed for order: ${orderId} with status: ${transactionStatus}` 
    });
  } catch (error) {
    console.error('Notification error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: `Notification processing failed: ${errorMessage}` });
  }
}