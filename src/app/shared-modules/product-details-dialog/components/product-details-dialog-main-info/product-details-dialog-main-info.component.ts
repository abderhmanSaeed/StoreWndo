import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, concat } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { ProductDetails } from 'src/app/modules/explore/modules/shorts/models/product-details/product-details';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'product-details-dialog-main-info',
  templateUrl: './product-details-dialog-main-info.component.html',
  styleUrls: ['./product-details-dialog-main-info.component.scss']
})
export class ProductDetailsDialogMainInfoComponent implements OnInit {

  // inputs props 
  @Input() data: ProductDetails = {
    comments: []
  }


  // outputs props 
  @Output() onAddToCart: EventEmitter<any> = new EventEmitter();
  @Output() onProductWishChange: EventEmitter<any> = new EventEmitter();
  @Output() onProductLikesChange: EventEmitter<number> = new EventEmitter();

  // props 
  rate: number = 4
  subscription: Subscription = new Subscription();


  constructor(
    private _Router: Router,
    private _MatDialog: MatDialog,
    private _HttpService: HttpService,
    private _AuthService: AuthService,
    private _ProductService: ProductService,
    private _MessagesService: MessagesService,
    private _GridCardPerviewComponent: MatDialogRef<ProductDetailsDialogMainInfoComponent>,
  ) { }


  ngOnInit(): void {    
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onProductDataChange(data: any) {
    this._ProductService.productData$.next(data)
  }


  isAuthenticated(): boolean {
          
    console.log('hello2');

    if (!this._AuthService.isAuthenticated) {
      console.log('hello3');

      this.openAuthDialog();
      return false
    } else {
      return true
    }
  }


  addToCartHandler(productId: any): void {
      console.log('hello');
      
    if(!this.isAuthenticated()) return

    if (this.data.isInCart) { 
      this._Router.navigate(['/cart/check-out']);
      this._GridCardPerviewComponent.close();
      return
    }

    if (productId) {
      this.getSizesColorsOfProducts(productId);
    }
  }


  getSizesColorsOfProducts(productId: any): void {
    this.subscription.add( this._HttpService.get(`${APIs.getSizesColorsOfProducts}/${productId}`)
    .subscribe((res: HResponse) => {
      if (res.responseData?.colorWithSizes?.length || res.responseData?.sizes.length) {
        this.onAddToCart.emit({showSizesColors: true})
      } else {
        this.addToCart(productId);
      }
    }))
  }


  addToCart(productId: string): void {
    const payload = {
      productId,
      quantity: 1
    }
    this.subscription.add(
      this._HttpService.post(APIs.addToCart, payload).subscribe( (res: HResponse) => {
        if (res.isSuccess) {
          this.data.isInCart = !this.data.isInCart;
          this._MessagesService.openSuccessSnackBar(res.responseData.message);
        } 
      })  
    );
  }


  
  openAuthDialog() {
    this._MatDialog.open(AuthComponent, {
      width: '550px',
      panelClass: 'auth-dialog'
    });
  }


 


  commentHandler(message: string): void {

    if(!this.isAuthenticated()) return

    const payload = {
      message,
      productId: this.data.id
    },
    query = {
      maxResultCount: 1
    },
    addComment =  this._HttpService.post(APIs.addComment, payload),
    getProductComments =  this._HttpService.get(`${APIs.getProductComments}/${this.data.id}`, query);
    this.subscription.add(
      concat(
        addComment,
        getProductComments
      ).subscribe( (res: HResponse) =>{
        if (res.responseData?.items?.length) {
          this.data.comments = res.responseData.items;
        }
      })
    );
  }  






  updateCommentLike(commentId?: number): void {
    
    if(!this.isAuthenticated()) return

    const payload = {
      commentId
    };

    this.subscription.add(
      this._HttpService.post(APIs.updateCommentLike, payload).subscribe( (res: HResponse) => {
        if (this.data.comments?.length) {
          this.data.comments[0].isLike = !this.data?.comments[0].isLike
        }
      })
    );
  }
}
