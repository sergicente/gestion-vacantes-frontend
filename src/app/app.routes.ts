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
import { EmpresaSolicitudesComponent } from './pages/empresa-solicitud/empresa-solicitud.component';
import { EmpresaEditarComponent } from './pages/empresa-editar/empresa-editar.component';
import { FormAplicarVacanteComponent } from './pages/form-aplicar-vacante/form-aplicar-vacante.component';
import { MisSolicitudesComponent } from './pages/mis-solicitudes/mis-solicitudes.component';
import { EditarEmpresaComponent } from './pages/editar-empresa/editar-empresa.component';
import { AltaEmpresaComponent } from './pages/alta-empresa/alta-empresa.component';
import { DashboardCategoriasComponent } from './pages/dashboard-categorias/dashboard-categorias.component';
import { CategoriaListaComponent } from './pages/categoria-lista/categoria-lista.component';
import { UsuariosListComponent } from './pages/usuarios-list/usuarios-list.component';
import { AdministradoresListComponent } from './pages/administradores-list/administradores-list.component';
import { AdministradorDetalleComponent } from './pages/administrador-detalle/administrador-detalle.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'vacante/:id', component: VacanteDetalleComponent },
  { path: 'empresas', component: EmpresaListaComponent },
  { path: 'empresa/:id', component: EmpresaListaVacantesComponent },
  { path: 'perfil', component: EmpresaEditarComponent},
  { path: 'solicitudes', component: EmpresaSolicitudesComponent },
  { path: 'empresas/:id/editar', component: EditarEmpresaComponent },
  { path: 'login', component: FormLoginComponent },
  { path: 'register', component: FormRegisterComponent },
  { path: 'categoria/:id', component: CategoriaListaVacantesComponent },
  { path: 'vacantes', component: EmpresaListaVacantesComponent },
  { path: 'vacante/modificar/:id', component: FormComponent },
  { path: 'vacantes/nueva', component: FormComponent }, 
  { path: 'formulario', component: FormComponent },
  { path: 'actualizarOferta', component: FormComponent },
  { path: 'dashboard', component: DashboardComponent },

  { path: '**', component: Pagina404Component },



  { path: 'aplicar/:id', component: FormAplicarVacanteComponent },
  { path: 'solicitudes', component: MisSolicitudesComponent },
  { path: 'perfil', component: FormRegisterComponent },
  { path: 'empresas/nueva', component: AltaEmpresaComponent},
  { path: 'dashboard-categorias', component: DashboardCategoriasComponent },
  { path: 'categorias', component: CategoriaListaComponent },
  { path: 'usuarios', component: UsuariosListComponent },
  { path: 'administradores', component: AdministradoresListComponent },
  { path: 'administrador/:email', component: AdministradorDetalleComponent },
  { path: '**', component: Pagina404Component },
  { path: "**", redirectTo: "home" }

  // {path:"vacante/:id", component: ViewComponent},
  // {path:"actualizar/:id", component: },

];
