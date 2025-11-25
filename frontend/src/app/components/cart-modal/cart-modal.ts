import { Component, ChangeDetectionStrategy, inject, output } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-modal',
  imports: [RouterLink],
  template: `
    <div class="fixed inset-0 bg-black/50 z-40" (click)="onClose()"></div>
    <div class="fixed right-0 top-0 w-96 h-full bg-white shadow-lg z-50 flex flex-col">
      <div class="flex justify-between items-center p-3.5 border-b bg-green-800">
        <h2 class="text-2xl font-bold">Shopping cart</h2>
        <button
          type="button"
          class="text-2xl font-bold cursor-pointer"
          (click)="onClose()"
        >
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
                <div class="flex items-center justify-between">
                  <p class="text-gray-600">R$ {{ item.price.toFixed(2) }}</p>
                  <div class="flex items-center gap-2 mt-2">
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
                    class="text-red-600 text-sm cursor-pointer"
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
        <div class="flex justify-between text-lg font-bold text-green-800">
          <span>Total:</span>
          <span>R$ {{ cartService.totalPrice().toFixed(2) }}</span>
        </div>
        <button
          type="button"
          routerLink="/completed"
          [class]="cartService.items$().length === 0 ? 'w-full bg-gray-400 text-white py-3 rounded font-bold cursor-not-allowed' : 'w-full bg-green-800 text-white py-3 rounded font-bold hover:bg-green-900'"
          [disabled]="cartService.items$().length === 0"
          (click)="onClose()"
          (click)="cartService.clearCart()"
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
  close = output<void>();

  onClose(): void {
    this.close.emit();
  }
}