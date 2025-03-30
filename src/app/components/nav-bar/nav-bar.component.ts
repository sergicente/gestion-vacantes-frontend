import { Component, inject } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { NgClass, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    this.serviceCategoria.getAll().subscribe((response) => {
      this.arrayCategorias = response;
    });
  }
}
