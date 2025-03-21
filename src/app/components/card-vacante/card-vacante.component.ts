import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-vacante',
  imports: [NgClass],
  templateUrl: './card-vacante.component.html',
  styleUrl: './card-vacante.component.css'
})
export class CardVacanteComponent {
  @Input() item!: any;
}
