import { Component, ChangeDetectionStrategy, inject, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-cart-modal',
  imports: [NgOptimizedImage],
  template: `
    <div class="fixed inset-0 bg-black/50 z-40" (click)="onClose()"></div>
    <div class="fixed right-0 top-0 w-96 h-full bg-white shadow-lg z-50 flex flex-col">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-2xl font-bold">Carrinho</h2>
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
          <p class="text-center text-gray-500">Seu carrinho está vazio</p>
        } @else {
          @for (item of cartService.items$(); track item.id) {
            <div class="flex gap-4 mb-4 pb-4 border-b">
              <img
                [ngSrc]="'assets/' + item.image"
                [alt]="item.name"
                width="80"
                height="80"
                class="w-20 h-20 object-cover rounded"
              />
              <div class="flex-1">
                <h3 class="font-semibold">{{ item.name }}</h3>
                <p class="text-gray-600">R$ {{ item.price.toFixed(2) }}</p>
                <div class="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    class="px-2 py-1 bg-gray-200 rounded"
                    (click)="cartService.updateQuantity(item.id, item.quantity - 1)"
                  >
                    −
                  </button>
                  <span>{{ item.quantity }}</span>
                  <button
                    type="button"
                    class="px-2 py-1 bg-gray-200 rounded"
                    (click)="cartService.updateQuantity(item.id, item.quantity + 1)"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    class="ml-auto text-red-600 text-sm"
                    (click)="cartService.removeItem(item.id)"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          }
        }
      </div>

      <div class="border-t p-4 space-y-4">
        <div class="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>R$ {{ cartService.totalPrice().toFixed(2) }}</span>
        </div>
        <button
          type="button"
          class="w-full bg-green-800 text-white py-3 rounded font-bold"
          [disabled]="cartService.items$().length === 0"
        >
          Finalizar Compra
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