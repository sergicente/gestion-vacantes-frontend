import { VacanteService } from './../../services/vacante.service';
import { Component, inject } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { ActivatedRoute } from '@angular/router';
import { CardVacanteComponent } from "../../components/card-vacante/card-vacante.component";
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-categoria-lista-vacantes',
  imports: [CardVacanteComponent, NgxPaginationModule],
  templateUrl: './categoria-lista-vacantes.component.html',
  styleUrl: './categoria-lista-vacantes.component.css'
})
export class CategoriaListaVacantesComponent {
  service = inject(CategoriaService);
  serviceVacantes = inject(VacanteService);
  categoria:any = {};
  array!: any[];
  itemsPorPagina: number = 10;
  paginaActual!: number;
  totalPaginas!: number;
  activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.array = [];
  };

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      const id: string = params.id;
      this.service.getById(id).subscribe((peticion)=>{
        this.categoria = peticion;
        console.log(this.categoria);
      })
      this.serviceVacantes.getAllCreadas().subscribe((peticion) => {
        this.array = peticion.filter((vacante: any) => vacante.categoria?.idCategoria == id);
        this.totalPaginas = Math.ceil(this.array.length / this.itemsPorPagina);
        console.log(this.array);
      });
    });
  }

}
