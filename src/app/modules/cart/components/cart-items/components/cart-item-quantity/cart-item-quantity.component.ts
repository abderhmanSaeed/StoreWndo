import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faPlus , faMinus} from '@fortawesome/free-solid-svg-icons';
import { finalize, Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CartService } from 'src/app/modules/cart/services/cart/cart.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';

@Component({
  selector: 'cart-item-quantity',
  templateUrl: './cart-item-quantity.component.html',
  styleUrls: ['./cart-item-quantity.component.scss']
})
export class CartItemQuantityComponent implements OnInit, OnDestroy {


  // props 
  faPlus = faPlus;
  faMinus = faMinus;
  @Input() cartId!: number;
  @Input() quantity: number = 1;
  @Input() voucherCode!: string;
  @Input() buyerAddressId: number = 1;
  subscription: Subscription = new Subscription();


  // booleans 
  loading: boolean = false;


  constructor(
    private _HttpService: HttpService,
    private _CartService: CartService,
  ) { }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }


  increaseQuantity() {        
    this.updateQuantity(1);
  }
  

  decreaseQuantity() {   
    if (this.quantity != 1) {
      this.updateQuantity(-1);
    }
  }


  updateQuantity(quantity: number): void {

    this.loading = true;

    const payload = {
      quantity,
      id: this.cartId
    }

    this.subscription.add(
      this._HttpService.put(APIs.updateQuantity, payload, {hideLoader: true})
      .pipe(
        finalize(() => this.loading = false ) // Execute when the observable completes
      )
      .subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          if(quantity == 1) {
            this.quantity++
          } else {
            this.quantity--
          }
          this._CartService.updateQuantity(this.cartId, this.quantity, res.responseData);
        }
      })
    );
  }

}
