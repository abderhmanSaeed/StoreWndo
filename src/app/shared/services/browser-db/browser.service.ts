import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  setItem(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }

  getItem(key: string) {    
    if(localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key) as any)
    return null;
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }

  deleteItem(key: string) {
    return localStorage.removeItem(key);
  }
  
}
