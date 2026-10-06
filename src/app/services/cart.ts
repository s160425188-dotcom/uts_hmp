import { Injectable } from '@angular/core';
import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [];

  // Get Seluruh Isi Keranjang
  getCart(): CartItem[] {
    return this.cartItems;
  }

  // Tambah Produk ke Keranjang
  addToCart(product: Product) {
    const item = this.cartItems.find(c => c.product.id === product.id);
    if (item) {
      item.quantity += 1;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
  }

increaseQuantity(productId: number) {
    const item = this.cartItems.find(c => c.product.id === productId);
    if (item) item.quantity += 1;
  }

  decreaseQuantity(productId: number) {
    const index = this.cartItems.findIndex(c => c.product.id === productId);
    if (index !== -1) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity -= 1;
      } else {
        this.cartItems.splice(index, 1);
      }
    }
  }

  // Hitung Total Belanja
  getCartTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.product.sellPrice * item.quantity), 0);
  }

getCartItemCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Kosongkan Keranjang
  clearCart() {
    this.cartItems = [];
  }
}