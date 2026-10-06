import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService, Transaction } from '../../services/transaction';

@Component({
  selector: 'app-detail-transaksi',
  templateUrl: './detail-transaksi.page.html',
  styleUrls: ['./detail-transaksi.page.scss'],
  standalone: false
})
export class DetailTransaksiPage implements OnInit {

  transaction?: Transaction;

  constructor(
    private activatedRoute: ActivatedRoute,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.transaction = this.transactionService.getTransactionById(idParam);
    }
  }

}