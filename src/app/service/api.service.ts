import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5164'; // Base URL

  constructor(private http: HttpClient) { }

  // Inicio de sesión del usuario en la aplicación
  postLogin(endpoint: string, formData: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.post<any>(url, formData);
  }

  // Registro del usuario en la aplicación
  postRegister(endpoint: string){
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.post<any>(url, 'nada');
  }

  // Lista de simpatizantes por userId
  postSimpatizantes(endpoint: string, userId: number): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.post<any>(url, userId);
  }

  

}
