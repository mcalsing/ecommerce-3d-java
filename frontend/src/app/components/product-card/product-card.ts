import { Component, Input, inject } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';


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
