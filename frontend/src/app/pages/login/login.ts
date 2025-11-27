import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, LoginRequest } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <main class="">
      <div class="flex flex-col font-inter items-center mb-37 mt-32">
        <div class="flex border border-slate-400 justify-center rounded-sm w-80 cursor-pointer gap-1 px-6 py-3">
          <img src="https://images3dproducts.s3.us-east-1.amazonaws.com/google.svg" alt="Logo" />
          <button type="button" class="text-slate-700 text-sm font-medium">
            Continue with Google
          </button>
        </div>
        <div class="flex gap-4 items-center mb-[34px] mt-8">
          <span class="border-b border-slate-400 w-33"></span>
          <span class="text-sm font-medium">OR</span>
          <span class="border-b border-slate-400 w-33"></span>
        </div>
        
        @if (errorMessage()) {
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-80">
            {{ errorMessage() }}
          </div>
        }

        <form (ngSubmit)="handleLogin()" #loginForm="ngForm" class="flex flex-col">
          <div class="flex flex-col w-80 mx-auto">
            <label class="text-sm font-medium" for="email">Email</label>
            <input 
              class="border border-slate-400 rounded-md text-b700 px-[15px] py-2.5"
              type="email"
              id="email"
              name="email"
              [(ngModel)]="formData.email"
              required
            />
          </div>
          <div class="flex flex-col w-80 mt-5 mx-auto">
            <label class="text-sm font-medium" for="password">Password</label>
            <input 
              class="border border-slate-400 rounded-md text-b700 px-[15px] py-2.5"
              type="password" 
              id="password"
              name="password"
              [(ngModel)]="formData.password"
              required
            />
          </div>
          <button 
            type="submit" 
            [disabled]="isLoading() || !loginForm.valid"
            class="bg-green-800 flex justify-center items-center gap-2 rounded-sm mt-10 text-sm text-slate-100 w-80 cursor-pointer font-medium mx-auto py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-900"
          >
            @if (isLoading()) {
              <span>Entrando...</span>
            } @else {
              <span>Login</span>
            }
          </button>
        </form>
        <div class="text-sm mt-6 text-slate-500">
          <span>Don't have an account?</span>
          <a class="ml-1 border-b border-slate-400 cursor-pointer" routerLink="/signup">Sign up</a>
        </div>
      </div>
    </main>
  `,
})
export class Login {
   private authService = inject(AuthService);
  private router = inject(Router);

  formData: LoginRequest = {
    email: '',
    password: '',
  };

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  handleLogin(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.login(this.formData).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err.error?.message || 'Email ou senha incorretos.'
        );
      },
    });
  }
}
