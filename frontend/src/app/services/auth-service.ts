import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message?: string;
  email?: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  name?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly url = 'http://localhost:8080/auth';
  
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly USER_KEY = 'user_data';

  isAuthenticated = signal(false);
  currentUser = signal<{ email: string; name?: string } | null>(null);

  constructor() {
    this.checkAuthentication();
  }

  private checkAuthentication(): void {
    const token = this.getToken();
    if (token) {
      this.isAuthenticated.set(true);
      const userData = localStorage.getItem(this.USER_KEY);
      if (userData) {
        this.currentUser.set(JSON.parse(userData));
      }
    }
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.url}/register`, data).pipe(
      catchError((error) => {
        console.error('Erro no registro:', error);
        return throwError(() => error);
      })
    );
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/login`, data).pipe(
      tap((response) => this.handleAuthSuccess(response)),
      catchError((error) => {
        console.error('Erro no login:', error);
        return throwError(() => error);
      })
    );
  }

  private handleAuthSuccess(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(
      this.USER_KEY,
      JSON.stringify({ email: response.email, name: response.name })
    );
    this.isAuthenticated.set(true);
    this.currentUser.set({ email: response.email, name: response.name });
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }
}