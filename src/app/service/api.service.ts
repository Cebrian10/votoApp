import { Component, inject } from '@angular/core';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SessionService } from '../service/session.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private apiUrl = 'http://localhost:5164'; // Base URL
  private apiUrl = 'https://rm-exvsv.ondigitalocean.app/api'; // Base URL


  private readonly sessionService = inject(SessionService);
  //userData: any;
  userDataId: string = "9649";

  constructor(private http: HttpClient) { 
    //this.userData = this.sessionService.getSessionData('userData');
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'WHOPID': '1' // Valor fijo, puedes cambiarlo si necesitas
    });

    if (this.userDataId !== null) {
      // const login = JSON.parse(this.userData);
      // headers.append('Authorization', `Api-Key ${login.id}`);
      //headers.append('WHOID', this.userData.id.toString());
      headers = headers.set('WHOID', this.userDataId);
    }
    
    return headers;
  }

  // Inicio de sesión del usuario en la aplicación
  postLogin(endpoint: string, formData: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.post<any>(url, formData, { headers: this.getHeaders() });
  }

  // Registro del usuario en la aplicación
  postRegister(endpoint: string, formData: any): Observable<any>{
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.post<any>(url, formData, { headers: this.getHeaders() });
  }

  // Lista de simpatizantes por userId
  postSimpatizantes(endpoint: string, userId: number): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.post<any>(url, userId, { headers: this.getHeaders() });
  }

  // Verifica si una persona existe en el padron por Cedula
  getExistePersonaByCedula(endpoint: string, cedula: string): Observable<any>{
    const url = `${this.apiUrl}/${endpoint}/${cedula}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  // Busca datos de una persona por Cedula
  getPersonaByCedula(endpoint: string, cedula: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/${cedula}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }
}
