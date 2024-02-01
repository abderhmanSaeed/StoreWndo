import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';

@Component({
  selector: 'app-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
  styleUrls: ['./product-details-dialog.component.scss']
})
export class ProductDetailsDialogComponent implements OnInit {

 // props 
 vgApiService!: VgApiService;
 subscription: Subscription = new Subscription();

 // booleans 
 showSizesColors: boolean = false;
 isVideoLoading: boolean = true;

 constructor(
   private _HttpService: HttpService,
   private _MessagesService: MessagesService,
   @Inject(MAT_DIALOG_DATA) public productDetails: any
 ) { }

 ngOnInit(): void {

 }


 ngOnDestroy(): void {
   this.subscription.unsubscribe();
 }

 onPlayerReady(api: VgApiService) {
   this.vgApiService = api;
   this.subscription.add( this.vgApiService.subscriptions.canPlay.subscribe( (res: any) => {   
     this.isVideoLoading = false;
     this.playVideo();
   }))
 }

 playVideo() {
   this.vgApiService.play();
 }

 onAddToCart(e: any): void {
   console.log(e);
   if (e.showSizesColors) {
     this.showSizesColors = true;
   }
 }


 onProductFeaturesSave(data: any) {
   console.log('hello', data);
   if (data) this.addToCart(data);
 }


 addToCart(data: any): void {  

   const payload = {
     productId: this.productDetails.id,
     ...data
   }
   this.subscription.add(
     this._HttpService.post(APIs.addToCart, payload).subscribe( (res: HResponse) => {
       if (res.isSuccess) {
         this._MessagesService.openSuccessSnackBar(res.responseData.message);
         this.showSizesColors = false;
         this.productDetails.isInCart = true;
       } 
     })  
   );
 }

}
