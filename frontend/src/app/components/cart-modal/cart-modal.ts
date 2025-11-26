import { Component, ChangeDetectionStrategy, inject, output, computed } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order-service';

@Component({
  selector: 'app-cart-modal',
  template: `
    <div class="fixed inset-0 bg-black/50 z-40" (click)="onClose()"></div>
    <div class="fixed right-0 top-0 w-96 h-full bg-white shadow-lg z-50 flex flex-col">
      <div class="flex justify-between items-center p-3.5 border-b bg-green-800 text-white">
        <h2 class="text-2xl font-bold">Shopping cart</h2>
        <button type="button" class="text-2xl font-bold cursor-pointer" (click)="onClose()">
          ✕
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-4">
        @if (cartService.items$().length === 0) {
          <p class="text-center text-gray-500">Empty cart</p>
        } @else {
          @for (item of cartService.items$(); track item.id) {
            <div class="flex gap-2 mb-4 pb-4 border-b">
              <div class="w-25">
                <img
                  [src]="item.image"
                  [alt]="item.name"
                  width="80"
                  height="80"
                  class="w-full h-20 object-cover rounded"
                />
              </div>
              <div class="flex flex-col w-full">
                <h3 class="font-semibold text-green-800">{{ item.name }}</h3>
                <p class="text-xs text-gray-500">
                  {{ item.type === 'base' ? 'Base' : 'Shade' }} - {{ item.color }}
                </p>
                <div class="flex items-center justify-between mt-1">
                  <p class="text-gray-600">R$ {{ item.price.toFixed(2) }}</p>
                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      class="px-2 py-1 bg-gray-200 rounded text-slate-600"
                      (click)="cartService.updateQuantity(item.id, item.quantity - 1)"
                    >
                      −
                    </button>
                    <span class="text-green-800">{{ item.quantity }}</span>
                    <button
                      type="button"
                      class="px-2 py-1 bg-gray-200 rounded text-slate-600"
                      (click)="cartService.updateQuantity(item.id, item.quantity + 1)"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    class="text-red-600 text-sm cursor-pointer ml-2"
                    (click)="cartService.removeItem(item.id)"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          }
        }
      </div>

      <div class="border-t p-4 space-y-4">
        @if (!hasValidOrder()) {
          <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded text-sm">
            ⚠️ You need exactly 1 base and 1 shade to complete the order
          </div>
        }

        <div class="flex justify-between text-lg font-bold text-green-800">
          <span>Total:</span>
          <span>R$ {{ cartService.totalPrice().toFixed(2) }}</span>
        </div>
        <button
          type="button"
          [class]="
            !canConfirmOrder()
              ? 'w-full bg-gray-400 text-white py-3 rounded font-bold cursor-not-allowed'
              : 'w-full bg-green-800 text-white py-3 rounded font-bold hover:bg-green-900'
          "
          [disabled]="!canConfirmOrder()"
          (click)="confirmOrder()"
        >
          Confirm order
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartModal {
  cartService = inject(CartService);
  orderService = inject(OrderService);
  router = inject(Router);
  close = output<void>();

  hasValidOrder = computed(() => {
    const items = this.cartService.items$();
    const bases = items.filter((i) => i.type === 'base');
    const shades = items.filter((i) => i.type === 'shade');
    return bases.length === 1 && shades.length === 1;
  });

  canConfirmOrder = computed(() => {
    return this.cartService.items$().length > 0 && this.hasValidOrder();
  });

  confirmOrder(): void {
    const items = this.cartService.items$();

    if (!this.hasValidOrder()) {
      alert('You need exactly 1 base and 1 shade to complete the order');
      return;
    }

    const base = items.find((i) => i.type === 'base');
    const shade = items.find((i) => i.type === 'shade');

    if (!base || !shade) {
      console.error('Base or shade not found in cart');
      return;
    }

    const payload = {
      userId: Number(localStorage.getItem('userId')),
      lampBaseId: base.id,
      lampBaseColor: base.color,
      lampShadeId: shade.id,
      lampShadeColor: shade.color,
    };

    console.log('Sending order payload:', payload);

    this.orderService.createOrder(payload).subscribe({
      next: () => {
        console.log('Order created successfully');
        this.cartService.clearCart();
        this.onClose();
        this.router.navigate(['/completed']);
      },
      error: (err) => {
        console.error('Error creating order:', err);
        alert('Error creating order. Please try again.');
      },
    });
  }

  onClose(): void {
    this.close.emit();
  }
}