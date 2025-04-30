import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SolicitudService {
  private baseUrl = 'http://localhost:9001/api/solicitudes';

  constructor(private http: HttpClient) {}

  getSolicitudesPorEmpresa(idEmpresa: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/empresa/${idEmpresa}`);
  }
}
