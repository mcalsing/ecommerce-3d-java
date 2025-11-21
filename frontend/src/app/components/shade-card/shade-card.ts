import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shade-card',
  standalone: true,
  templateUrl: './shade-card.html',
})
export class ShadeCard {
  @Input() shade: any;
}
