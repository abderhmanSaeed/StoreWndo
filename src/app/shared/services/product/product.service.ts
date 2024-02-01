import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productData$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

}
