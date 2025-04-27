import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Iempresa } from '../../interfaces/iempresa';
import { IUsuario } from '../../interfaces/iusuario';

@Component({
  selector: 'app-form-empresa',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-empresa.component.html',
  styleUrls: ['./form-empresa.component.css']
})
export class FormEmpresaComponent {
  @Input() empresa: Iempresa = {
    idEmpresa: 0,
    cif: '',
    nombreEmpresa: '',
    direccionFiscal: '',
    pais: '',
    email: ''
  };

  @Input() usuario: IUsuario = {
    email: '',
    password: '',
    rol: 'EMPRESA'
  };

  @Output() onSubmit = new EventEmitter<{empresa: Iempresa, usuario: IUsuario}>();

  submitForm() {
    this.onSubmit.emit({empresa: this.empresa, usuario: this.usuario});
  }
} 