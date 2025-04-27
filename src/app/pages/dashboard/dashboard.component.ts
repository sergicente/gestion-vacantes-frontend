import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2'

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

  toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  logout() {
    // Toast de éxito
    this.toast.fire({
      icon: 'success',
      title: 'Se ha cerrado la sesión'
    });
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
