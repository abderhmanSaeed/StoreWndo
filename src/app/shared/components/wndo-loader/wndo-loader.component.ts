import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wndo-loader',
  templateUrl: './wndo-loader.component.html',
  styleUrls: ['./wndo-loader.component.scss']
})
export class WndoLoaderComponent implements OnInit {

  @Input() bdColor: string = '#fff';

  constructor() { }

  ngOnInit(): void {
  }

}
