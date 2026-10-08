import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProductService, Product } from '../services/product';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  searchQuery: string = '';
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  // Dipanggil otomatis setiap kali Tab 2 dibuka/fokus kembali
  ionViewWillEnter() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
  }

  get filteredProducts(): Product[] {
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      return this.products;
    }
    const query = this.searchQuery.toLowerCase();
    return this.products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }

  goToDetail(id: number) {
    this.navCtrl.navigateForward(['/detail-produk', id]);
  }

  deleteProduct(id: number, slidingItem: any) {
    if (slidingItem) {
      slidingItem.close();
    }
    
    // Hapus dari service (dan localStorage)
    this.productService.deleteProduct(id);
    // Refresh daftar produk di UI
    this.loadProducts();
  }
}