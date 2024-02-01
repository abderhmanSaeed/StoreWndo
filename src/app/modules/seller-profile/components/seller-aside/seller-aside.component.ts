import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'seller-aside',
  templateUrl: './seller-aside.component.html',
  styleUrls: ['./seller-aside.component.scss']
})
export class SellerAsideComponent implements OnInit {


  // Inputs 
  @Input() data: any = {}

  constructor() { }

  ngOnInit(): void {
  }

}
