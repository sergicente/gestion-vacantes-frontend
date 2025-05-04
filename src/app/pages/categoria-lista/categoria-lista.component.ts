import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Icategoria } from '../../interfaces/icategoria';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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

  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  });

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
      this.resetFormularioCategoria();
    }
  }

  resetFormularioCategoria() {
    this.categoriaSeleccionada = {
      idCategoria: 0,
      nombre: '',
      descripcion: ''
    };
  }

  editarCategoria(categoria: Icategoria) {
    this.categoriaSeleccionada = { ...categoria }; // ← clonado por spread
    this.showForm = true;
  }

  eliminarCategoria(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.borrar(id.toString()).subscribe({
          next: () => {
            this.categorias = this.categorias.filter(cat => cat.idCategoria !== id);
            this.toast.fire({
              icon: 'success',
              title: 'Categoría borrada correctamente'
            });
          },
          error: (error) => {
            console.error('Error al eliminar la categoría:', error);
            if (error.status === 409) {
              this.toast.fire({
                icon: 'error',
                title: 'No se puede eliminar',
                text: 'Esta categoría tiene vacantes asociadas.'
              });
            } else if (error.status === 404) {
              this.toast.fire({
                icon: 'error',
                title: 'No encontrada',
                text: 'La categoría no existe o ya ha sido eliminada.'
              });
            } else {
              this.toast.fire({
                icon: 'error',
                title: 'Error al eliminar la categoría'
              });
            }
          }
        });
      }
    });
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
          this.resetFormularioCategoria();
          this.toast.fire({
            icon: 'success',
            title: 'Categoría actualizada correctamente'
          });
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
          this.resetFormularioCategoria();
          this.toast.fire({
            icon: 'success',
            title: 'Categoría creada correctamente'
          });
          console.log('Categoría creada correctamente');
        },
        error: (error) => {
          console.error('Error al crear la categoría:', error);
        }
      });
    }
  }
}