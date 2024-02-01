import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'radio-btn',
  templateUrl: './radio-btn.component.html',
  styleUrls: ['./radio-btn.component.scss']
})
export class RadioBtnComponent implements OnInit {


  @Input() id: any = '';
  @Input() label: any = ''
  @Input() name: string = '';
  @Input() value: any = false;
  @Input() panelClass: string = '';
  @Input() checked: boolean = false;

  @Output() onChange: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  emitValue(e: any) {
    this.onChange.emit(e.target.value);
  }

}
