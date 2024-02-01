import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyerProfileService {

  profileData$: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor() { }
}
