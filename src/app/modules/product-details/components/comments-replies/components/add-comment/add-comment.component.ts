import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {


  @ViewChild('input') input!:ElementRef; 
  
  // Inputs
  @Input() set initComment(val: string) {
    this.comment = val;
  };
  @Input() size: 'sm' | 'lg' = 'lg';
  @Input() set autofocus( val: boolean) {
    if (val) {
      this.input.nativeElement.focus();
    }
  }


 
  // outputs props 
  @Output() addComment: EventEmitter<string> = new EventEmitter();

  // props 
  comment: string = '';

  // booleans
  isFocus: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  onComment(): void {
    if (this.comment.trim()) {
      this.addComment.emit(this.comment)
    }
  }
}
