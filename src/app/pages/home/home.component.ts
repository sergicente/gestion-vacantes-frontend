import { Component, inject } from '@angular/core';
import { VacanteService } from '../../services/vacante.service';
import { CardVacanteComponent } from "../../components/card-vacante/card-vacante.component";
import {NgxPaginationModule} from 'ngx-pagination'; 
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-home',
  imports: [CardVacanteComponent, NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  serviceVacante = inject(VacanteService);
  serviceCategoria = inject(CategoriaService);
  itemsPorPagina: number = 10;
  paginaActual!: number;
  totalPaginas!: number;
  arrayVacantes: any[];
  arrayCategorias!: any[];


  constructor() {
    this.arrayVacantes = [];
  };

  ngOnInit(): void {
    this.serviceVacante.getAll().subscribe((response) => {
      console.log(response);
      this.arrayVacantes = response;
      this.totalPaginas = Math.ceil(this.arrayVacantes.length / this.itemsPorPagina);

    });
    this.serviceCategoria.getAll().subscribe((response) => {
      console.log(response);
      this.arrayCategorias = response;
    });
  }

}
