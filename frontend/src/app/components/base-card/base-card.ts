import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-base-card',
  //imports: [],
  standalone: true,
  templateUrl: './base-card.html',
  styleUrl: './base-card.css',
})
export class BaseCard {
  @Input() base: any;
}
