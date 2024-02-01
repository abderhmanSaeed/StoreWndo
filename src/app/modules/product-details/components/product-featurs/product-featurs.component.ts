import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { size, ColorWithSizes } from 'src/app/shared/models/product/color-with-sizes';
import { HelperFunctionsService } from 'src/app/shared/services/helper-funcctions/helper-functions.service';

@Component({
  selector: 'product-featurs',
  templateUrl: './product-featurs.component.html',
  styleUrls: ['./product-featurs.component.scss']
})
export class ProductFeatursComponent implements OnInit {

  // Inputs
  @Input() set producData(producData : any) {
    this.productDetails = producData;
    this.sizes = this.productDetails.sizes;
    this.maxQuantity = this.productDetails.quantity;
    this.colorWithSizes = this.productDetails.colorWithSizes;
    this.initVlaue(this.sizes, this.colorWithSizes);
  };
  


  // outputs 
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  // props 
  sizes: size[] = [];
  maxQuantity: number = 0;
  productDetails: any = {};
  initQuantity: number = 1;
  colorWithSizes: ColorWithSizes[] = [];

  // props  
  cartRequestPayload: any = {
    sizeId: null,
    colorId: null,
    quantity: 1,
  };
  subscription: Subscription = new Subscription();

  constructor(
    public helperFunctionsService: HelperFunctionsService,
  ) { }

  ngOnInit(): void { }

  initVlaue(sizes: any[], colorWithSizes:ColorWithSizes[] ) {
    if (colorWithSizes.length) this.cartRequestPayload.colorId = colorWithSizes[0]?.color.id;
    if (sizes.length) {
      this.cartRequestPayload.sizeId = sizes[0];
    } else {
      this.sizes = colorWithSizes[0]?.sizes;
      this.sizes.length ? this.cartRequestPayload.sizeId = this.sizes[0]?.id: null;
    }
    if (!this.maxQuantity || this.maxQuantity < 0) {      
      this.maxQuantity = colorWithSizes[0]?.color.quantity;
      if (!this.maxQuantity || this.maxQuantity < 0) {        
        this.maxQuantity = colorWithSizes[0]?.sizes[0]?.quantity;
      }
    }
    this.onChange.emit(this.cartRequestPayload);
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

    this.onChange.emit(this.cartRequestPayload);
  }


  onQuantityChange(quantity: number): void {
    this.cartRequestPayload.quantity = quantity
    this.onChange.emit(this.cartRequestPayload);
  }



}
