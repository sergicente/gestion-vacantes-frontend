import { Component, inject } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  imports: [NgClass, NgFor],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  isMenuOpen = false;
  serviceCategoria = inject(CategoriaService);
  arrayCategorias!: any[];
  router = inject(Router);


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
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }


}
