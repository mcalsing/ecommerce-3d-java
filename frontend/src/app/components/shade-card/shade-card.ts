import { Component,ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-shade-card',
  standalone: true,
  templateUrl: './shade-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShadeCard {
  shade = input.required<any>();
}
