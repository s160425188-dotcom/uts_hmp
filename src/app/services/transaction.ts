import { Injectable } from '@angular/core';

export interface TransactionItem {
  productName: string;
  price: number;
  quantity: number;
}

export interface Transaction {
  id: string;
  date: Date;
  total: number;
  itemCount: number;
  items: TransactionItem[];
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private storageKey = 'simobile_transactions';
  private transactions: Transaction[] = [];

  constructor() {
    this.loadFromStorage();
  }

  // Memuat data dari localStorage saat service diinisialisasi
  private loadFromStorage() {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        // Konversi string tanggal kembali menjadi objek Date
        this.transactions = parsed.map((trx: any) => ({
          ...trx,
          date: new Date(trx.date)
        }));
      } catch (e) {
        this.transactions = [];
      }
    } else {
      this.transactions = [];
    }
  }

  // Menyimpan data array transactions ke localStorage
  private saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.transactions));
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  getTransactionById(id: string): Transaction | undefined {
    return this.transactions.find(t => t.id === id);
  }

  private isToday(dateInput: Date | string): boolean {
    const date = new Date(dateInput);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  getTodayTotalSales(): number {
    return this.transactions
      .filter(trx => this.isToday(trx.date))
      .reduce((sum, trx) => sum + trx.total, 0);
  }

  getTodayTransactionCount(): number {
    return this.transactions.filter(trx => this.isToday(trx.date)).length;
  }

  addTransactionWithItems(total: number, items: { productName: string; price: number; quantity: number }[]) {
    const totalItemsCount = items.reduce((sum, i) => sum + i.quantity, 0);
    
    const nextNum = this.transactions.length + 1;
    const formattedId = `TRX-${String(nextNum).padStart(3, '0')}`;

    const newTrx: Transaction = {
      id: formattedId,
      date: new Date(),
      total,
      itemCount: totalItemsCount,
      items
    };

    this.transactions.unshift(newTrx);
    this.saveToStorage(); // Simpan permanen ke localStorage
  }

  getTopSellingProduct(): string {
    if (this.transactions.length === 0) {
      return 'Belum Ada Transaksi';
    }

    const productSalesMap: { [productName: string]: number } = {};

    this.transactions.forEach(trx => {
      if (trx.items && trx.items.length > 0) {
        trx.items.forEach(item => {
          if (productSalesMap[item.productName]) {
            productSalesMap[item.productName] += item.quantity;
          } else {
            productSalesMap[item.productName] = item.quantity;
          }
        });
      }
    });

    let topProduct = '-';
    let maxQty = 0;

    for (const [productName, totalQty] of Object.entries(productSalesMap)) {
      if (totalQty > maxQty) {
        maxQty = totalQty;
        topProduct = `${productName} (${totalQty} pcs)`;
      }
    }

    return maxQty > 0 ? topProduct : 'Belum Ada Transaksi';
  }
}