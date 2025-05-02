import { VacanteService } from './../../services/vacante.service';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-button',
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  vacanteService = inject(VacanteService);
  router = inject(Router);
  @Input() id: string;
  @Input() parent: string;
  @Input() nombre: string;

  constructor() {
    this.id = '';
    this.nombre = '';
    this.parent = '';
  }
  async borrar(idVacante: string) {
    let confirmacion = confirm(
      ' Do you want to delete the user: ' + this.id + '?'
    );
    if (confirmacion) {
      const response = await firstValueFrom(
        this.vacanteService.deleteById(Number(idVacante))
      );

      if (response.idVacante) {
        alert('The user has been successfully deleted ' + response.nombre);
        if (this.parent == 'view') {
          this.router.navigate(['/home']);
        } else if (this.parent == 'card') {
          location.reload();
        }
      }
    }
  }
}
