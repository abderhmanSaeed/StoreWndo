import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { finalize, Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { Constant } from 'src/app/core/config/constant';
import { HttpService } from 'src/app/core/services/http/http.service';
import { FollowersComponent } from 'src/app/shared-modules/followers/followers.component';
import { FollowingComponent } from 'src/app/shared-modules/following/following.component';
import { LikesRecievedComponent } from 'src/app/shared-modules/likes-recieved/likes-recieved.component';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { randomUsers } from 'src/app/shared/lookups/random-users';
import { BuyerProfile } from 'src/app/shared/models/buyer-profile/buyer-profile';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { environment } from 'src/environments/environment';
import { StatTypes } from '../../enum/stat-types';



@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  // Inputs 
  @Input() set data(data: BuyerProfile) {
    this.prepareStats(data);
  };

  // props 
  stats: any = {};
  faEllipsis = faEllipsis;
  languagesEnum = Languages;
  lang: Languages = Languages.AR;
  randomUsers: string[] = randomUsers;
  subscription: Subscription = new Subscription();
  mainRippleColor: string = environment.mainRippleColor;
 

  constructor(
    private _MatDialog: MatDialog,
    private _HttpService: HttpService,
    private _BrowserService: BrowserService,
  ) { }

  ngOnInit(): void {
    this.lang = this._BrowserService.getItem(Constant.locale);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  

  onStatsClick(StatType: StatTypes): void {
    console.log(StatType);
    
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



  getFollowers(): void {
    this.subscription.add(
      this._HttpService.get(APIs.buyerFollowers)
      .subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.openFollowersDialog(res);
        }
      })
    );
  }


  getFollowing(): void {
    this.subscription.add(
      this._HttpService.get(APIs.buyerFollowees)
      .subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.openFollowingDialog(res);
        }
      })
    );
  }


  getlikeComments(): void {
    this.subscription.add(
      this._HttpService.get(APIs.wholikeBuyerComments)
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


  prepareStats(data: BuyerProfile): void {    
    this.stats = [
      {
        name: 'shared.followers',
        iconPath: 'assets/media/profile/icons/stats/followers.svg',
        count: data?.followers,
        type: StatTypes.Followers,
        color: '#FF002A',
      },
      {
        name: 'shared.following',
        iconPath: 'assets/media/profile/icons/stats/following.svg',
        count: data?.followings,
        type: StatTypes.followings,
        color: '#0D1863',
      },
      {
        name: 'shared.likes-received',
        iconPath: 'assets/media/profile/icons/stats/likes.svg',
        count: data?.likes,
        type: StatTypes.LikesReceived,
        color: '#1D85EC',
      },
    ]
  }

}
