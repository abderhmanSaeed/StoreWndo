import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'add-voucher',
  templateUrl: './add-voucher.component.html',
  styleUrls: ['./add-voucher.component.scss']
})
export class AddVoucherComponent implements OnInit {


  // inputs 
  @Input() addressId!: number


  // props 
  form!: FormGroup;
  subscription: Subscription = new Subscription();
 
 
  // booleans 
  formError: boolean = false;
 
  constructor(
    private _FormBuilder: FormBuilder,
    private _CartService: CartService,
    private _HttpService: HttpService,
  ) { }
 
 
  ngOnInit(): void {
    this.initForm();
  }
 

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

 
  
  initForm(): void {
    this.form = this._FormBuilder.group({
      code: [, [Validators.required]],
    });
  }

 

  submit(): void {    
    if (!this.form.valid) {
      this.formError = true;
      return
    }

    const payload = {
      ...this.form.value,
      buyerAddressId: this.addressId
    }
    this.validateVoucher(payload);
  }

 
  validateVoucher(payload: any): void {    
     this.subscription.add(
       this._HttpService.post(APIs.validateVoucher, payload).subscribe((res: HResponse ) => {
         if (res?.isSuccess) {    
          console.log('res:',res );
                
          this._CartService.updateData(res?.responseData)
         }
       })
     );
  }
 
}
 