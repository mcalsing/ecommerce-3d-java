import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-product-detail',
  template: `
    <main class="max-w-4xl mx-auto p-4">
      @if (loading()) {
        <p>Carregando...</p>
      } @else if (error()) {
        <p class="text-red-600">{{ error() }}</p>
      } @else if (!product()) {
        <p>Produto não encontrado</p>
      } @else {
        <div class="grid md:grid-cols-2 items-start mt-10">
          <div>
            <img
              [src]="product().image"
              [alt]="product().name"
              width="600"
              height="400"
              class="w-full object-cover rounded"
            />
          </div>

          <div class="ml-15">
            <h1 class="text-2xl font-bold mb-2">{{ product().name }}</h1>
            <p class="text-gray-600 mb-4">R$ {{ product().price?.toFixed(2) }}</p>
            <p class="mb-6">{{ product().description || '' }}</p>

            <!-- COLORS SECTION -->
            <div class="mb-6">
              <h2 class="text-b500 text-xs font-medium mb-2.5">AVAILABLE COLORS</h2>
              <div class="flex cursor-pointer gap-2.5 mb-4">
                @for (color of availableColors; track color) {
                  <button
                    type="button"
                    class="w-8 h-8 rounded-full border-3 transition-all"
                    [class.border-slate-100]="selectedColor() === color"
                    [class.border-slate-200]="selectedColor() !== color"
                    [class.outline]="selectedColor() === color"
                    [style.backgroundColor]="color"
                    (click)="selectedColor.set(color)"
                    [attr.aria-label]="'Selecionar cor ' + color"
                  ></button>
                }
              </div>
            </div>

            <!-- QUANTITY SECTION -->
            <div class="mb-10">
              <h2 class="text-b500 text-xs font-medium mb-2.5">QUANTITY</h2>
              <div class="flex border border-gray-300 h-11 justify-between rounded w-41 items-center px-4">
                <button
                  type="button"
                  class="cursor-pointer hover:opacity-70"
                  (click)="decrementQuantity()"
                  aria-label="Diminuir quantidade"
                >
                  −
                </button>
                <span class="font-semibold">{{ quantity() }}</span>
                <button
                  type="button"
                  class="cursor-pointer hover:opacity-70"
                  (click)="incrementQuantity()"
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>
              </div>
            </div>

            <!-- ADD TO CART BUTTON -->
            <div class="flex gap-3">
              <button
                type="button"
                class="bg-green-800 text-white px-6 py-2 rounded font-bold hover:bg-green-900"
                (click)="addToCart()"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      }
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product = signal<any | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  selectedColor = signal<string>('white');
  quantity = signal(1);

  // cores fixas: branco e marrom
  availableColors = ['#FFFFFF', '#8B6F47'];

  constructor() {
    this.route.paramMap.subscribe(pm => {
      const idRaw = pm.get('id');
      const id = idRaw ? Number(idRaw) : NaN;
      if (!Number.isFinite(id)) {
        this.product.set(null);
        this.loading.set(false);
        this.error.set('ID inválido');
        return;
      }

      this.loading.set(true);
      this.error.set(null);
      this.productService.fetchProductById(id).subscribe({
        next: (p) => {
          if (p && !p.type) {
            p.type = (p?.category === 'base' || p?.kind === 'base') ? 'base' : 'shade';
          }
          this.product.set(p);
          this.loading.set(false);
        },
        error: (err) => {
          this.product.set(null);
          this.error.set('Erro ao carregar produto');
          this.loading.set(false);
          console.error(err);
        }
      });
    });
  }

  incrementQuantity(): void {
    this.quantity.update(q => q + 1);
  }

  decrementQuantity(): void {
    this.quantity.update(q => (q > 1 ? q - 1 : 1));
  }

  addToCart(): void {
    const p = this.product();
    if (!p) return;
    const type = p.type === 'base' ? 'base' : 'shade';
    const qty = this.quantity();

    // adiciona ao carrinho com a quantidade selecionada
    for (let i = 0; i < qty; i++) {
      this.cartService.addItem(p, type);
    }

    // reseta quantidade após adicionar
    this.quantity.set(1);
  }
}