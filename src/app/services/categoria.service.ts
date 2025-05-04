import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Icategoria } from '../interfaces/icategoria';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    http = inject(HttpClient);
    private baseUrl: string = 'http://localhost:9001/api/categorias'

    constructor() { };

    getAll(): Observable<Icategoria[]> {
        return this.http.get<Icategoria[]>(this.baseUrl);
    }

    getById(id: string): Observable<Icategoria> {
        return this.http.get<Icategoria>(`${this.baseUrl}/${id}`);
    }

    crear(categoria: Icategoria): Observable<Icategoria> {
        return this.http.post<Icategoria>(this.baseUrl, categoria).pipe(
            catchError((error) => {
                if (error.status === 409) {
                    alert('Ya existe una categoría con este nombre');
                } else {
                    alert('Error al crear la categoría');
                }
                return throwError(error);
            })
        );
    }

    modificar(id: string, categoria: Icategoria): Observable<Icategoria> {
        return this.http.put<Icategoria>(`${this.baseUrl}/${id}`, categoria).pipe(
            catchError((error) => {
                if (error.status === 404) {
                    alert('La categoría no existe');
                } else {
                    alert('Error al modificar la categoría');
                }
                return throwError(error);
            })
        );
    }

    borrar(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
            catchError((error) => {
                if (error.status === 404) {
                } else if (error.status === 409) {
                } else {
                }
                return throwError(error);
            })
        );
    }
}