import { Component, inject } from '@angular/core';
import { VacanteService } from '../../services/vacante.service';
import { CardVacanteComponent } from "../../components/card-vacante/card-vacante.component";
import { NgxPaginationModule} from 'ngx-pagination'; 
import { CategoriaService } from '../../services/categoria.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Ivacante } from '../../interfaces/ivacante';

@Component({
  selector: 'app-home',
  imports: [CardVacanteComponent, NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  serviceVacante = inject(VacanteService);
  serviceCategoria = inject(CategoriaService);
  route= inject(Router)
  itemsPorPagina: number = 6;
  paginaActual!: number;
  totalPaginas!: number;
  arrayVacantes: Ivacante[];
  arrayCategorias!: any[];
  activatedRoute = inject(ActivatedRoute);



  constructor() {
    this.arrayVacantes = [];
    this.paginaActual= 1;
  };

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const termino = params['busqueda'];
      if (termino) {
        this.serviceVacante.buscarVacantes(termino).subscribe(vacantes => {
          this.arrayVacantes = vacantes;
          this.totalPaginas = Math.ceil(this.arrayVacantes.length / this.itemsPorPagina);
        });
      } else {
        this.serviceVacante.getAllCreadas().subscribe(response => {
          this.arrayVacantes = response;
          this.totalPaginas = Math.ceil(this.arrayVacantes.length / this.itemsPorPagina);
        });
      }
    });
  
    this.serviceCategoria.getAll().subscribe((response) => {
      this.arrayCategorias = response;
    });
  }
}
