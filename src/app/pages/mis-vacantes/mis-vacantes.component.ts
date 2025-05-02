import { Component, inject } from '@angular/core';
import { VacanteService } from '../../services/vacante.service';
import { EmpresaService } from '../../services/empresa.service'; // <-- NUEVO
import { CategoriaService } from '../../services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ivacante } from '../../interfaces/ivacante';
import { NgxPaginationModule } from 'ngx-pagination';
import { CardVacanteComponent } from '../../components/card-vacante/card-vacante.component';
import { Iempresa } from '../../interfaces/iempresa';
import { CardVacanteEmpresaComponent } from "../../components/card-vacante-empresa/card-vacante-empresa.component";

@Component({
  selector: 'app-mis-vacantes',
  imports: [NgxPaginationModule, CardVacanteEmpresaComponent],
  templateUrl: './mis-vacantes.component.html',
  styleUrl: './mis-vacantes.component.css'
})
export class MisVacantesComponent {
  serviceVacante = inject(VacanteService);
  serviceEmpresa = inject(EmpresaService); // <-- NUEVO
  route = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  itemsPorPagina: number = 6;
  paginaActual: number = 1;
  totalPaginas!: number;
  arrayVacantes: Ivacante[] = [];

  ngOnInit(): void {
    this.serviceEmpresa.getAll().subscribe((empresas: Iempresa[]) => {
      const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
      const empresaUsuario = empresas.find(emp => emp.email === usuario.email);

      if (empresaUsuario) {
        this.serviceVacante.getAllEmpresa(empresaUsuario.idEmpresa).subscribe((vacantes: Ivacante[]) => {
          this.arrayVacantes = vacantes;
          this.totalPaginas = Math.ceil(this.arrayVacantes.length / this.itemsPorPagina);
        });
      } else {
        console.warn("No se encontró empresa asociada al usuario.");
      }
    });
  }
}