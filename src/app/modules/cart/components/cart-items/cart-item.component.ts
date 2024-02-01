import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faEllipsisVertical, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ConfirmFor } from 'src/app/shared-modules/confirmation-dialog/enums/confirm-for/confirm-for';
import { ConfirmationService } from 'src/app/shared-modules/confirmation-dialog/services/confirmation/confirmation.service';
import { ProductFeaturesComponent } from 'src/app/shared-modules/product-features/product-features.component';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { ProActions } from 'src/app/shared/enums/pro-actions/pro-actions';
import { DropdownItem } from 'src/app/shared/models/dropdown-item/dropdown-item';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { Product } from 'src/app/shared/models/product/product';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit, OnDestroy {


  // inputs props 
  @Input() item!: Product;

  // props
  faTrashCan = faTrashCan;
  productActions: DropdownItem[] = [
    {
      key: 2,
      label: 'actions.delete',
      icon: this.faTrashCan,
    },
  ]
  faEllipsisVertical = faEllipsisVertical;
  subscription: Subscription = new Subscription();
  LanguagesEnum = Languages;
  lang: Languages = (this._TranslateService.currentLang as Languages);

  constructor(
    private _MatDialog: MatDialog,
    private _HttpService: HttpService,
    private _CartService: CartService,
    private _TranslateService: TranslateService,
    private _ConfirmationService: ConfirmationService,
  ) { }


  ngOnInit(): void {
    this.onLangChange();
    this.productActionsHandler(this.item);
  }


  onLangChange(): void {
    this.subscription.add( this._TranslateService.onLangChange.subscribe(({lang}: any) => {
      this.lang = (lang as Languages);
    }));
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  productActionsHandler(item: Product): void {
    if (item.colorId || item.sizeId) {
      this.productActions.unshift(
        {
          key: 1,
          label: 'actions.edit',
          imgPath: '<img width="15px" class="ltr:me-2 rtl:me-2" src="assets/media/svg/pen-i.svg" alt="Edit" class="img-fluid m-auto">'
        },
      )
    }
  }


  onActionClick(action: DropdownItem): void {
    switch (action.key) {
      case ProActions.Edit:
          this.getSizesColorsOfProducts(this.item.productId);
        break;

      case ProActions.Delete:
          this.openDeleteCartConfirmationDialog();
        break;
    
      default:
        break;
    }
  }



  openDeleteCartConfirmationDialog(): void {
    this.subscription.add( this._ConfirmationService.openConfirmationDialog(ConfirmFor.DeleteCartItem)
     .subscribe((confirmed) => {
      if (confirmed) {
        this.deleteCart(this.item.cartId)
      }
     }));
   };


  getSizesColorsOfProducts(productId: any): void {
    this.subscription.add( this._HttpService.get(`${APIs.getSizesColorsOfProducts}/${productId}`)
    .subscribe((res: HResponse) => {
      if (res.responseData?.colorWithSizes?.length || res.responseData?.sizes.length) {
        this.openProductFeaturesDialog(this.item.cartId , res.responseData);
      }
    }))
  }

 

  openProductFeaturesDialog(cartId: number, productDetails: any): void {
    const dialogRef = this._MatDialog.open(ProductFeaturesComponent, {
      width: '650px',
      data: {
        cartId,
        isEdit: true,
        ...productDetails
      },
      direction: this.lang ==  this.LanguagesEnum.EN ? 'ltr' : 'rtl',
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe( (res: any)=> {
        if (res?.isSuccess) {
          this._CartService.updateItem(res.responseData.cartItem, res.responseData);
        }
      })
    )
  }


  deleteCart(cartId: number): void {
    this.subscription.add(
      this._HttpService.delete(`${APIs.deleteCart}/${cartId}`).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this._CartService.removeItem(cartId, res.responseData);
          let cartItemCount = this._CartService.onCartItemsCountChange$.getValue();
          cartItemCount--
          this._CartService.onCartItemsCountChange$.next(cartItemCount);
        }
      })
    );
  }


  

}
