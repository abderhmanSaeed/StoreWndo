import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';
import { environment } from 'src/environments/environment';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FileService } from 'src/app/shared/services/file/file.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { APIs } from 'src/app/core/config/apis';
import { BuyerProfileService } from '../../servises/buyer-profile/buyer-profile.service';
import { gender } from 'src/app/shared/lookups/gender';
import { BuyerProfile } from 'src/app/shared/models/buyer-profile/buyer-profile';
import * as moment from 'moment';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { AwsS3UploadService } from 'src/app/shared/services/aws/aws-s3-upload/aws-s3-upload.service';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.scss']
})
export class ProfileTabComponent implements OnInit, OnDestroy {


  // readonly 
  readonly dateFormat = 'YYYY-MM-DD'


  // props 
  form!: FormGroup; 
  faCamera = faCamera;
  gendar: any[] = gender;
  buyerProfile: BuyerProfile = {};
  subscription: Subscription = new Subscription();
  mainRippleColor: string = environment.mainRippleColor;
  profilePath: string | undefined = 'assets/media/users/user-placeholder.png'; 

  // booleans 
  formError: boolean = false;
  
  constructor(
    private _FormBuilder: FormBuilder,
    private _FileService: FileService,
    private _HttpService: HttpService,
    private _MessagesService: MessagesService,
    private _BreadcrumbService: BreadcrumbService,
    private _BuyerProfileService: BuyerProfileService,
  ) { }


  ngOnInit(): void {
    this.initForm();
    this.setBreadcrumb();
    this.onProfileDataChange();
  }

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onProfileDataChange(): void {
    this._BuyerProfileService.profileData$.subscribe( (profileData: BuyerProfile ) => {
      const data = {
        ...profileData,
        dateOfBirth: moment(profileData?.dateOfBirth).format(this.dateFormat)
      }
      if (!this.form.value.profile) {
        this.profilePath = data?.profile
      }
      this.buyerProfile = data;
      this.form.patchValue(data);
    })
  }

  initForm(): void {
    this.form = this._FormBuilder.group({
      name: [null, [Validators.required]],
      bio: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      profile: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
    }
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
      // {
      //   name: 'breadcrumb.my-profile',
      //   url: '/buyer-profile/profile'
      // }
    ])
  }


  getControl(controlName: string): any {
    return this.form.controls[controlName]
  }


  onFileChange(event: any): void {
    this._FileService.createObjectURL(event).then( value => {
      this.profilePath = value;
      this.getControl('profile').setValue(event.target.files[0])
    });
  }


  submit(): void {        
   
    if (!this.form.valid) {
      this.formError = true;
      return
    }

    if (!this.form.value.profile) {
      this._MessagesService.openErrorSnackBar('Profile Image is required')
      return
    }

    const formVlue: any = {
      ...this.form.value,
    }


    let payload = new FormData();
    for (const [key, value] of Object.entries(formVlue)) {
      console.log(key, value);
      
      payload.append(key, (value as any));
    }
    this.updateProfile(payload);
  }



  updateProfile(body: FormData): void {
    this.subscription.add(this._HttpService.post(APIs.updateProfile, body).subscribe((res: HResponse ) => {
      if (!res.isSuccess) return;
      this._BuyerProfileService.profileData$.next(res.responseData);
    }));
  }


  
  onImgError(event: any){
    event.target.src = 'assets/media/users/user-placeholder.png'
  }
}
