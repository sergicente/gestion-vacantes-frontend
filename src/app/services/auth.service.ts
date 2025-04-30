import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// auth.service.ts
export class AuthService {
  private usuario: { email: string, idEmpresa?: number } | null = null;

  setUser(usuario: { email: string, idEmpresa?: number }) {
    this.usuario = usuario;
  }

  getUser() {
      const usuario = localStorage.getItem('usuario');
      return usuario ? JSON.parse(usuario) : null;
    }
    

  clearUser() {
    this.usuario = null;
  }
}

