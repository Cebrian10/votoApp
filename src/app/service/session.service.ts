import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() {}

  setSessionData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getSessionData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  isLoggedIn(): boolean {    
    return !!localStorage.getItem('userData');
  }

  clearSession() {
    localStorage.clear();
  }
}
