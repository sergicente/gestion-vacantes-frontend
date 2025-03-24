import { Component, inject, Input } from '@angular/core';
import { FechaService } from '../../services/fecha.service';

@Component({
  selector: 'app-card-empresa',
  imports: [],
  templateUrl: './card-empresa.component.html',
  styleUrl: './card-empresa.component.css'
})
export class CardEmpresaComponent {
  @Input() item!: any;
}
