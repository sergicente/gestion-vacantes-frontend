import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  rol: string = '';
  usuario: string = '';
  idEmpresa: number = 0;

  router = inject(Router);
  empresaService = inject(EmpresaService);

  ngOnInit(): void {
    const usuarioJson = localStorage.getItem('usuario');
    if (usuarioJson) {
      const usuario = JSON.parse(usuarioJson);
      this.rol = usuario.rol;
      this.usuario = usuario.nombre;
      console.log(usuario)

      if (usuario.rol == 'EMPRESA') {
        const email = usuario.email;
        console.log(email);

        this.empresaService.buscarPorEmail(email).subscribe({
          next: (empresa) => {
            this.idEmpresa = empresa.idEmpresa;
            console.log(this.idEmpresa);
          },
          error: (err) => {
            console.error('Error al buscar empresa por email:', err);
          }
        });
      }
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
    this.toast.fire({
      icon: 'success',
      title: 'Se ha cerrado la sesión'
    });
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}