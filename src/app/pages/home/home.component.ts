import { Component, inject } from '@angular/core';
import { VacanteService } from '../../services/vacante.service';
import { CardVacanteComponent } from "../../components/card-vacante/card-vacante.component";

@Component({
  selector: 'app-home',
  imports: [CardVacanteComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  service = inject(VacanteService);

  array: any[];

  constructor() {
    this.array = [];
  };

  ngOnInit(): void {
    this.service.getAll().subscribe((response) => {
      console.log(response);
      console.log('hola!')
      this.array = response;
    });
  }

}
