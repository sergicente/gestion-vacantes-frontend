import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VacanteDetalleComponent } from './pages/vacante-detalle/vacante-detalle.component';
import { Pagina404Component } from './pages/pagina404/pagina404.component';
import { EmpresaListaComponent } from './pages/empresa-lista/empresa-lista.component';
import { EmpresaListaVacantesComponent } from './pages/empresa-lista-vacantes/empresa-lista-vacantes.component';
import { FormLoginComponent } from './pages/form-login/form-login.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'vacante/:id', component: VacanteDetalleComponent },
    { path: 'empresas', component: EmpresaListaComponent },
    { path: 'empresa/:id', component: EmpresaListaVacantesComponent },
    { path: 'login', component: FormLoginComponent},
    { path: '**', component: Pagina404Component }


];
