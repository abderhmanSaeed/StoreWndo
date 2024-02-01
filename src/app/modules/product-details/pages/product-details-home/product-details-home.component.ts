import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-product-details-home',
  templateUrl: './product-details-home.component.html',
  styleUrls: ['./product-details-home.component.scss']
})
export class ProductDetailsHomeComponent implements OnInit {

  
  // props 
  producData: any = {};
  subscription: Subscription = new Subscription();

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _BreadcrumbService: BreadcrumbService,
  ) {
   }


  ngOnInit(): void {
    this.getAllData();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getAllData(): void {
    this.getProducData();
  }


  getProducData(): void {
    this.subscription.add( this._ActivatedRoute.data.subscribe((data: any) => {
      //...Do something with your data here...
      this.producData = data?.productData?.responseData      
      this.setBreadcrumb(this.producData?.name);
    }))
  }


  setBreadcrumb(productName: string): void {
    this._BreadcrumbService.$items.next([
      {
        name: 'breadcrumb.home',
        url: '/'
      },
      {
        name: productName,
        url: '/product',
        active: true
      },
    ])
  }
}
