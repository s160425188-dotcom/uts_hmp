import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // Data produk
  private products = [
    { id: 1, name: 'Beras 5kg', price: 65000, stock: 20 },
    { id: 2, name: 'Minyak Goreng 1L', price: 15000, stock: 15 },
    { id: 3, name: 'Gula Pasir 1kg', price: 14000, stock: 30 },
    { id: 4, name: 'Telur Ayam 1kg', price: 28000, stock: 10 }
  ];

  // Data transaksi hari ini
  private todayTransactions = [
    { id: 'TRX-001', total: 80000 },
    { id: 'TRX-002', total: 42000 },
    { id: 'TRX-003', total: 56000 }
  ];

  constructor() { }

  // 1. Menghitung Total Produk
  getTotalProducts(): number {
    return this.products.length;
  }

  // 2. Menghitung Total Pendapatan Transaksi Hari Ini
  getTodayTransactionsTotal(): number {
    return this.todayTransactions.reduce((sum, trx) => sum + trx.total, 0);
  }

  // 3. Mengetahui Produk Terlaris
  getTopProduct(): string {
    return 'Gula Pasir 1kg (Terjual 3 Pcs)';
  }
}