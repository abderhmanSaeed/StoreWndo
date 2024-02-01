import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { AddressFormComponent } from 'src/app/shared-modules/address-form/address-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Address } from 'src/app/shared/models/address/address';
import { concatMap, of, Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { AddressIcon } from 'src/app/shared/models/address/address-icon';
import { addressIcons } from 'src/app/shared/lookups/address-icons';
import { ConfirmFor } from 'src/app/shared-modules/confirmation-dialog/enums/confirm-for/confirm-for';
import { ConfirmationService } from 'src/app/shared-modules/confirmation-dialog/services/confirmation/confirmation.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Constant } from 'src/app/core/config/constant';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit, OnDestroy {

  // props 
  faPlus = faPlus;
  faTrashCan = faTrashCan;
  languagesEnum = Languages;
  addresses: Address[] = [];
  lang: Languages = Languages.AR;
  addressIcons: AddressIcon[] = addressIcons;
  subscription: Subscription = new Subscription();

  constructor(
    private _MatDialog: MatDialog,
    private _HttpService: HttpService,
    private _BrowserService: BrowserService,
    private _MessagesService: MessagesService,
    private _BreadcrumbService: BreadcrumbService,
    private _ConfirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.setBreadcrumb();
    this.getAllData();  
    this.lang = this._BrowserService.getItem(Constant.locale);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getAllData(): void {
    this.getAddresses();
  }


  getAddresses(): void {
    this.subscription.add(
      this._HttpService.get(APIs.getAddresses).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.addresses = res.responseData?.items;
        }
      })
    );
  }


  openAddressFormDialog(address: Address | null = null, isEdit = false): void {

    const DialogRef =  this._MatDialog.open(AddressFormComponent, {
      width: '850px',
      panelClass: 'address-dialog',
      data: {
        address,
        isEdit
      },
      direction: this.lang ==  this.languagesEnum.EN ? 'ltr' : 'rtl',
    });


    this.subscription.add(
      DialogRef.afterClosed().subscribe( (res: HResponse) => {
        if (res.isSuccess) {
          this._MessagesService.openSuccessSnackBar(`Address ${isEdit ? 'updated' : 'added' }  successfully`);
          this.getAddresses();
        }
      })
    );
  }


  setBreadcrumb(): void {
    this._BreadcrumbService.$items.next([
      {
        name: 'breadcrumb.home',
        url: '/'
      },
      {
        name: 'breadcrumb.profile',
        url: '/buyer-profile'
      },
      {
        name: 'breadcrumb.my-addresses',
        url: '/buyer-profile/addresses'
      }
    ])
  }


  openDeleteAddressConfirmationDialog(id: number | undefined): void {
    this.subscription.add( this._ConfirmationService.openConfirmationDialog(ConfirmFor.DeleteAddress)
     .subscribe((confirmed) => {
      if (confirmed) {
        this.deleteAddress(id)
      }
     }));
  };


  onIsDefaultChange({checked}: MatSlideToggleChange, address: any): void {

    if (address) {
      const payload = {
        ...address,
        isDefault: checked,
        icon: +address?.icon,
        cityId: address?.city.id,
        zoneId: address?.zone.id,
        districtId: address?.district.id,
      };
      this.updateAddress(payload);
    }
  }


  updateAddress(payload: any): void {
    this.subscription.add(
      this._HttpService.put(APIs.addAddress, payload).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.updataIsDefaultState(payload)
        }
      })
    );
  }


  updataIsDefaultState(defaultAddress: any): void {
    this.addresses.forEach(address => {
      if (address?.id != defaultAddress?.id) {
        address.isDefault = false;
      } else {
        address.isDefault = true;
      }
    })
  }


  deleteAddress(id: number | undefined): void {
    this.subscription.add(
      this._HttpService.delete(`${APIs.getAddresses}/${id}`)
      .pipe(
        concatMap( (res: HResponse) => {
          if (res.isSuccess) {
            this._MessagesService.openSuccessSnackBar('Address deleted successfully');
            return this._HttpService.get(APIs.getAddresses)
          } else {
            return of([])
          }
        }))
        .subscribe((res: HResponse ) => {
          if (res?.isSuccess) {
            this.addresses = res.responseData?.items;
          }
      })
    );
  }

}
