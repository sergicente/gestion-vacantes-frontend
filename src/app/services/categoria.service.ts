import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    http = inject(HttpClient);
    private baseUrl: string = 'http://localhost:9001/api/categorias'

    constructor() { };

    getAll(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl);
    }

    getById(id: String): Observable<any> {
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
}