import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';
import { Cart } from '../../models/cart/cart';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {


  cart: Cart = {
    carts: []
  };
  subscription: Subscription = new Subscription();

  constructor(
    private _CartService: CartService,
    private _BreadcrumbService: BreadcrumbService
  ) { }


  ngOnInit(): void {
    this.getCart();
    this.setBreadcrumb();
    this.increaseProgressbarValue();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getCart(): void {
    this.subscription.add(
      this._CartService.cart.subscribe( (cart: Cart) => {
        if (cart) {          
          this.cart = cart;
        }
      })
    )
  }


  increaseProgressbarValue(): void {
    this._CartService.$progressbarValue.next(0)
  }


  setBreadcrumb(): void {
    this._BreadcrumbService.$items.next([
      {
        name: 'breadcrumb.home',
        url: '/'
      },
      {
        name: 'breadcrumb.cart',
        url: '/cart/check-out'
      }
    ])
  }

}
