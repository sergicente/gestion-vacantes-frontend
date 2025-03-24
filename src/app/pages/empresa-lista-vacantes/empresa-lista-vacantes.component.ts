import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { CardVacanteComponent } from "../../components/card-vacante/card-vacante.component";

@Component({
  selector: 'app-empresa-lista-vacantes',
  imports: [CardVacanteComponent],
  templateUrl: './empresa-lista-vacantes.component.html',
  styleUrl: './empresa-lista-vacantes.component.css'
})
export class EmpresaListaVacantesComponent implements OnInit {
  service = inject(EmpresaService);
  empresa:any = {};
  array!: any[];
  activatedRoute = inject(ActivatedRoute);

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
        console.log(this.array);
      });
    });
  }

}
