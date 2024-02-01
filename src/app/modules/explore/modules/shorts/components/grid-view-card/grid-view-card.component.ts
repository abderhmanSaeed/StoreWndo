import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { faVideo, faExpand } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { GridCard } from '../../models/grid-card/grid-card';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { APIs } from 'src/app/core/config/apis';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { ProductDetailsDialogComponent } from 'src/app/shared-modules/product-details-dialog/product-details-dialog.component';


@Component({
  selector: 'grid-view-card',
  templateUrl: './grid-view-card.component.html',
  styleUrls: ['./grid-view-card.component.scss']
})
export class GridViewCardComponent implements OnInit, OnDestroy {

  // begin:: inputs props 
  @Input() data: GridCard = {};
  @Input() lang: Languages = Languages.AR;

  // Outputs
  @Output() productLikeChange: EventEmitter<any> = new EventEmitter();
  @Output() productWishChange: EventEmitter<any> = new EventEmitter();


  faVideo = faVideo;
  faExpand = faExpand;
  vgApiService!: VgApiService;
  subscription: Subscription = new Subscription();

  // booleans 
  showVideo: boolean = false;
  isLoading: boolean = false;
  isMouseEnter: boolean = false;

  constructor(
    private _MatDialog: MatDialog,
    private _HttpService: HttpService,
    private _ProductService: ProductService,
  ) { }

  
  ngOnInit(): void {
    this.onProductDataChange();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onExpandClick(productId: any): void {
    if (productId) {
      this.getProductDetails(productId)
    }    
   }


  getProductDetails(productId: any): void {
    this.subscription.add( this._HttpService.get(`${APIs.getProductDetails}/${productId}`)
    .subscribe((res: HResponse) => {
      this.openGridCardPerviewDialog(res.responseData);
    }))
  }

  
  openGridCardPerviewDialog(data: any): void {    
    this._MatDialog.open(ProductDetailsDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      data,
      direction: this.lang == Languages.AR ? 'rtl' : 'ltr'
    });
  }


  onPlayerReady(api: VgApiService) {
    this.vgApiService = api;
    this.subscription.add( this.vgApiService.subscriptions.canPlay.subscribe( (res: any) => {   
      this.isLoading = false;
      this.playVdo();
    }))
  }


  playVdo() {
    this.vgApiService.play();
  }


  onLeaveonCard(): void {
    this.isLoading = false;
    this.showVideo = false;
    this.isMouseEnter = false;
  }


  playVideo(): void {
    this.isLoading = true;  
    this.showVideo = true;  
  }


  onProductDataChange() {
    this.subscription.add(
      this._ProductService.productData$.subscribe((data: any) => {
        this.data = {
          ...this.data,
          ...data
        }        
      })
    )
  }

  
  onImgError(event: any){
    event.target.src = 'assets/media/logos/smile.svg'
  }


  onSellerImgError(event: any){
    event.target.src = 'assets/media/users/user-placeholder.png'
  }


  onLikeChange(isLiked: boolean): void {
    this.productLikeChange.emit({
      isLiked,
      product: this.data
    })    
  }

  onWishChange(isInWishList: boolean): void {
    this.productWishChange.emit({
      isInWishList,
      product: this.data
    })    
  }

}
