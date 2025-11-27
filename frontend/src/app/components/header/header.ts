import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { CartModal } from '../cart-modal/cart-modal';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgOptimizedImage, CartModal],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  cartService = inject(CartService);
  authService = inject(AuthService);
  router = inject(Router);

  cartModalOpen = signal(false);

  logout() {
    this.authService.logout();
  }
}
