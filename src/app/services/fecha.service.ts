import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechaService {


  // Formatea una fecha en el formato "2 de febrero del 2015"
  formatearFecha(fechaStr: string | Date): string {
    if (!fechaStr) {
      return "Fecha inválida";
    }

    const fecha = new Date(fechaStr);

    if (isNaN(fecha.getTime())) {
      console.warn('Fecha no válida:', fechaStr);
      return "Fecha inválida";
    }

    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}
