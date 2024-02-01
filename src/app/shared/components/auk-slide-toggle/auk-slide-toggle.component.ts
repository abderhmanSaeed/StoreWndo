import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'auk-slide-toggle',
  templateUrl: './auk-slide-toggle.component.html',
  styleUrls: ['./auk-slide-toggle.component.scss']
})
export class AukSlideToggleComponent implements OnInit {


  // inputs props 
  @Input() label: string = 'label'
  @Input() panelClass: string = '';
  @Input() size: 'sm' | 'lg' = 'lg';
  @Input() vertical: boolean = false;
  @Input() disabled: any = false;
  @Input() labelPanelClass: string = '';
  @Input() value: boolean | undefined = false;
  @Output() onChange: EventEmitter<boolean | any> = new EventEmitter(false);

  constructor() { }

  ngOnInit(): void {
  }

}
