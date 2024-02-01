import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Breadcrumb } from '../../models/breadcrumb/breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  $items: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor() { }



  addItem(data: any[]): void {
    let items: any = [];
    if (Array.isArray(this.$items.value)) {
      items = [...this.$items?.value, ...data]
    }    
    this.$items.next(items)
  }
}
