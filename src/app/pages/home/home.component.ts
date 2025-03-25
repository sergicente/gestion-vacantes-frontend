import { Component, inject } from '@angular/core';
import { VacanteService } from '../../services/vacante.service';
import { CardVacanteComponent } from "../../components/card-vacante/card-vacante.component";
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-home',
  imports: [CardVacanteComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  serviceVacante = inject(VacanteService);
  serviceCategoria = inject(CategoriaService);

  arrayVacantes: any[];
  arrayCategorias!: any[];


  constructor() {
    this.arrayVacantes = [];
  };

  ngOnInit(): void {
    this.serviceVacante.getAll().subscribe((response) => {
      console.log(response);
      this.arrayVacantes = response;
    });
    this.serviceCategoria.getAll().subscribe((response) => {
      console.log(response);
      this.arrayCategorias = response;
    });
  }

}
