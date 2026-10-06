import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  category: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    { id: 1, name: 'Beras Pandan Wangi 5kg', category: 'Sembako', buyPrice: 58000, sellPrice: 65000, stock: 20 },
    { id: 2, name: 'Minyak Goreng Bimoli 1L', category: 'Minyak', buyPrice: 13000, sellPrice: 15000, stock: 12 },
    { id: 3, name: 'Gula Pasir Gulaku 1kg', category: 'Sembako', buyPrice: 12000, sellPrice: 14000, stock: 30 },
    { id: 4, name: 'Telur Ayam Negeri 1kg', category: 'Sembako', buyPrice: 24000, sellPrice: 28000, stock: 5 },
    { id: 5, name: 'Kecap Manis Bango 520ml', category: 'Bumbu', buyPrice: 20000, sellPrice: 24000, stock: 18 },
    { id: 6, name: 'Mie Instant Indomie Goreng', category: 'Makanan', buyPrice: 2700, sellPrice: 3100, stock: 100 },
    { id: 7, name: 'Kopi Kapal Api Special 165g', category: 'Minuman', buyPrice: 11000, sellPrice: 13500, stock: 25 },
    { id: 8, name: 'Teh Celup Sosro Box isi 30', category: 'Minuman', buyPrice: 6000, sellPrice: 8500, stock: 15 },
    { id: 9, name: 'Susu UHT Ultra Milk Cokelat 1L', category: 'Minuman', buyPrice: 16500, sellPrice: 19500, stock: 0 },
    { id: 10, name: 'Garam Dapur Cap Kapal 250g', category: 'Bumbu', buyPrice: 2000, sellPrice: 3000, stock: 40 },
    { id: 11, name: 'Sabun Cuci Piring Mama Lemon 780ml', category: 'Kebersihan', buyPrice: 12500, sellPrice: 15500, stock: 8 },
    { id: 12, name: 'Deterjen Rinso Anti Noda 770g', category: 'Kebersihan', buyPrice: 21000, sellPrice: 25000, stock: 14 }
  ];

  constructor() { }

  // Get Semua Produk
  getProducts(): Product[] {
    return this.products;
  }

  // Get Detail Produk berdasarkan ID
  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  // Tambah Produk Baru
  addProduct(product: Omit<Product, 'id'>) {
    const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    this.products.push({ id: newId, ...product });
  }

  // Update Produk Existing
  updateProduct(updatedProduct: Product) {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }

  // Hapus Produk
  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }

  // Menghitung Total Jenis Produk (Untuk Dashboard Tab 1)
  getTotalProductTypes(): number {
    return this.products.length;
  }

  // Mendapatkan Produk Terlaris (Untuk Dashboard Tab 1)
  getTopProduct(): string {
    return 'Gula Pasir Gulaku 1kg';
  }
}