import { Component, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { CartService } from '../../services/cart-service';


@Component({
  selector: 'app-shade-card',
  standalone: true,
  templateUrl: './shade-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShadeCard {
  shade = input.required<any>();
  private cartService = inject(CartService);

  addToCart(): void {
    this.cartService.addItem(this.shade(), 'shade');
  }
}
