import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, lastValueFrom, Observable, throwError } from 'rxjs';
import { Ivacante } from '../interfaces/ivacante';

@Injectable({
  providedIn: 'root'
})
export class VacanteService {

  http = inject(HttpClient);
  private baseUrl: string = 'http://localhost:9001/api/vacantes'
  

  constructor() { };

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  buscarVacantes(termino: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/buscar?termino=${termino}`);
  }

  getAllCreadas(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+ '/creadas');
  }

  getById(id: String): Observable<Ivacante> {
    return this.http.get<any>(this.baseUrl + '/' + id);
  }

  getVacantesPorEmpresa(idEmpresa: number): Observable<Ivacante[]> {
    return this.http.get<Ivacante[]>(`${this.baseUrl}/empresa/${idEmpresa}`);
  }
  

  modificar(id: string, item: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modificar/${id}`, item).pipe(
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

  borrar(id: number): Observable<any> {
    console.log('Se está borrando el item con id', id);
    return this.http.delete(`${this.baseUrl}/borrar/${id}`); // <- como lo tiene tu backend
  }
  
  

  nuevo(datos: any) {
    return this.http.post<any>(this.baseUrl + '/insertar', datos).pipe(
      catchError((error) => {
        if (error.status === 409) {
          alert('Ya existe con este nombre');
        } else {
          alert('Error al insertar.');
        }
        return throwError(error);
      })
    );
  }


  getAllVacante(page: number, itemPerPage: number): Observable<Ivacante[]> {
    console.log(this.baseUrl + "?page=" + page + "&size=" + itemPerPage);
    return this.http.get<Ivacante[]>(this.baseUrl + "?page=" + page + "&size=" + itemPerPage);
  }

  insertVacante(vacante: Ivacante): Observable<Ivacante> {
    return this.http.post<Ivacante>(this.baseUrl, vacante);
  }

  updateVacante(vacante: Ivacante): Observable<Ivacante> {
    return this.http.put<Ivacante>(`${this.baseUrl}/${vacante.idVacante}`, vacante);
  }

}