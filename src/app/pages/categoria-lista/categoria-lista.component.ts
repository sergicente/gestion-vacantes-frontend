import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Icategoria } from '../../interfaces/icategoria';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categoria-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categoria-lista.component.html',
  styleUrls: ['./categoria-lista.component.css']
})
export class CategoriaListaComponent implements OnInit {
  categorias: Icategoria[] = [];
  rol: string = '';
  showForm: boolean = false;
  categoriaSeleccionada: Icategoria = {
    idCategoria: 0,
    nombre: '',
    descripcion: ''
  };

  categoriaService = inject(CategoriaService);
  router = inject(Router);
  authService = inject(AuthService);

  ngOnInit() {
    this.rol = this.authService.getRol();
    this.loadCategorias();
  }

  loadCategorias() {
    this.categoriaService.getAll().subscribe((response) => {
      this.categorias = response;
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.categoriaSeleccionada = {
        idCategoria: 0,
        nombre: '',
        descripcion: ''
      };
    }
  }

  editarCategoria(categoria: Icategoria) {
    this.categoriaSeleccionada = categoria;
    this.showForm = true;
    this.categoriaSeleccionada
  }

  eliminarCategoria(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.')) {
      this.categoriaService.borrar(id.toString()).subscribe({
        next: () => {
          this.categorias = this.categorias.filter(cat => cat.idCategoria !== id);
          console.log('Categoría eliminada correctamente');
          alert('Categoría eliminada correctamente');
        },
        error: (error) => {
          console.error('Error al eliminar la categoría:', error);
        }
      });
    }
  }

  handleSubmit(categoria: Icategoria) {
    if (this.categoriaSeleccionada && this.categoriaSeleccionada.idCategoria !== 0) {
      // Modificar categoría existente
      this.categoriaService.modificar(this.categoriaSeleccionada.idCategoria.toString(), categoria).subscribe({
        next: () => {
          const index = this.categorias.findIndex(c => c.idCategoria === this.categoriaSeleccionada?.idCategoria);
          if (index !== -1) {
            this.categorias[index] = { ...this.categorias[index], ...categoria };
          }
          this.toggleForm();
          console.log('Categoría actualizada correctamente');
        },
        error: (error) => {
          console.error('Error al modificar la categoría:', error);
        }
      });
    } else {
      // Crear nueva categoría
      this.categoriaService.crear(categoria).subscribe({
        next: (response) => {
          this.categorias.push(response);
          this.toggleForm();
          console.log('Categoría creada correctamente');
        },
        error: (error) => {
          console.error('Error al crear la categoría:', error);
        }
      });
    }
  }
} 