import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { catchError, throwError, Observable } from 'rxjs';
import { Shade } from '../models/shade';
import { Base } from '../models/base';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:8080/';

  shades = signal<Shade[]>([]);
  bases = signal<Base[]>([]);
  isLoading = signal(false);

  constructor() {
    this.loadShades();
    this.loadBases();
  }

  private loadShades(): void {
    this.isLoading.set(true);
    this.http.get<Shade[]>(`${this.url}shades`).subscribe({
      next: (data) => {
        this.shades.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  private loadBases(): void {
    this.isLoading.set(true);
    this.http.get<Base[]>(`${this.url}bases`).subscribe({
      next: (data) => {
        this.bases.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  fetchShadeById(id: number): Observable<Shade> {
    return this.http.get<Shade>(`${this.url}shades/${id}`).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  fetchBaseById(id: number): Observable<Base> {
    return this.http.get<Base>(`${this.url}bases/${id}`).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}