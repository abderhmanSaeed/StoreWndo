import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { APIs } from 'src/app/core/config/apis';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';
import { AddReviewComponent } from 'src/app/shared-modules/add-review/add-review.component';
import { MatDialog } from '@angular/material/dialog';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { Constant } from 'src/app/core/config/constant';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { AuthComponent } from 'src/app/modules/auth/auth.component';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss']
})
export class ProductReviewsComponent implements OnInit {

  // props 
  faPlay = faPlay;
  rate: number = 4;
  productData: any = {};
  statisticsRate: number = 0;
  statisticsVerifiedRatings: number = 0;
  statisticsReviews: any = {};
  fetchCriteria: any = {
    maxResultCount: 12,
  }
  languagesEnum = Languages;
  lang: Languages = Languages.AR;
  productReviews: any = [];
  productReviewsCount: number = 0;
  subscription: Subscription = new Subscription();
  imgPlaceholder: string = 'assets/media/users/user-placeholder.png';

  // Paginator props 
  page:number = 1;
  perPage:number = 10;


  constructor(
    private _Router: Router,
    private _MatDialog: MatDialog,
    public _AuthService: AuthService,
    private _HttpService: HttpService,
    private _ActivatedRoute: ActivatedRoute,
    private _BrowserService: BrowserService,
    private _BreadcrumbService: BreadcrumbService,
    ) {
  }

  ngOnInit(): void {
    this.getAllData();
    this.lang = this._BrowserService.getItem(Constant.locale);
  }


  getAllData(): void {
    this.getProductData();
    this.getReviews(this.productData.id);
    this.getStatisticsReviews(this.productData.id);
  }


  getProductData(): void {
    this.subscription.add( this._ActivatedRoute.parent?.data.subscribe((data: any) => {
      //...Do something with your data here...
      this.productData = data.productData.responseData;
      
      this.setBreadcrumb(this.productData.name, this.productData.id);
    }))
  }

  getReviews(productId: any): void {
    this.subscription.add( this._HttpService.get(`${APIs.getProductReviews}/${productId}`, this.fetchCriteria)
    .subscribe((res: HResponse) => {
      this.productReviews = res.responseData.items;
      this.productReviewsCount = res.responseData.totalCount;

      console.log('productReviews', res.responseData);
      
    }))
  }

  getStatisticsReviews(productId: any): void {
    this.subscription.add( this._HttpService.get(`${APIs.getStatisticsReviews}/${productId}`)
    .subscribe((res: HResponse) => {
      this.statisticsReviews = res.responseData;
      this.statisticsRate = res.responseData.rate;
      this.statisticsVerifiedRatings = res.responseData.verifiedRatings;
      delete this.statisticsReviews['rate'];
      delete this.statisticsReviews['verifiedRatings'];
      
    }))
  }

  getBacktoProduct(productId: any): void {
    this._Router.navigate([`/product/${productId}`])
  }

  
  onImgError(event: any){
    event.target.src = this.imgPlaceholder;
  }


  onPageChange(e: any): void {
    e--
    this.fetchCriteria.skipCount = e * this.perPage;
    this.getReviews(this.productData.id);
  }

  setBreadcrumb(productName: string, productId: string): void {
    this._BreadcrumbService.$items.next([
      {
        name: 'breadcrumb.home',
        url: '/'
      },
      {
        name: productName,
        url: `/product/${productId}`
      },
      {
        name: 'breadcrumb.reviews',
        url: '/reviews',
        active: true
      },
    ])
  }


  openAddRateDialog(): void {

    if (!this._AuthService.isAuthenticated) {
      this.openAuthDialog();
      return
    }
    
    const dialogRef = this._MatDialog.open(AddReviewComponent, {
      width: '750px',
      panelClass: 'custom-dialog-container',
      data: {
        productId: this.productData.id
      },
      direction: this.lang ==  this.languagesEnum.EN ? 'ltr' : 'rtl',
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe( (res: any) => {
        if (res?.isSuccess) {
          this.getReviews(this.productData.id);
          this.getStatisticsReviews(this.productData.id);
        }
      })
    )
  }


  
  openAuthDialog() {
    this._MatDialog.open(AuthComponent, {
      width: '550px',
      panelClass: 'auth-dialog',
      direction: this.lang ==  this.languagesEnum.EN ? 'ltr' : 'rtl',
    });
  }

}
