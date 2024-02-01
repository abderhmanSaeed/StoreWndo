import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CartService } from 'src/app/modules/cart/services/cart/cart.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { ColorWithSizes, size } from 'src/app/shared/models/product/color-with-sizes';
import { HelperFunctionsService } from 'src/app/shared/services/helper-funcctions/helper-functions.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';

@Component({
  selector: 'app-product-features',
  templateUrl: './product-features.component.html',
  styleUrls: ['./product-features.component.scss']
})
export class ProductFeaturesComponent implements OnInit {

  
  // inputs props 
  @Input() isInPopup = false;
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  // props 
  sizes: size[] = [];
  maxQuantity: number = 0;
  colorWithSizes: ColorWithSizes[] = [];

  // props  
  cartRequestPayload: any = {
    sizeId: null,
    colorId: null,
    quantity: 0,
  };
  subscription: Subscription = new Subscription();

  constructor(
    private _CartService: CartService,
    private _HttpService: HttpService,
    private _MessagesService: MessagesService,
    @Inject(MAT_DIALOG_DATA) public productDetails: any,
    public helperFunctionsService: HelperFunctionsService,
   private _ProductFeaturesDialogRef: MatDialogRef<ProductFeaturesComponent>,
  ) { }


  ngOnInit(): void {    
    this.sizes = this.productDetails.sizes;
    this.maxQuantity = this.productDetails.quantity;
    this.colorWithSizes = this.productDetails.colorWithSizes;
    this.initVlaue(this.sizes, this.colorWithSizes);
  }


  initVlaue(sizes: any[], colorWithSizes:ColorWithSizes[] ) {
    if (colorWithSizes.length) this.cartRequestPayload.colorId = colorWithSizes[0].color.id;
    if (sizes.length) {
      this.cartRequestPayload.sizeId = sizes[0];
    } else {
      this.sizes = colorWithSizes[0].sizes;
      this.sizes.length ? this.cartRequestPayload.sizeId = this.sizes[0]?.id: null;
    }
    if (!this.maxQuantity || this.maxQuantity < 0) {      
      this.maxQuantity = colorWithSizes[0].color.quantity;
      if (!this.maxQuantity || this.maxQuantity < 0) {        
        this.maxQuantity = colorWithSizes[0].sizes[0].quantity;
      }
    }
  }


  onColorChange(item: any): void {
    if (item.sizes.length) {
      this.sizes = item.sizes;
      this.cartRequestPayload.sizeId = item.sizes[0].id;
      this.onSizeChange();
    } else {
      this.maxQuantity = item.color.quantity
     this.checkIfQuantityGreaterThanMax();
    }
  }


  onSizeChange() {
    this.maxQuantity = this.sizes.filter( size => size.id == this.cartRequestPayload.sizeId )[0].quantity;
    console.log(this.maxQuantity);
    this.checkIfQuantityGreaterThanMax();
  }

  
  checkIfQuantityGreaterThanMax() {
    if (this.cartRequestPayload.quantity > this.maxQuantity) {
      this.cartRequestPayload.quantity = this.maxQuantity
    }
  }



  save(): void {
    if (!this.maxQuantity || !this.cartRequestPayload.quantity) return
    if (this.productDetails.isEdit) return this.editCart();
    this.addToCart();
  }


  editCart(): void {  
    console.log('edit');

    const payload = {
      cartId: this.productDetails.cartId,
      ...this.cartRequestPayload
    }
    this.subscription.add(
      this._HttpService.put(APIs.editCart, payload).subscribe( (res: HResponse) => {
        if (res.isSuccess) {
          this._ProductFeaturesDialogRef.close(res);
        } 
      })  
    );
  }



  addToCart(): void {  
    console.log('add');
    
    if (this.isInPopup) {
      this.onSave.emit({
        ...this.cartRequestPayload
      }); 
      return
    }

    const payload = {
      productId: this.productDetails.id,
      ...this.cartRequestPayload
    }
    this.subscription.add(
      this._HttpService.post(APIs.addToCart, payload).subscribe( (res: HResponse) => {
        if (res.isSuccess) {
          this._MessagesService.openSuccessSnackBar(res.responseData.message);
          let cartItemCount = this._CartService.onCartItemsCountChange$.getValue();
          cartItemCount++
          this._CartService.onCartItemsCountChange$.next(cartItemCount);
          this._ProductFeaturesDialogRef.close({isSuccess: true});
        } 
      })  
    );
  }

}
