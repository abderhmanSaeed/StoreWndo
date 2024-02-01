import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { City } from 'src/app/shared/models/city/city';
import { HResponse } from 'src/app/shared/models/http-response/http-response';

@Component({
  selector: 'location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy {



  // Inputs
  @Input() city: City | null | undefined = null;


  // Inputs 
  @Output() onChange: EventEmitter<any> = new EventEmitter();


  // Props 
  cities: City[] = []; 
  subscription: Subscription = new Subscription();


  // Booleans
  cityLoading: boolean = false;

  
  constructor(
    private _HttpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.getCities();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
      this.onChange.emit({cityId});
    }
  }
  

}
