import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product';
import { TransactionService } from '../services/transaction';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  totalProduk: number = 0;
  totalTransaksiHariIni: number = 0;
  produkTerlaris: string = '';

  constructor(
    private productService: ProductService,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.totalProduk = this.productService.getTotalProductTypes();
    this.totalTransaksiHariIni = this.transactionService.getTodayTotalSales();
    this.produkTerlaris = this.productService.getTopProduct();
  }

}
