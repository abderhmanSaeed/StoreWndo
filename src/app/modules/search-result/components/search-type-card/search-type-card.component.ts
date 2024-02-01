import { Component, Input, OnInit } from '@angular/core';
import { SearchTypes } from 'src/app/shared/enums/search-types/search-types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'search-type-card',
  templateUrl: './search-type-card.component.html',
  styleUrls: ['./search-type-card.component.scss']
})
export class SearchTypeCardComponent implements OnInit {


  // inputs
  @Input() data: any = null;
  @Input() type: SearchTypes = SearchTypes.Section;

  // props 
  searchTypes = SearchTypes;
  mainRippleColor: string = environment.mainRippleColor


  constructor() { }

  ngOnInit(): void {
  }

}
