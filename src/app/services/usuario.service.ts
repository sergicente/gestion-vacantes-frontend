import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IUsuario } from '../interfaces/iusuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http = inject(HttpClient);
  private baseUrl: string = 'http://localhost:9001/api/usuarios';

  constructor() { }

  // LOGIN
  login(usuario: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(`${this.baseUrl}/login`, usuario);
  }

  // REGISTRO
  register(usuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, usuario).pipe(
      catchError((error) => {
        if (error.status === 409) {
          alert('⚠️ Ya existe un usuario con este email.');
        } else {
          alert('❌ Error al registrar usuario.');
        }
        return throwError(error);
      })
    );
  }

  // OBTENER TODOS
  getAll(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.baseUrl);
  }

  // OBTENER POR EMAIL
  getById(email: string): Observable<IUsuario> {
    return this.http.get<IUsuario>(`${this.baseUrl}/${email}`);
  }

  // MODIFICAR
  modificar(email: string, usuario: IUsuario): Observable<IUsuario> {
    return this.http.put<IUsuario>(`${this.baseUrl}/${email}`, usuario).pipe(
      catchError((error) => {
        if (error.status === 400) {
          alert('❗ Error: El email en la URL y en el body no coinciden.');
        } else if (error.status === 404) {
          alert('⚠️ Error: Usuario no encontrado.');
        } else {
          alert('❌ Error inesperado al modificar.');
        }
        return throwError(error);
      })
    );
  }

  // BORRAR
  borrar(email: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${email}`);
  }
  nuevo(datos: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/usuarios`, datos);
  }

}
