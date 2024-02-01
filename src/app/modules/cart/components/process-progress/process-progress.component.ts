import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'process-progress',
  templateUrl: './process-progress.component.html',
  styleUrls: ['./process-progress.component.scss']
})
export class ProcessProgressComponent implements OnInit, OnDestroy {



  progressbarValue: number = 0;
  subscription: Subscription = new Subscription();

  constructor(
    private _CartService: CartService
  ) { }

  ngOnInit(): void {
    this.progressbarSubscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  

  progressbarSubscription(): void {
    this.subscription.add(
      this._CartService.$progressbarValue.subscribe( value => {
        this.progressbarValue = value
      })
    )
  }


}
