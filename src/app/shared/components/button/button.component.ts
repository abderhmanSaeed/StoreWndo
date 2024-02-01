import { Component, Input, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  /**
   * fortawesome v6 icons
   */
  @Input() icon!: IconProp;
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() panelclass: string = '';
  @Input() fill: string = 'primary';
  @Input() stroked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() iconPanelclass: string = '';


  constructor() { }

  ngOnInit(): void {
  }

}
