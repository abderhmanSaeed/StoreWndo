import { Injectable } from '@angular/core';
import { ConfirmationDialogComponent } from '../../confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmFor } from '../../enums/confirm-for/confirm-for';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class ConfirmationService {

  // props 
  subscription: Subscription = new Subscription();

  constructor(
    private _MatDialog: MatDialog,
  ) { }

  /**
   * 
   * @param confirmFor 
   * @returns Observable after confirm
   */
  openConfirmationDialog(confirmFor: ConfirmFor): Observable<any> {

    let data = {
      title: '',
      message: '',
      confirmFor: '',
      buttonTxt: 'actions.ok'
    }

    switch (confirmFor) {
   
      case ConfirmFor.Logout:        
        data.title = 'confirmations.logout-confirmation';
        data.message = 'confirmations.are-you-sure-logout';
        data.confirmFor = ConfirmFor.Logout;
        break;

      case ConfirmFor.DeleteCartItem:        
        data.title = 'confirmations.delete-item';
        data.message = 'confirmations.you-want-delete-order';
        data.confirmFor = ConfirmFor.DeleteCartItem;
        break;

      case ConfirmFor.DeleteAddress:        
        data.title = 'confirmations.delete-address';
        data.message = 'confirmations.you-want-to-delete-address';
        data.confirmFor = ConfirmFor.DeleteAddress;
        break;

      case ConfirmFor.OrderNotConfirmed:        
        data.title = 'confirmations.order-not-confirmed';
        data.message = 'confirmations.credit-card-payment-failed';
        data.buttonTxt = 'actions.try-again'
        data.confirmFor = ConfirmFor.OrderNotConfirmed;
        break;

      case ConfirmFor.DeleteComment:        
        data.title = 'confirmations.delete-comment';
        data.message = 'confirmations.you-want-delete-comment';
        data.confirmFor = ConfirmFor.DeleteComment;
        break;

    

      default:
        break;
    }
    
    const dialogRef = this._MatDialog.open(ConfirmationDialogComponent, {
      width: '450px',
      panelClass: 'transparent-dialog',
      data
    });
    return dialogRef.afterClosed()
  }


  
}
