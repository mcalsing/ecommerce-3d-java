import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, RegisterRequest } from '../../services/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <main class="">
      <div class="flex flex-col font-inter items-center mb-37 mt-32">
        <div>
          <div class="flex border border-slate-400 justify-center rounded-sm w-80 cursor-pointer gap-1 px-6 py-3">
            <img src="https://images3dproducts.s3.us-east-1.amazonaws.com/google.svg" alt="Logo" />
            <button type="button" class="text-slate-700 border-slate-400 text-sm font-medium">
              Continue with Google
            </button>
          </div>
          <div class="flex gap-4 items-center mb-[34px] mt-8">
            <span class="border-b border-slate-400 w-33"></span>
            <span class="text-sm font-medium">OR</span>
            <span class="border-b border-slate-400 w-33"></span>
          </div>
          
          @if (errorMessage()) {
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {{ errorMessage() }}
            </div>
          }
          
          @if (successMessage()) {
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {{ successMessage() }}
            </div>
          }

          <form (ngSubmit)="handleRegister()" #registerForm="ngForm" class="flex flex-col">
            <div class="flex flex-col w-80 mx-auto">
              <label class="text-sm font-medium" for="name">Name</label>
              <input 
                class="border border-slate-400 rounded-md text-b700 px-[15px] py-2.5"
                type="text"
                id="name"
                name="name"
                [(ngModel)]="formData.name"
                required
              />
            </div>
            <div class="flex flex-col w-80 mt-5 mx-auto">
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
                minlength="6"
              />
            </div>
            <button 
              type="submit" 
              [disabled]="isLoading() || !registerForm.valid"
              class="flex bg-green-800 justify-center rounded-sm text-sm text-slate-100 w-80 cursor-pointer font-medium gap-2 items-center justity-center py-3 mt-5 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-900"
            >
              @if (isLoading()) {
                <span>Criando conta...</span>
              } @else {
                <span>Create account</span>
              }
            </button>
          </form>
          <div class="text-sm mt-6 text-center text-slate-500">
            <span>Already have an account?</span>
            <a class="ml-1 border-b border-slate-400 cursor-pointer" routerLink="/login">Log in</a>
          </div>
        </div>
      </div>
    </main>
  `,
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  formData: RegisterRequest = {
    name: '',
    email: '',
    password: '',
  };

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  handleRegister(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.authService.register(this.formData).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set('Conta criada com sucesso! Faça login para continuar.');
        
        // Redireciona para página de login após 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err.error?.message || err.message || 'Erro ao criar conta. Tente novamente.'
        );
      },
    });
  }
}