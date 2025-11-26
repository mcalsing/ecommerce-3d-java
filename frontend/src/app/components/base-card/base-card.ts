import { Component, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-base-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './base-card.html',
  styleUrl: './base-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseCard {
  base = input.required<any>();
  private cartService = inject(CartService);

  addToCart(): void {
    this.cartService.addItem(this.base(), 'base', '#FFFFFF');
  }

  consoleType(): void {
    console.log(this.base)
  }
}
