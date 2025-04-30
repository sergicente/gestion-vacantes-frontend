import { Component, inject } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import Swal from 'sweetalert2'
import { FormsModule, NgModel } from '@angular/forms';
import { VacanteService } from '../../services/vacante.service';


@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, NgClass, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  isMenuOpen = false;
  arrayCategorias: any[] = [];
  busqueda: string = '';
  servicioVacantes= inject(VacanteService);

  // servicios
  serviceCategoria = inject(CategoriaService);
  router           = inject(Router);

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

  //  helpers sencillos 
  get rol(): string {
    const raw = localStorage.getItem('usuario');
    return raw ? JSON.parse(raw).rol : '';
  }

  get usuario(): string {
    const raw = localStorage.getItem('usuario');
    return raw ? JSON.parse(raw).nombre : '';
  }

  enviarBusqueda() {
    const termino = this.busqueda.trim();
    if (!termino) return;
  
    this.router.navigate(['/home'], { queryParams: { busqueda: termino } });
  }

  estaLogeado(): boolean {
    return !!localStorage.getItem('usuario');
  }

  // interacción UI
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
        // Toast de éxito
        this.toast.fire({
          icon: 'success',
          title: 'Se ha cerrado la sesión'
        });
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  //  cargar categorías
  ngOnInit(): void {
    this.serviceCategoria.getAll().subscribe(res => (this.arrayCategorias = res));
  }
}