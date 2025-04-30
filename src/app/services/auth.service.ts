import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// auth.service.ts
export class AuthService {
  private user: { email: string, rol?: string } | null = null;

  setUser(user: { email: string, rol?: string }) {
    this.user = user; // Guarda el usuario
  }

  getUser() {
    return this.user; // Retorna el usuario actual o null
  }

  getRol(): string {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    return usuario.rol || '';
  }

  logout() {
    this.user = null; // Limpia el estado
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}

