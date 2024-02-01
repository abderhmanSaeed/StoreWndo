import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Breadcrumb } from '../../models/breadcrumb/breadcrumb';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss', './breadcrumb.component.rtl.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

  @Input() data: Breadcrumb[]= [];
  @Input() isolated: boolean = false;
  @Input() type: 'default' | 'slash' = 'default'

  items: Breadcrumb[] = [];
  subscription: Subscription = new Subscription();

  
  constructor(
    private _BreadcrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {
    this.getBreadcrumbItems();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getBreadcrumbItems(): void {
    this._BreadcrumbService.$items.subscribe(items => {      
      if (items)  this.items = items;
    })
  }
}
