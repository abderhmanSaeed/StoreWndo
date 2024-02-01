import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { Product } from 'src/app/shared/models/product/product';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit, OnDestroy {


  // props 
  wishList: Product[] = []
  subscription: Subscription = new Subscription();
  mainRippleColor: string = environment.mainRippleColor
  productDetailsRoute = environment.routes.productDetails;


  constructor(
    private _HttpService: HttpService,
    private _BreadcrumbService: BreadcrumbService
  ) { }


  ngOnInit(): void {
    this.setBreadcrumb();
    this.getMyWishList();
  }

    
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  setBreadcrumb(): void {
    this._BreadcrumbService.$items.next([
      {
        name: 'breadcrumb.home',
        url: '/'
      },
      {
        name: 'breadcrumb.profile',
        url: '/buyer-profile'
      },
      {
        name: 'breadcrumb.my-wishList',
        url: '/buyer-profile/wish-list'
      }
    ])
  }


  getMyWishList(): void {
    this.subscription.add(this._HttpService.get(APIs.getMyWishList)
    .subscribe((res: HResponse ) => {   

      if (!res.isSuccess) return;
      this.wishList = res.responseData?.items
    }));
  }


  
  onImgError(event: any){
    event.target.src = 'assets/media/svg/prod-img-placeholder.svg'
  }


  onProductWishChange(productId: string | undefined): void {
    this.wishList?.splice(this.wishList?.findIndex(item => item.id === productId), 1)
  }
}
