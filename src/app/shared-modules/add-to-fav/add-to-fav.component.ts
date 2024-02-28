import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';

@Component({
  selector: 'add-to-fav',
  templateUrl: './add-to-fav.component.html',
  styleUrls: ['./add-to-fav.component.scss']
})
export class AddToFavComponent implements OnInit, OnDestroy {


  // inputs props
  @Input() panelClass: any;
  @Input() panelStyle: object = {};
  @Input() isFavorite: boolean | undefined = true;
  @Input() wishListCount: number | undefined = 0;
  @Input() productId: string | undefined = undefined;
  @Input() iconClass?: string;


  // outputs props
  @Output() onProductWishChange: EventEmitter<boolean> = new EventEmitter();
  @Output() onProductWishCountChange: EventEmitter<number> = new EventEmitter();

  // props
  subscription: Subscription = new Subscription();


  constructor(
    private _MatDialog: MatDialog,
    private _HttpService: HttpService,
    public authService: AuthService

  ) { }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  toggleFavorite(): void {

    if (!this.authService.isAuthenticated) {
      this.openAuthDialog();
      return
    }

    if (this.productId) {
      this.addUpdateFavorite(this.productId);
    }
  }


  addUpdateFavorite(productId: string): void {


    if (!this.isFavorite) {
      if (this.wishListCount != undefined) {
        this.wishListCount++
        this.onProductWishCountChange.emit(this.wishListCount)
      }
    } else {
      if (this.wishListCount != undefined) {
        this.wishListCount--
        this.onProductWishCountChange.emit(this.wishListCount)
      }
    }
    this.isFavorite = !this.isFavorite;
    this.onProductWishChange.emit(this.isFavorite);

    const payload = {
      productId,
    }
    this.subscription.add(this._HttpService.postByParams(APIs.addUpdateWishList, {hideLoader: true}, payload).subscribe());
  }


  openAuthDialog() {
    this._MatDialog.open(AuthComponent, {
      width: '550px',
      panelClass: 'auth-dialog'
    });
  }

}
