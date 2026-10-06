import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { CartService, CartItem } from '../../services/cart';
import { TransactionService } from '../../services/transaction';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
  standalone: false,
})
export class KeranjangPage implements OnInit {

  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private transactionService: TransactionService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
  }

  get totalBelanja(): number {
    return this.cartService.getCartTotal();
  }

  increaseQty(productId: number) {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQty(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }

  async checkout() {
    if (this.cartItems.length === 0) return;

    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi Transaksi',
      message: `Total Pembayaran: Rp ${this.totalBelanja.toLocaleString('id-ID')}. Lanjutkan transaksi?`,
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Konfirmasi',
          handler: async () => {
            // Mapping item keranjang ke format rincian transaksi
            const items = this.cartItems.map(c => ({
              productName: c.product.name,
              price: c.product.sellPrice,
              quantity: c.quantity
            }));

            // Simpan transaksi beserta rincian itemnya
            this.transactionService.addTransactionWithItems(this.totalBelanja, items);

            // Kosongkan Keranjang
            this.cartService.clearCart();

            const toast = await this.toastCtrl.create({
              message: 'Transaksi berhasil disimpan ke riwayat!',
              duration: 2000,
              color: 'success',
              position: 'bottom'
            });
            await toast.present();

            this.navCtrl.navigateRoot('/tabs/tab3'); // Pindah ke halaman Riwayat Transaksi (Tab 3)
          }
        }
      ]
    });

    await alert.present();
  }

}