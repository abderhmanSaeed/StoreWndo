import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { randomUsers } from 'src/app/shared/lookups/random-users';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { StatTypes } from 'src/app/modules/buyer-profile/enum/stat-types';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { HttpService } from 'src/app/core/services/http/http.service';
import { MatDialog } from '@angular/material/dialog';
import { FollowersComponent } from 'src/app/shared-modules/followers/followers.component';
import { FollowingComponent } from 'src/app/shared-modules/following/following.component';
import { LikesRecievedComponent } from 'src/app/shared-modules/likes-recieved/likes-recieved.component';
import { Constant } from 'src/app/core/config/constant';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';

@Component({
  selector: 'seller-stats',
  templateUrl: './seller-stats.component.html',
  styleUrls: ['./seller-stats.component.scss']
})
export class SellerStatsComponent implements OnInit {


  // Inputs 
  @Input() set data(data: any) {
    this.sellerData = data;
    this.prepareStats();
  };

  // props 
  stats: any[] = []
  sellerData: any = {};
  faEllipsis = faEllipsis;
  languagesEnum = Languages;
  lang: Languages = Languages.AR;
  randomUsers: string[] = randomUsers;
  subscription: Subscription = new Subscription();
  mainRippleColor: string = environment.mainRippleColor;

  constructor(
    private _MatDialog: MatDialog,
    private _AuthService: AuthService,
    private _HttpService: HttpService,
    private _BrowserService: BrowserService,
  ) { }

  ngOnInit(): void {
    this.lang = this._BrowserService.getItem(Constant.locale);
  }
  

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }


  prepareStats(): void {
    this.stats = [
      {
        name: 'shared.followers',
        iconPath: 'assets/media/profile/icons/stats/followers.svg',
        count: this.sellerData?.followers,
        type: StatTypes.Followers,
        color: '#FF002A',
      },
      {
        name: 'shared.following',
        iconPath: 'assets/media/profile/icons/stats/following.svg',
        count: this.sellerData?.following,
        type: StatTypes.followings,
        color: '#0D1863',
      },
      {
        name: 'shared.likes-received',
        iconPath: 'assets/media/profile/icons/stats/likes.svg',
        count: this.sellerData?.likes,
        type: StatTypes.LikesReceived,
        color: '#1D85EC',
      },
    ]
  }


  
  onStatsClick(StatType: StatTypes): void {

    
    if (!this._AuthService.isAuthenticated) {
      this.openAuthDialog();
      return
    }
    
    switch (StatType) {
      case StatTypes.Followers:
        this.getFollowers();
        break;

      case StatTypes.followings:
        this.getFollowing();
        break;

      case StatTypes.LikesReceived:
        this.getlikeComments();
        break;
    
      default:
        break;
    }
  }



  openAuthDialog() {
    this._MatDialog.open(AuthComponent, {
      width: '550px',
      panelClass: 'auth-dialog',
      direction: this.lang ==  this.languagesEnum.EN ? 'ltr' : 'rtl',
    });
  }


  
  getFollowers(): void {
    this.subscription.add(
      this._HttpService.get(APIs.buyerFollowers, {seller: this.sellerData?.id})
      .subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.openFollowersDialog(res);
        }
      })
    );
  }


  getFollowing(): void {
    this.subscription.add(
      this._HttpService.get(APIs.buyerFollowees, {seller: this.sellerData?.id})
      .subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.openFollowingDialog(res);
        }
      })
    );
  }


  getlikeComments(): void {
    this.subscription.add(
      this._HttpService.get(APIs.wholikeBuyerComments, {seller: this.sellerData?.id})
      .subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.openLikesRecievedDialog(res);
        }
      })
    );
  }


  openFollowersDialog(hResponse: HResponse): void {
    const DialogRef =  this._MatDialog.open( FollowersComponent, {
      width: '550px',
      data: hResponse,
      panelClass: 'custom-dialog-container',
      direction: this.lang ==  this.languagesEnum.EN ? 'ltr' : 'rtl',
    });


    this.subscription.add(
      DialogRef.afterClosed().subscribe( (res: HResponse) => {
        if (res?.isSuccess) {
          // this._MessagesService.openSuccessSnackBar(`Address ${isEdit ? 'updated' : 'added' }  successfully`);

        }
      })
    );
  }


  openFollowingDialog(hResponse: HResponse): void {
    const DialogRef =  this._MatDialog.open( FollowingComponent, {
      width: '550px',
      data: hResponse,
      panelClass: 'custom-dialog-container',
      direction: this.lang ==  this.languagesEnum.EN ? 'ltr' : 'rtl',
    });


    this.subscription.add(
      DialogRef.afterClosed().subscribe( (res: HResponse) => {
        if (res?.isSuccess) {
          // this._MessagesService.openSuccessSnackBar(`Address ${isEdit ? 'updated' : 'added' }  successfully`);

        }
      })
    );
  }


  openLikesRecievedDialog(hResponse: HResponse): void {
    const DialogRef =  this._MatDialog.open( LikesRecievedComponent, {
      width: '550px',
      data: hResponse,
      panelClass: 'custom-dialog-container',
      direction: this.lang ==  this.languagesEnum.EN ? 'ltr' : 'rtl',
    });


    this.subscription.add(
      DialogRef.afterClosed().subscribe( (res: HResponse) => {
        if (res?.isSuccess) {
          // this._MessagesService.openSuccessSnackBar(`Address ${isEdit ? 'updated' : 'added' }  successfully`);

        }
      })
    );
  }


}
