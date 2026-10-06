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

  private transactions: Transaction[] = [
    {
      id: 'TRX-001',
      date: new Date('2026-10-05T10:30:00'),
      total: 80000,
      itemCount: 2,
      items: [
        { productName: 'Beras Pandan Wangi 5kg', price: 65000, quantity: 1 },
        { productName: 'Minyak Goreng Bimoli 1L', price: 15000, quantity: 1 }
      ]
    },
    {
      id: 'TRX-002',
      date: new Date('2026-10-06T14:15:00'),
      total: 28000,
      itemCount: 2,
      items: [
        { productName: 'Gula Pasir Gulaku 1kg', price: 14000, quantity: 2 }
      ]
    }
  ];

  constructor() { }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  getTransactionById(id: string): Transaction | undefined {
    return this.transactions.find(t => t.id === id);
  }

  getTodayTotalSales(): number {
    return this.transactions.reduce((sum, trx) => sum + trx.total, 0);
  }

  getTodayTransactionCount(): number {
    return this.transactions.length;
  }

  addTransactionWithItems(total: number, items: { productName: string; price: number; quantity: number }[]) {
    const totalItemsCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const newTrx: Transaction = {
      id: `TRX-00${this.transactions.length + 1}`,
      date: new Date(),
      total,
      itemCount: totalItemsCount,
      items
    };
    this.transactions.unshift(newTrx);
  }
}