import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Iempresa } from '../interfaces/iempresa';
import { IUsuario } from '../interfaces/iusuario';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  http = inject(HttpClient);
  private baseUrl: string = 'http://localhost:9001/api/empresas'

  constructor() { };

  getAll(): Observable<Iempresa[]> {
    return this.http.get<Iempresa[]>(this.baseUrl);
  }

  getAllVacantes(): Observable<Iempresa[]> {
    return this.http.get<Iempresa[]>(this.baseUrl + '/con-vacantes');
  }

  getAllConVacantes(id:string): Observable<Iempresa[]> {
    return this.http.get<Iempresa[]>(this.baseUrl + '/' + id +'/vacantes');
  }

  getById(id: string): Observable<Iempresa> {
    return this.http.get<Iempresa>(this.baseUrl + '/' + id);
  }

  modificar(id: string, item: Iempresa): Observable<Iempresa> {
    return this.http.put<Iempresa>(`${this.baseUrl}/${id}`, item).pipe(
      catchError((error) => {
        if (error.status === 400) {
          alert('Error: El ID en la URL y en el body no coinciden.');
        } else if (error.status === 404) {
          alert('Error: No existe.');
        } else {
          alert('Error inesperado al modificar.');
        }
        return throwError(error);
      })
    );
  }

  borrar(id: string): Observable<any> {
    console.log('Se esta borrando el item con id ' + id);
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        if (error.status === 404) {
          alert('La empresa no existe o ya ha sido eliminada');
        } else if (error.status === 409) {
          alert('No se puede eliminar la empresa porque tiene vacantes asociadas');
        } else {
          alert('Error al eliminar la empresa. Por favor, inténtelo de nuevo.');
        }
        return throwError(error);
      })
    );
  }

  nuevo(data: { empresa: Iempresa, usuario: IUsuario }): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/insertar', data).pipe(
      catchError((error) => {
        if (error.status === 409) {
          alert('Ya existe una empresa con este nombre o CIF');
        } else {
          alert('Error al insertar la empresa.');
        }
        return throwError(error);
      })
    );
  }
}