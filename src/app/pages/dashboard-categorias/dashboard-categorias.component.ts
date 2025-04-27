import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-categorias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-categorias.component.html'
})
export class DashboardCategoriasComponent implements OnInit {
  rol: string = '';
  router = inject(Router);
  authService = inject(AuthService);

  ngOnInit() {
    this.rol = this.authService.getRol();
    if (this.rol !== 'ADMON') {
      this.router.navigate(['/']);
    }
  }
} 