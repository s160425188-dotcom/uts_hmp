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
  isProcessing: boolean = false;

  constructor(
    private cartService: CartService,
    private transactionService: TransactionService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.refreshCart();
  }

  ionViewWillEnter() {
    this.refreshCart();
  }

  refreshCart() {
    this.cartItems = this.cartService.getCart();
  }

  get totalBelanja(): number {
    return this.cartService.getCartTotal();
  }

  increaseQty(productId: number) {
    this.cartService.increaseQuantity(productId);
    this.refreshCart();
  }

  decreaseQty(productId: number) {
    this.cartService.decreaseQuantity(productId);
    this.refreshCart();
  }

  async checkout() {
    // Cegah eksekusi jika sedang diproses atau keranjang kosong
    if (this.isProcessing || this.cartItems.length === 0 || this.totalBelanja <= 0) {
      return;
    }

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
            // Proteksi double-click pada tombol konfirmasi
            if (this.isProcessing) {
              return false;
            }
            this.isProcessing = true;

            try {
              // 1. Salin data item keranjang
              const items = this.cartItems.map(c => ({
                productName: c.product.name,
                price: c.product.sellPrice,
                quantity: c.quantity
              }));

              // 2. Simpan transaksi ke TransactionService
              this.transactionService.addTransactionWithItems(this.totalBelanja, items);

              // 3. Kosongkan keranjang belanja
              this.cartService.clearCart();
              this.refreshCart();

              // 4. Tampilkan pemberitahuan Toast
              const toast = await this.toastCtrl.create({
                message: 'Transaksi berhasil disimpan ke riwayat!',
                duration: 2000,
                color: 'success',
                position: 'bottom'
              });
              await toast.present();

              // 5. Navigasi ke Riwayat Transaksi (Tab 3)
              await this.navCtrl.navigateRoot('/tabs/tab3');
            } catch (error) {
              console.error('Gagal memproses transaksi:', error);
            } finally {
              this.isProcessing = false;
            }

            return true;
          }
        }
      ]
    });

    await alert.present();
  }

}