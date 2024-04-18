import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userId: number = 0;
  private userName: string = "";

  constructor() { }

  setLoginInfo(formData: { id: number, name: string }) {
    this.userId = formData.id;
    this.userName = formData.name;
  }
  
}