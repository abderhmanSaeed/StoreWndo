import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  onThemeChange = new BehaviorSubject(false);

  constructor() { }
}
