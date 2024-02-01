import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HelperFunctionsService } from 'src/app/shared/services/helper-funcctions/helper-functions.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { environment } from 'src/environments/environment';
import { ExploreProduct } from '../../models/explore-product/explore-product';

@Component({
  selector: 'item-stats',
  templateUrl: './item-stats.component.html',
  styleUrls: ['./item-stats.component.scss']
})
export class ItemStatsComponent implements OnInit {


  @Input() set likes( val: any ) {    
    this.stats[0].value = val
  }

  @Input() set commentsCount( val: any ) {    
    this.stats[1].value = val
  }

  @Input() set wishListCount( val: any ) {    
    this.stats[2].value = val
  }

  @Input() set productId( val: any ) {    
    this.pId = val;
  }
  

  stats: any[] = [];
  pId: string | null = null;

  constructor(
    private _MessagesService: MessagesService,
    private _TranslateService: TranslateService,
    private _HelperFunctionsService: HelperFunctionsService,
  ) {
    this.getStats();
   }

  ngOnInit(): void {
  }


  getStats() {
    this.stats = [
      {
        icon: '',
        imgPath: 'assets/media/svg/like.svg',
        value: 0,
        bg: '#F8F8F8',
        color: '#A2A2A2'
      },
      {
        icon: '',
        imgPath: 'assets/media/svg/comment.svg',
        value: 0,
        bg: '#EBFFFE',
        color: '#3ABFBC'
      },
      {
        icon: '',
        imgPath: 'assets/media/svg/featherheart.svg',
        value: 0,
        bg: '#FFFACC',
        color: '#BEB13B'
      },
      {
        icon: 'share',
        imgPath: '',
        type: 'action',
        action: 'share',
        value: 0,
        bg: '#f2f2f5',
        color: '#04043f'
      },
    ]
  }


  onClick(item: any):void {

    switch (item.action) {
      case 'share':
        this.copyProductDetailsLink();
      break;
    
      default:
        break;
    }
  }


  copyProductDetailsLink(): void {
    this._HelperFunctionsService.copy(environment.routes.productDetails + this.pId).then( () => {
      this._MessagesService.openSuccessSnackBar(
        this._TranslateService.instant('shared.copied')
      , 3000)
    })
  }

}
