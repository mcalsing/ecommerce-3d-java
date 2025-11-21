import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ProductCard],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content {
  _productService = inject(ProductService);
  shade = this._productService.shades;
}
