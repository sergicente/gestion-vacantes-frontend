import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Iempresa } from '../../interfaces/iempresa';

@Component({
  selector: 'app-alta-empresa',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './alta-empresa.component.html',
  styleUrl: './alta-empresa.component.css'
})
export class AltaEmpresaComponent implements OnChanges {
  @Input() empresaSeleccionada: Iempresa | null = null;
  @Output() onSubmitForm = new EventEmitter<Iempresa>();
  @Output() onCancelarEdicion = new EventEmitter<void>();

  empresa: Iempresa = {
    idEmpresa: 0,
    cif: '',
    nombreEmpresa: '',
    direccionFiscal: '',
    pais: '',
    email: ''
  };

  passwordGenerada: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['empresaSeleccionada'] && this.empresaSeleccionada) {
      this.empresa = { ...this.empresaSeleccionada };
    } else {
      this.empresa = {
        idEmpresa: 0,
        cif: '',
        nombreEmpresa: '',
        direccionFiscal: '',
        pais: '',
        email: ''
      };
    }
  }

  resetFormulario() {
    this.empresa = {
      idEmpresa: 0,
      cif: '',
      nombreEmpresa: '',
      direccionFiscal: '',
      pais: '',
      email: ''
    };
  }

  formularioInvalido(): boolean {
    const { cif, nombreEmpresa, direccionFiscal, pais, email } = this.empresa;
    return !cif || !nombreEmpresa || !direccionFiscal || !pais || !email;
  }

  onSubmit(): void {
    this.onSubmitForm.emit(this.empresa);
    this.passwordGenerada = null;
  
    if (!this.empresaSeleccionada) {
      this.resetFormulario();
    }
  }

  
}