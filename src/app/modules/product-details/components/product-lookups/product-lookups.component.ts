import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-lookups',
  templateUrl: './product-lookups.component.html',
  styleUrls: ['./product-lookups.component.scss']
})
export class ProductLookupsComponent implements OnInit {

  
  // Inputs 
  @Input() lookups: any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
