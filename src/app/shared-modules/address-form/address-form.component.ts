import { query } from '@angular/animations';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize, Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { addressIcons } from 'src/app/shared/lookups/address-icons';
import { Address } from 'src/app/shared/models/address/address';
import { AddressIcon } from 'src/app/shared/models/address/address-icon';
import { City } from 'src/app/shared/models/city/city';
import { DistrictsAndZones } from 'src/app/shared/models/districts-and-zones/districts-and-zones';
import { HResponse } from 'src/app/shared/models/http-response/http-response';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit, OnDestroy {

  // Inputs 
  @Input() back: boolean = false;

  // Inputs 
  @Output() onBack: EventEmitter<boolean> = new EventEmitter();


  addressIcons: AddressIcon[] = addressIcons

  form!: FormGroup;
  cities: City[] = []; 
  initAddress: Address | null = null;
  districtsAndZones: DistrictsAndZones = {};
  subscription: Subscription = new Subscription();


  // booleans 
  isEdit: boolean = false;
  formError: boolean = false;
  cityLoading: boolean = false;
  districtsAndZonesLoading: boolean = false;

  constructor(
    private _FormBuilder: FormBuilder,
    private _HttpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _AddressFormComponentsDialogRef: MatDialogRef<AddressFormComponent>,
  ) { }


  ngOnInit(): void {
    this.isEdit = this.data?.isEdit;
    this.initForm();
    this.getCities();
    this.prepareInitAddress();
  }


  prepareInitAddress(): void {
    if ( !this.data?.address ) return
    const { address } = this.data;    
    this.initAddress = {
      ...address,
      icon: +address.icon,
      cityId: address?.city.id,
      zoneId: address?.zone.id,
      districtId: address?.district.id,
    }

    if (address?.city.id) {
      this.getDistrictsAndZones(address?.city.id);
    }
    
    if (this.initAddress) {
      this.form.patchValue(this.initAddress);
    }
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  initForm(): void {
    this.form = this._FormBuilder.group({
      landMark: [''],
      id: [0, [Validators.required]],
      icon: [null, [Validators.required]],
      name: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      zoneId: ['', [Validators.required]],
      street: ['', [Validators.required]],
      buildingNo: ['', [Validators.required]],
      districtId: ['', [Validators.required]],
      isDefault: [false, [Validators.required]],
    });
  }



  submit(): void {
    console.log(this.form.value);
    
    if (!this.form.valid) {
      this.formError = true;
      return
    }

    if (this.isEdit) {
      this.updateAddress(this.form.value);
    } else {
      this.addAddress(this.form.value);
    }
  }


  addAddress(payload: any): void {
    this.subscription.add(
      this._HttpService.post(APIs.addAddress, payload).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.handleTheNextAddAndUpdateAddress(res);
        }
      })
    );
  }


  updateAddress(payload: any): void {
    this.subscription.add(
      this._HttpService.put(APIs.addAddress, payload).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.handleTheNextAddAndUpdateAddress(res);
        }
      })
    );
  }


  handleTheNextAddAndUpdateAddress(res: HResponse): void {
    this._AddressFormComponentsDialogRef.close(!this.back ? res : null);
  }

  getCities(): void {
    this.cityLoading = true;

    const query = {
      hideLoader: true
    };
    this.subscription.add(
      this._HttpService.get(APIs.getCities, query)
      .pipe(
        finalize( () => {
          this.cityLoading = false;
        })
      )
      .subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          console.log(res, 'res');
          this.cities = res.responseData.items;
        }
      })
    );
  }



  onCityChange(cityId: number): void {
    if (cityId) {
      this.getDistrictsAndZones(cityId);
    }
  }



  getDistrictsAndZones(cityId: number): void {
    this.districtsAndZones = {};
    this.districtsAndZonesLoading = true;
    const query = {
      hideLoader: true
    };
    this.subscription.add(
      this._HttpService.get(`${APIs.getDistrictsAndZones}/${cityId}`, query)
      .pipe(
        finalize( () => {
          this.districtsAndZonesLoading = false;
        })
      )
      .subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.districtsAndZones = res.responseData;
        }
      })
    );
  }


}
