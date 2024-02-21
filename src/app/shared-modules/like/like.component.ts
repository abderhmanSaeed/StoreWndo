import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit, OnDestroy {


  // inputs props
  @Input() panelClass: any;
  @Input() panelStyle: object = {};
  @Input() isliked: boolean | undefined = false;
  @Input() LikesCount: number | undefined = 0;
  @Input() productId: string | undefined = undefined;
  @Input() isDefaultIcon: boolean  = true;

  // outputs props
  @Output() onProductLikeChange: EventEmitter<boolean> = new EventEmitter();
  @Output() onProductLikesCountChange: EventEmitter<number> = new EventEmitter();


  // props
  subscription: Subscription = new Subscription();

  constructor(
    private _MatDialog: MatDialog,
    public authService: AuthService,
    private _HttpService: HttpService,
  ) { }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  toggleLike(): void {

    if (!this.authService.isAuthenticated) {
      this.openAuthDialog();
      return
    }


    if (this.productId) {
      this.addUpdateLike(this.productId);
    }

  }


  addUpdateLike(productId: string): void {
    if (!this.isliked) {
      if (this.LikesCount != undefined) {
        this.LikesCount++
        this.onProductLikesCountChange.emit(this.LikesCount)
      }
    } else {
      if (this.LikesCount != undefined) {
        this.LikesCount--
        this.onProductLikesCountChange.emit(this.LikesCount)
      }
    }
    this.isliked = !this.isliked;
    this.onProductLikeChange.emit(this.isliked);

    const payload = {
      productId
    }
    this.subscription.add(this._HttpService.postByParams(APIs.addUpdateLike, {hideLoader: true} ,payload).subscribe());
  }




  openAuthDialog() {
    this._MatDialog.open(AuthComponent, {
      width: '550px',
      panelClass: 'auth-dialog'
    });
  }

}
