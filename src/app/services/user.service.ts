import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  HttpClient = inject(HttpClient)
  private apiUrl = 'http://localhost:9001/api/usuarios'

  constructor() { }

register(user: any): Observable<any> {
  return this.HttpClient.post(`${this.apiUrl}/register`, user)
}

login(credenntials: any): Observable<any> {
  return this.HttpClient.post(`${this.apiUrl}/login`, credenntials)
}




}
