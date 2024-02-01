import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShortsService {


  shouldPauseVideo$: BehaviorSubject<any> = new BehaviorSubject(false);
  sectionChange$: BehaviorSubject<null | number> = new BehaviorSubject<null | number>(null);

  constructor() { }
}
