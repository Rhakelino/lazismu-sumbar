import type { NextApiRequest, NextApiResponse } from 'next';
import midtransClient from 'midtrans-client';

// Define types for request and response
interface TransactionRequest {
    amount: number;
    programName: string;
    donorName: string;
    donorEmail?: string;
    donorPhone?: string;
    message?: string;
}

interface TransactionResponse {
    token?: {
        token: string;
        redirect_url: string;
    };
    orderId?: string;
    error?: string;
}

// Validation constants
const MIN_DONATION_AMOUNT = 10000; // Rp 10.000
const MAX_DONATION_AMOUNT = 100000000; // Rp 100.000.000

// Validate transaction request
function validateTransactionRequest(data: TransactionRequest): string | null {
    if (!data.amount || typeof data.amount !== 'number') {
        return 'Nominal donasi tidak valid';
    }

    if (data.amount < MIN_DONATION_AMOUNT) {
        return `Minimal donasi Rp ${MIN_DONATION_AMOUNT.toLocaleString('id-ID')}`;
    }

    if (data.amount > MAX_DONATION_AMOUNT) {
        return `Maksimal donasi Rp ${MAX_DONATION_AMOUNT.toLocaleString('id-ID')}`;
    }

    if (!data.donorName || data.donorName.trim().length < 3) {
        return 'Nama donor tidak valid';
    }

    if (data.donorEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.donorEmail)) {
        return 'Format email tidak valid';
    }

    if (data.donorPhone && !/^[0-9+\-\s()]{10,15}$/.test(data.donorPhone)) {
        return 'Format nomor telepon tidak valid';
    }

    return null;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TransactionResponse>
) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    res.setHeader('Content-Type', 'application/json');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Validate environment variables
        const serverKey = process.env.MIDTRANS_SERVER_KEY;
        const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
        const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';

        if (!serverKey || !clientKey) {
            console.error('Missing Midtrans credentials');
            return res.status(500).json({ error: 'Konfigurasi pembayaran tidak lengkap' });
        }

        // Parse and validate request body
        const transactionData = req.body as TransactionRequest;
        const validationError = validateTransactionRequest(transactionData);

        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        // Initialize Midtrans client
        const snap = new midtransClient.Snap({
            isProduction,
            serverKey,
            clientKey
        });

        // Generate unique order ID
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        const orderId = `DON-${timestamp}-${random}`;

        // Prepare transaction parameters
        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: transactionData.amount
            },
            item_details: [{
                id: 'DONATION',
                price: transactionData.amount,
                quantity: 1,
                name: transactionData.programName || 'Donasi Umum'
            }],
            customer_details: {
                first_name: transactionData.donorName,
                email: transactionData.donorEmail || 'anonymous@example.com',
                phone: transactionData.donorPhone
            }
        };

        // Create transaction
        const transaction = await snap.createTransaction(parameter);

        // Log successful transaction creation (without sensitive data)
        console.log(`Transaction created successfully: ${orderId}`);

        return res.status(200).json({
            token: transaction,
            orderId
        });

    } catch (error: unknown) {
        console.error('Transaction creation error:', error);

        // Handle specific Midtrans errors
        if (error && typeof error === 'object' && 'message' in error) {
            return res.status(400).json({
                error: `Error Midtrans: ${error.message}`
            });
        }

        // Handle other errors
        return res.status(500).json({
            error: 'Terjadi kesalahan dalam memproses transaksi'
        });
    }
} 