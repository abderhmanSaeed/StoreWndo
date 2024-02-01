import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/shared/models/product/product';
import { environment } from 'src/environments/environment';
import { CardCData } from './models/card-c-data/card-c-data';

@Component({
  selector: 'auk-card-c',
  templateUrl: './auk-card-c.component.html',
  styleUrls: ['./auk-card-c.component.scss']
})
export class AukCardCComponent implements OnInit {

  // Inputs props
  @Input() data: CardCData = {}


  faStar = faStar;
  mainRippleColor: string = environment.mainRippleColor

  constructor() { }

  ngOnInit(): void {
  }


  onImgError(event: any){
    event.target.src = 'assets/media/logos/smile.svg'
  }

}