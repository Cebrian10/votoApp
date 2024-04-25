import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userId: number = 0;
  private userName: string = "";
  private personaData: any;

  constructor() { }

  setLoginInfo(formData: { id: number, name: string }) {
    this.userId = formData.id;
    this.userName = formData.name;
  }

  setPersonaData(data: any) {
    sessionStorage.setItem('personaData', JSON.stringify(data));
  }
  
  getPersonaData(): any {
    const data = sessionStorage.getItem('personaData');
    // Verificar si el valor obtenido es válido
    if (data && data !== 'undefined') {
      return JSON.parse(data);
    }
    return null;
  }
}