import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:8080/';

  // signals para gerenciar estado
  shades = signal<any>([]);
  bases = signal<any>([]);
  isLoading = signal(false);

  constructor() {
    this.loadShades();
    this.loadBases();
  }

  private loadShades(): void {
    this.isLoading.set(true);
    this.http.get<any>(this.url + 'shades').subscribe({
      next: (data) => {
        this.shades.set(data);
        this.isLoading.set(false);
      }
    });
  }

  private loadBases(): void {
    this.isLoading.set(true);
    this.http.get<any>(this.url + 'bases').subscribe({
      next: (data) => {
        this.bases.set(data);
        this.isLoading.set(false);
      }
    });
  }
}