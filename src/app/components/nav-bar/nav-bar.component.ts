import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-nav-bar',
  imports: [NgClass],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isMenuOpen = false;
  serviceCategoria = inject(CategoriaService);
  arrayCategorias!: any[];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    this.serviceCategoria.getAll().subscribe((response) => {
      this.arrayCategorias = response;
    });
  }

}
