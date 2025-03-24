import { Component, inject } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { CardEmpresaComponent } from "../../components/card-empresa/card-empresa.component";

@Component({
  selector: 'app-empresa-lista',
  imports: [CardEmpresaComponent],
  templateUrl: './empresa-lista.component.html',
  styleUrl: './empresa-lista.component.css'
})
export class EmpresaListaComponent {
  service = inject(EmpresaService);

  array: any[];

  constructor() {
    this.array = [];
  };

  ngOnInit(): void {
    this.service.getAllVacantes().subscribe((response) => {
      console.log(response);
      this.array = response;
    });
  }

}
