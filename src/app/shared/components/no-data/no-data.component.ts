import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent implements OnInit {

  // inputs
  @Input() size: 'xl' | 'sm' = 'sm';
  @Input() isSorry: boolean = false;
  @Input() message: string = 'No data to show';

  constructor() { }

  ngOnInit(): void {
  }

}
