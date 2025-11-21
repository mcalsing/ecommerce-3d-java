import { Component, Input } from '@angular/core';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-product-card',
  // imports: [],
  standalone: true,
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() shade: any;

}
