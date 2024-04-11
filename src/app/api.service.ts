import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7236'; // Base URL

  constructor(private http: HttpClient) { }

  getDataFromUrl(endpoint: string): Observable<any[]> {
    const url = `${this.apiUrl}/${endpoint}`; // Combina la base URL con el endpoint específico
    return this.http.get<any[]>(url);
  }
}
