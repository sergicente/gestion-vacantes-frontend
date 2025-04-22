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
  serviceCategoria = inject(CategoriaService);
  arrayCategorias!: any[];
  router = inject(Router);
  rol: string = '';
  usuario: string = '';




  estaLogeado(): boolean {
    return localStorage.getItem('usuario') !== null;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    this.serviceCategoria.getAll().subscribe((response) => {
      this.arrayCategorias = response;
    });
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
