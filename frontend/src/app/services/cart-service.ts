import { Injectable, inject, signal, computed } from '@angular/core';
import { Shade } from '../models/shade';
import { Base } from '../models/base';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type: 'shade' | 'base';
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items = signal<CartItem[]>([]);

  items$ = this.items.asReadonly();
  itemCount = computed(() => this.items().length);
  totalPrice = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  addItem(product: Shade | Base, type: 'shade' | 'base'): void {
    this.items.update((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
          type,
        },
      ];
    });
  }

  removeItem(id: number): void {
    this.items.update((current) => current.filter((item) => item.id !== id));
  }

  updateQuantity(id: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(id);
      return;
    }
    this.items.update((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }

  clearCart(): void {
    this.items.set([]);
  }
}
