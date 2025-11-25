import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { CartModal } from '../cart-modal/cart-modal';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgOptimizedImage, CartModal],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  cartService = inject(CartService);
  cartModalOpen = signal(false);
}
