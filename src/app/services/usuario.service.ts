// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
// import { IUsuario } from '../interfaces/iusuario';

// @Injectable({
//   providedIn: 'root'
// })
// export class UsuarioService {

//   private http = inject(HttpClient);
//   private baseUrl: string = 'http://localhost:9001/api';

//   constructor() { }

//   // LOGIN
//   login(usuario: IUsuario): Observable<IUsuario> {
//     return this.http.post<IUsuario>(`${this.baseUrl}/login`, usuario);
//   }

//   // REGISTRO
//   register(usuario: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}`, usuario).pipe(
//       catchError((error) => {
//         if (error.status === 409) {
//           alert('⚠️ Ya existe un usuario con este email.');
//         } else {
//           alert('❌ Error al registrar usuario.');
//         }
//         return throwError(error);
//       })
//     );
//   }

//   // OBTENER TODOS
//   getAll(): Observable<IUsuario[]> {
//     return this.http.get<IUsuario[]>(this.baseUrl);
//   }

//   // OBTENER POR EMAIL
//   getById(email: string): Observable<IUsuario> {
//     return this.http.get<IUsuario>(`${this.baseUrl}/${email}`);
//   }

//   // MODIFICAR
//   modificar(email: string, usuario: IUsuario): Observable<IUsuario> {
//     return this.http.put<IUsuario>(`${this.baseUrl}/${email}`, usuario).pipe(
//       catchError((error) => {
//         if (error.status === 400) {
//           alert('❗ Error: El email en la URL y en el body no coinciden.');
//         } else if (error.status === 404) {
//           alert('⚠️ Error: Usuario no encontrado.');
//         } else {
//           alert('❌ Error inesperado al modificar.');
//         }
//         return throwError(error);
//       })
//     );
//   }

//   // BORRAR
//   borrar(email: string): Observable<any> {
//     return this.http.delete<any>(`${this.baseUrl}/${email}`);
//   }
//   nuevo(datos: any): Observable<any> {
//     return this.http.post<any>(`${this.baseUrl}/usuarios`, datos);
//   }

//   async deshabilitarUsuario(email: string): Promise<any> {
//         try {
//           console.log("Correo enviado para deshabilitar: ", email);
//           const response = await firstValueFrom(this.http.put(`${this.baseUrl}/deshabilitar/${email}`, {}, { responseType: 'text' }));
//           return response; // La respuesta será un texto plano
//         } catch (error) {
//           console.error("Error al deshabilitar usuario", error);
//           alert('Error al deshabilitar el usuario');
//           throw error; // Lanza el error para manejarlo más arriba
//         }
//       }
      
//       // Habilitar usuario como promesa
//       async habilitarUsuario(email: string): Promise<any> {
//         try {
//           const response = await firstValueFrom(this.http.put(`${this.baseUrl}/habilitar/${encodeURIComponent(email)}`, {}, { responseType: 'text' }));
//           return response; // La respuesta será un texto plano, por ejemplo "Usuario habilitado correctamente"
//         } catch (error) {
//           console.error("Error al habilitar usuario:", error);
//           alert('Error al habilitar el usuario');
//           throw error;
//         }
//       }
//     }


import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, firstValueFrom, lastValueFrom, Observable, throwError } from 'rxjs';
import { IUsuario } from '../interfaces/iusuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  http = inject(HttpClient);
  private baseUrl: string = 'http://localhost:9001/api/usuarios';

  constructor() { };

  login(usuario: IUsuario) {
    return firstValueFrom(
      this.http.post<IUsuario>(`${this.baseUrl}/login`, usuario, { withCredentials: true })
    );
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getById(id: String): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + id);
  }

  modificar(id: string, item: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modificar`, item).pipe(
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

  borrar(email: String): Observable<any> {
    console.log('Se esta borrando el item con email ' + email);
    return this.http.delete<any>(`${this.baseUrl}/${email}`).pipe(
      catchError((error) => {
        if (error.status === 404) {
          alert('El usuario no existe');
        } else {
          alert('Error al eliminar el usuario');
        }
        return throwError(error);
      })
    );
  }

  nuevo(datos: any) {
    return this.http.post<any>(`${this.baseUrl}`, datos).pipe(
      catchError((error) => {
        if (error.status === 409) {
          alert('Ya existe un usuario con este email');
        } else {
          alert('Error al insertar.');
        }
        return throwError(error);
      })
    );
  }

  async deshabilitarUsuario(email: string): Promise<any> {
    try {
      console.log("Correo enviado para deshabilitar: ", email);
      const response = await firstValueFrom(this.http.put(`${this.baseUrl}/deshabilitar/${email}`, {}, { responseType: 'text' }));
      return response; // La respuesta será un texto plano
    } catch (error) {
      console.error("Error al deshabilitar usuario", error);
      alert('Error al deshabilitar el usuario');
      throw error; // Lanza el error para manejarlo más arriba
    }
  }
  
  // Habilitar usuario como promesa
  async habilitarUsuario(email: string): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.put(`${this.baseUrl}/habilitar/${encodeURIComponent(email)}`, {}, { responseType: 'text' }));
      return response; // La respuesta será un texto plano, por ejemplo "Usuario habilitado correctamente"
    } catch (error) {
      console.error("Error al habilitar usuario:", error);
      alert('Error al habilitar el usuario');
      throw error;
    }
  }
}