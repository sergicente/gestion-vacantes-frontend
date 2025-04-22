import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  rol: string = '';
  usuario: string = '';
  router = inject(Router);


  ngOnInit(): void {
    const usuarioJson = localStorage.getItem('usuario');
    if (usuarioJson) {
      const usuario = JSON.parse(usuarioJson);
      this.rol = usuario.rol;
      this.usuario = usuario.nombre;
    }
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
