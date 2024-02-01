import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { Constant } from 'src/app/core/config/constant';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';

@Component({
  selector: 'follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit, OnDestroy {

  // inputs props 
  @Input() panelclass: string = '';
  @Input() isMine: boolean | undefined = false;
  @Input() userId: string | undefined = undefined;
  @Input() isFollowed: boolean | undefined = false;
  


  // outputs props 
  @Output() onFollowingChange: EventEmitter<boolean> = new EventEmitter();

  // props
  LanguagesEnum = Languages;
  lang: Languages = Languages.AR;
  subscription: Subscription = new Subscription();

  constructor(
    private _MatDialog: MatDialog,
    public authService: AuthService,
    private _HttpService: HttpService,
    private _BrowserService: BrowserService,
  ) { 
  }


  ngOnInit(): void {
    this.lang = this._BrowserService.getItem(Constant.locale);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  followingHandler(): void {
    if (!this.authService.isAuthenticated) {
      this.openAuthDialog();
      return
    }

    if (this.userId) {
      this.addUpdateFollow(this.userId);
    }

  }


  addUpdateFollow(userId: string): void {

    this.isFollowed = !this.isFollowed;
    this.onFollowingChange.emit(this.isFollowed);
   
    const payload = {
      userId
    }
    this.subscription.add(this._HttpService.postByParams(APIs.addUpdateFollow, {hideLoader: true}, payload).subscribe({
      next: () => {},
      error: (error) => {
        this.isFollowed = !this.isFollowed;
      }
    }));

  }


  openAuthDialog() {
    this._MatDialog.open(AuthComponent, {
      width: '550px',
      panelClass: 'auth-dialog',
      direction: this.lang ==  this.LanguagesEnum.EN ? 'ltr' : 'rtl',
    });
  }

}
