import { CommonModule, NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FechaService } from '../../services/fecha.service';
import { Router, RouterModule } from '@angular/router';
import { VacanteService } from '../../services/vacante.service';

@Component({
  selector: 'app-card-vacante',
  imports: [NgClass, RouterModule, CommonModule],
  templateUrl: './card-vacante.component.html',
  styleUrl: './card-vacante.component.css'
})
export class CardVacanteComponent {
  @Input() item!: any;
  fechaService = inject(FechaService);
  router = inject(Router);
vacanteService = inject(VacanteService);



  formatearFecha(fecha: string | Date): string {
    return this.fechaService.formatearFecha(fecha);
  }

  imagenError(event: any) {
    event.target.src = 'http://localhost:9001/uploads/sin_imagen.png';
  }


  editar(id: number) {
    this.router.navigate(['/vacante/editar', id]);
  }
  
  eliminar(id: number) {
    if (confirm('¿Seguro que quieres eliminar esta vacante?')) {
      this.vacanteService.borrar(id).subscribe(() => {
        window.location.reload(); // o emitir un evento al padre si quieres evitar reload
      });
    }
  }
  

  
}
