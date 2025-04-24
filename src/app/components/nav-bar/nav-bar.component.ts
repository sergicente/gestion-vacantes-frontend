import { Component, inject } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, NgClass],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isMenuOpen = false;
  arrayCategorias: any[] = [];

  // servicios
  serviceCategoria = inject(CategoriaService);
  router           = inject(Router);

  //  helpers sencillos 
  get rol(): string {
    const raw = localStorage.getItem('usuario');
    return raw ? JSON.parse(raw).rol : '';
  }

  get usuario(): string {
    const raw = localStorage.getItem('usuario');
    return raw ? JSON.parse(raw).nombre : '';
  }

  estaLogeado(): boolean {
    return !!localStorage.getItem('usuario');
  }

  // interacción UI
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  //  cargar categorías
  ngOnInit(): void {
    this.serviceCategoria.getAll().subscribe(res => (this.arrayCategorias = res));
  }
}