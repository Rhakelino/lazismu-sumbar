// Buat file di direktori types, misalnya types/midtrans-client.d.ts
declare module 'midtrans-client' {
  export class CoreApi {
    constructor(options: {
      isProduction: boolean;
      serverKey: string;
      clientKey: string;
    });
    
    transaction: {
      notification(notificationJson: any): Promise<any>;
      // ...metode lainnya
    };
    
    // ...properti dan metode lainnya
  }
  
  export class Snap {
    constructor(options: {
      isProduction: boolean;
      serverKey: string;
      clientKey: string;
    });
    
    createTransaction(parameter: any): Promise<any>;
    // ...metode lainnya
  }
}