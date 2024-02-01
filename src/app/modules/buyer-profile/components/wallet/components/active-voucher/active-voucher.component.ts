import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Voucher } from 'src/app/modules/buyer-profile/models/user-vouchers/user-vouchers';
import { HelperFunctionsService } from 'src/app/shared/services/helper-funcctions/helper-functions.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';

@Component({
  selector: 'active-voucher',
  templateUrl: './active-voucher.component.html',
  styleUrls: ['./active-voucher.component.scss']
})
export class ActiveVoucherComponent implements OnInit {

  // Inputs 
  @Input() voucher: Voucher = {};

  constructor(
    private _MessagesService: MessagesService,
    private _TranslateService: TranslateService,
    private _HelperFunctionsService: HelperFunctionsService,
  ) { }

  ngOnInit(): void {
  }


  copy(content: any): void {
    this._HelperFunctionsService.copy(content).then( () => {
      this._MessagesService.openSuccessSnackBar(
        this._TranslateService.instant('shared.copied')
      , 3000)
    })
  }

}
