import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Section } from 'aws-sdk/clients/gamesparks';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ShortsService } from 'src/app/modules/explore/modules/shorts/services/shorts/shorts.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { RouterService } from 'src/app/shared/services/router/router.service';
import { DynamicAsideMenuConfig } from '../../sidebar/configs/dynamic-aside-menu.config';

@Component({
  selector: 'app-mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss']
})
export class MobileSidebarComponent implements OnInit {

 // inputs props
 @Input() draweState: boolean = false;
 @Input() openedStart: boolean = false;
 @Output() toggleDrawer: EventEmitter<boolean> = new EventEmitter(false);


 // props
 sections: Section[] = [];
 currentRoute: string = '';
 selectedSectionId: number | null = null;
 nav1: any[] = DynamicAsideMenuConfig.menu1;
 subscription: Subscription = new Subscription();



 constructor(
   private _HttpService: HttpService,
   public routerService: RouterService,
   private _ShortsService: ShortsService,
 ) { }


 ngOnInit(): void {
   this.getAllData();
   this.onSectionChange();
 }


 ngOnDestroy(): void {
   this.subscription.unsubscribe();
 }


 onSectionChange(): void {
   this.subscription.add(
     this._ShortsService.sectionChange$.subscribe( (id: number | null) => {
       this.selectedSectionId = id;
     })
   );
 }


 getAllData(): void {
   this.getSectionsWithCategories();
 }


 /**
  *
  * @param svgURL
  * @returns
  */
 bindSvgIcon(svgURL: string): object {
   return {
     '-webkit-mask-image': `url(${svgURL})`,
     'mask-image': `url(${svgURL})`
   }
 }


 getSectionsWithCategories(): void {
   this.subscription.add(this._HttpService.get(APIs.getSectionsWithCategories).subscribe((res: HResponse ) => {
     this.sections = res.responseData?.items;
   }));
 }

}
