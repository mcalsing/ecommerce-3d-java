import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-base-card',
  standalone: true,
  templateUrl: './base-card.html',
  styleUrl: './base-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseCard {
  base = input.required<any>();
}
