import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VacanteDetalleComponent } from './pages/vacante-detalle/vacante-detalle.component';
import { Pagina404Component } from './pages/pagina404/pagina404.component';
import { EmpresaListaComponent } from './pages/empresa-lista/empresa-lista.component';
import { EmpresaListaVacantesComponent } from './pages/empresa-lista-vacantes/empresa-lista-vacantes.component';
import { FormLoginComponent } from './pages/form-login/form-login.component';
import { CategoriaListaVacantesComponent } from './pages/categoria-lista-vacantes/categoria-lista-vacantes.component';
import { FormComponent } from './pages/form/form.component';
import { FormRegisterComponent } from './pages/form-register/form-register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormAplicarVacanteComponent } from './pages/form-aplicar-vacante/form-aplicar-vacante.component';
import { MisSolicitudesComponent } from './pages/mis-solicitudes/mis-solicitudes.component';
import { EditarEmpresaComponent } from './pages/editar-empresa/editar-empresa.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'vacante/:id', component: VacanteDetalleComponent },
  { path: 'empresas', component: EmpresaListaComponent },
  { path: 'empresa/:id', component: EmpresaListaVacantesComponent },
  { path: 'empresas/:id/editar', component: EditarEmpresaComponent },
  { path: 'login', component: FormLoginComponent },
  { path: 'register', component: FormRegisterComponent },
  { path: 'categoria/:id', component: CategoriaListaVacantesComponent },
  { path: 'vacante/modificar/:id', component: FormComponent },
  { path: 'formulario', component: FormComponent },
  { path: 'actualizarOferta', component: FormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'aplicar/:id', component: FormAplicarVacanteComponent },
  { path: 'solicitudes', component: MisSolicitudesComponent },
  { path: 'perfil', component: FormRegisterComponent },
  { path: '**', component: Pagina404Component },
  { path: "**", redirectTo: "home" }

  // {path:"vacante/:id", component: ViewComponent},
  // {path:"actualizar/:id", component: },

];
