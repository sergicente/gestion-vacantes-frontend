import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { CardVacanteComponent } from "../../components/card-vacante/card-vacante.component";
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-empresa-lista-vacantes',
  imports: [CardVacanteComponent, NgxPaginationModule],
  templateUrl: './empresa-lista-vacantes.component.html',
  styleUrl: './empresa-lista-vacantes.component.css'
})
export class EmpresaListaVacantesComponent implements OnInit {
  service = inject(EmpresaService);
  empresa:any = {};
  array!: any[];
  activatedRoute = inject(ActivatedRoute);
  itemsPorPagina: number = 10;
  paginaActual!: number;
  totalPaginas!: number;

  constructor() {
    this.array = [];
  };

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      const id: string = params.id;
      this.service.getById(id).subscribe((peticion)=>{
        this.empresa = peticion;
        console.log(this.empresa);
      })
      this.service.getAllConVacantes(id).subscribe((peticion) => {
        this.array = peticion;
        this.totalPaginas = Math.ceil(this.array.length / this.itemsPorPagina);

        console.log(this.array);
      });
    });
  }

}
