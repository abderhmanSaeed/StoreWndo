import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HelperFunctionsService } from 'src/app/shared/services/helper-funcctions/helper-functions.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';

@Component({
  selector: 'auk-sharing',
  templateUrl: './auk-sharing.component.html',
  styleUrls: ['./auk-sharing.component.scss']
})
export class AukSharingComponent implements OnInit {

  @Input() content: any;
  @Input() panelClass: any;
  @Input() panelStyle: object = {};

  constructor(
    private _MessagesService: MessagesService,
    private _TranslateService: TranslateService,
    private _HelperFunctionsService: HelperFunctionsService,
  ) { }

  
  ngOnInit(): void {
  }


  copy(): void {
    this._HelperFunctionsService.copy(this.content).then( () => {
      this._MessagesService.openSuccessSnackBar(
        this._TranslateService.instant('shared.copied')
      , 3000)
    })
  }

}
