import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { BaseCard } from '../base-card/base-card';
import { ShadeCard } from '../shade-card/shade-card';
import { Hero } from '../hero/hero';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [BaseCard, ShadeCard, Hero],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content {
  _productService = inject(ProductService);
  
  base = this._productService.bases;
  shade = this._productService.shades;
}
