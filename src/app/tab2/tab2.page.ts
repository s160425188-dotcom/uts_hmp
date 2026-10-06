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

  // Variable penampung keyword pencarian (Two-Way Binding)
  searchQuery: string = '';

  // Data master produk toko Bu Marni
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private navCtrl: NavController) { }

  ngOnInit() {
    // Mengambil data produk dari ProductService
    this.products = this.productService.getProducts();
  }
  // Getter untuk memfilter daftar produk secara real-time berdasarkan kata kunci
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
    // Menutup opsi sliding
    slidingItem.close();

    // Menghapus item dari daftar
    this.products = this.products.filter(p => p.id !== id);
  }
}