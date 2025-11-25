import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Hero } from '../hero/hero';
import { ShadeCard } from '../shade-card/shade-card';
import { BaseCard } from '../base-card/base-card';

@Component({
  selector: 'app-content',
  imports: [ Hero, ShadeCard, BaseCard],
  templateUrl: './content.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Content {
  private readonly productService = inject(ProductService);

  shade = this.productService.shades;
  base = this.productService.bases;
  isLoading = this.productService.isLoading;
}
