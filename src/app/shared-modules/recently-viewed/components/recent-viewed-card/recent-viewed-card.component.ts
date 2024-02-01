import { Component, Input, OnInit } from '@angular/core';
import { faVideo , faExpand} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ProductDetailsDialogComponent } from 'src/app/shared-modules/product-details-dialog/product-details-dialog.component';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { RecentViewed } from '../../models/recent-viewed-dto/recent-viewed';
import { MatDialog } from '@angular/material/dialog';
import { Constant } from 'src/app/core/config/constant';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { AukVideogularService } from 'src/app/shared/services/auk-videogular/auk-videogular.service';



@Component({
  selector: 'recent-viewed-card',
  templateUrl: './recent-viewed-card.component.html',
  styleUrls: ['./recent-viewed-card.component.scss']
})
export class RecentViewedCardComponent implements OnInit {

 
  // begin:: inputs props 
  @Input() data: RecentViewed = {};

  // props 
  faVideo = faVideo;
  faExpand = faExpand;
  languagesEnum = Languages;
  vgApiService!: VgApiService;
  lang: Languages = Languages.AR;
  subscription: Subscription = new Subscription();


  // Booleans 
  showVideo: boolean = false;
  isLoading: boolean = false;



  constructor(
    private _MatDialog: MatDialog,
    private _HttpService: HttpService,
    private _BrowserService: BrowserService,
    private _AukVideogularService: AukVideogularService,
  ) { }

  
  ngOnInit(): void {
    this.lang = this._BrowserService.getItem(Constant.locale);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onImgError(event: any){
    event.target.src = 'assets/media/svg/prod-img-placeholder.svg'
  }


  
  onExpandClick(productId: any): void {
    if (productId) {
      this.getProductDetails(productId)
    }    
   }


  getProductDetails(productId: any): void {
    this.subscription.add( this._HttpService.get(`${APIs.getProductDetails}/${productId}`)
    .subscribe((res: HResponse) => {
      this.openGridCardPerviewDialog(res.responseData);
    }))
  }

  
  openGridCardPerviewDialog(data: any): void {    
    this._MatDialog.open(ProductDetailsDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      data,
      direction: this.lang == Languages.AR ? 'rtl' : 'ltr'
    });
  }


  
  playVideo(): void {
    this.isLoading = true;  
    this.showVideo = true;  
  }


  
  onPlayerReady(api: VgApiService) {
    this.vgApiService = api;
    this.subscription.add( this.vgApiService.subscriptions.canPlay.subscribe( (res: any) => {  
      this._AukVideogularService.addVideo(api), 
      this.isLoading = false;
      this.playVdo();
    }))
  }

  
  playVdo() {
    this._AukVideogularService.pauseAllVideos();
    this.vgApiService.play();
  }

  
  onLeaveonCard(): void {
    this.isLoading = false;
    this.showVideo = false;
  }


}
