import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { CardVacanteComponent } from "../../components/card-vacante/card-vacante.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { VacanteService } from '../../services/vacante.service';

@Component({
  selector: 'app-empresa-lista-vacantes',
  imports: [CardVacanteComponent, NgxPaginationModule],
  templateUrl: './empresa-lista-vacantes.component.html',
  styleUrl: './empresa-lista-vacantes.component.css'
})
export class EmpresaListaVacantesComponent implements OnInit {
  service = inject(EmpresaService);
  vacanteService = inject(VacanteService);

  empresa: any = {};
  array: any[] = [];
  activatedRoute = inject(ActivatedRoute);
  itemsPorPagina: number = 10;
  paginaActual: number = 1;
  totalPaginas!: number;

  ngOnInit() {
    
    const empresaId = Number(localStorage.getItem('empresaId'));
    console.log("ID de empresa que se usa:", empresaId);
  
    if (empresaId) {
      // 💡 convertir empresaId a string para que no dé error
      this.service.getById(empresaId.toString()).subscribe((peticion) => {
        this.empresa = peticion;
        console.log("Empresa cargada:", this.empresa);
      });
  
      this.vacanteService.getVacantesPorEmpresa(empresaId).subscribe((peticion) => {
        this.array = peticion;
        this.totalPaginas = Math.ceil(this.array.length / this.itemsPorPagina);
        console.log("Vacantes cargadas:", this.array);
      });
    } else {
      console.error("No se encontró empresaId en el localStorage.");
    }
  }
  
}
