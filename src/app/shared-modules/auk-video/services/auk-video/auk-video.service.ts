import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AukVideoService {
  
  // props 
  shouldPauseVideo$: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor() { }
}
