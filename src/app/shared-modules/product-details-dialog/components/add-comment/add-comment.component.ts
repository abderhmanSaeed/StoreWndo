import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  // outputs props 
  @Output() addComment: EventEmitter<string> = new EventEmitter();

  // props 
  comment: string = '';

  constructor() { }

  ngOnInit(): void {
  }


  onComment(): void {
    if (this.comment.trim()) {
      this.addComment.emit(this.comment)
    }
  }

}
