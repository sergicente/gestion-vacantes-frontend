import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, lastValueFrom, Observable, tap, throwError } from 'rxjs';
import { Ivacante } from '../interfaces/ivacante';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class VacanteService {


  http = inject(HttpClient);
  //  private baseUrl: string = 'http://localhost:9001/api/vacantes';
  private baseUrl: string = `${environment.apiUrl}/vacantes`;

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



  getAllEmpresa(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+ '/empresa/' + id);
  }

  getById(id: String): Observable<Ivacante> {
    return this.http.get<any>(this.baseUrl + '/' + id);
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

  borrar(id: String): Observable<any> {
    console.log('Se esta borrando el item con id ' + id);
    return this.http.delete<any>(this.baseUrl + '/borrar/' + id);
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

  insertVacante(vacante: Ivacante): Promise<Ivacante> {
    return lastValueFrom(this.http.post<Ivacante>(this.baseUrl, vacante));
  }

  updateVacante(vacante: Ivacante): Promise<Ivacante> {
    return lastValueFrom(this.http.put<Ivacante>(`${this.baseUrl}/${vacante.idVacante}`, vacante));
  }

  deleteById(idVacante: string): Promise<Ivacante> {
    return lastValueFrom(this.http.delete<Ivacante>(`${this.baseUrl}/${idVacante}`));
  }

  cambiarEstadoVacante(idVacante: number, nuevoEstado: string): Observable<any> {
    const url = `${this.baseUrl}/${idVacante}/estado?nuevoEstado=${nuevoEstado}`;
    return this.http.put(url, null, { observe: 'response', responseType: 'text' }).pipe(
      tap((response) => {
        console.log(`Respuesta del servidor: ${response.status}`);
      }),
      catchError((error) => {
        console.error('Error real al cambiar el estado:', error);
        return throwError(() => error);
      })
    );
  }
}