import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-aplicar-vacante',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './form-aplicar-vacante.component.html',
  styleUrl: './form-aplicar-vacante.component.css'
})
export class FormAplicarVacanteComponent {

  router = inject(Router);
  solicitud = {
    email: '',
    comentarios: '',
    archivo: null as File | null,
    curriculum: '',
    idVacante: 0
  };

  constructor(
    private solicitudService: SolicitudService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const usuarioJson = localStorage.getItem('usuario');
    if (usuarioJson) {
      const usuario = JSON.parse(usuarioJson);
      this.solicitud.email = usuario.email;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.solicitud.idVacante = Number(id);
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.solicitud.archivo = file;
      this.solicitud.curriculum = file.name;
    }
  }

  // enviarSolicitud() {
  //   if (!this.solicitud.comentarios) {
  //     alert('Completa los comentarios antes de enviar');
  //     return;
  //   }

  //   const usuarioJson = localStorage.getItem('usuario');
  //   if (usuarioJson) {
  //     const usuario = JSON.parse(usuarioJson);
  //     this.solicitud.email = usuario.email; // Asegúrate que es el email
  //   }

  //   const solicitudPayload = {
  //     email: this.solicitud.email,
  //     comentarios: this.solicitud.comentarios,
  //     curriculum: this.solicitud.curriculum,
  //     archivo: this.solicitud.curriculum, // solo mandamos el nombre del archivo
  //     idVacante: this.solicitud.idVacante
  //   };

  //   this.solicitudService.nuevo(solicitudPayload).subscribe(res => {
  //     alert('Solicitud enviada con éxito');
  //     this.router.navigate(['/vacante/'+ this.solicitud.idVacante]);

  //   }, err => {
  //     alert('Hubo un error al enviar la solicitud');
  //   });
  // }
  toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  enviarSolicitud() {
    if (!this.solicitud.comentarios) {
      // Toast de error
      this.toast.fire({
        icon: 'error',
        title: 'Debes añadir tus comentarios para aplicar a la vacante'
      });
      return;
    } else if(!this.solicitud.archivo){
      // Toast de error
      this.toast.fire({
        icon: 'error',
        title: 'Debes adjuntar también tu currículum vitae'
      });
      return;
    }

    const formData = new FormData();
    formData.append('email', this.solicitud.email);
    formData.append('comentarios', this.solicitud.comentarios);
    formData.append('idVacante', this.solicitud.idVacante.toString());
    formData.append('archivo', this.solicitud.archivo);

    this.solicitudService.nuevo(formData).subscribe(res => {
      // Toast de éxito
      this.toast.fire({
        icon: 'success',
        title: '¡Solicitud enviada con éxito!'
      });
      this.router.navigate(['/vacante/' + this.solicitud.idVacante]);
    }, err => {
      console.error('Error al enviar la solicitud:', err);
      // Toast de error
      this.toast.fire({
        icon: 'error',
        title: 'Error al enviar la solicitud'
      });
    });
  }
}