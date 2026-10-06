import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TransactionService, Transaction } from '../services/transaction';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false
})
export class Tab3Page implements OnInit {

  transactions: Transaction[] = [];

  constructor(
    private transactionService: TransactionService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loadTransactions();
  }

  ionViewWillEnter() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactions = this.transactionService.getTransactions();
  }

  goToDetail(id: string) {
    this.navCtrl.navigateForward(['/detail-transaksi', {id}]);
  }

}