import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductService, Product } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-detail-produk',
  templateUrl: './detail-produk.page.html',
  styleUrls: ['./detail-produk.page.scss'],
  standalone: false,
})
export class DetailProdukPage implements OnInit {

  product?: Product;
  defaultImage = 'https://ionicframework.com/docs/img/demos/thumbnail.svg'; // Gambar default jika tidak ada gambar produk  
  // Mock database produk

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastController: ToastController,
    
    ) { }

  ngOnInit() {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam!== null) {
      this.product = this.productService.getProductById(Number(idParam));
    }
  }
async addToCart() {
    if (!this.product || this.product.stock === 0) return;

    this.cartService.addToCart(this.product);

    const toast = await this.toastController.create({
      message: `${this.product.name} berhasil ditambahkan ke keranjang!`,
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }

}
