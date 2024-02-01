import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, concat } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { CommentActions } from 'src/app/modules/product-details/enums/comment-actions';
import { Comment } from "src/app/shared/models/comment/comment";
import { DropdownItem } from 'src/app/shared/models/dropdown-item/dropdown-item';

@Component({
  selector: 'reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {


  // Inputs
  @Input() reply!: Comment;

  // Outputs
  @Output() onAction: EventEmitter<any> = new EventEmitter();

  // props 
  commentActions: DropdownItem[] = [
    {
      key: CommentActions.Edit,
      label: 'actions.edit'
    },
    {
      key: CommentActions.Delete,
      label: 'actions.delete'
    },
  ];
  subscription: Subscription = new Subscription();


  constructor(
    private _MatDialog: MatDialog,
    private _HttpService: HttpService,
    private _AuthService: AuthService,
  ) { }

  ngOnInit(): void {
  }




  updatereplyLike(commentId?: number): void {
    
    if(!this.isAuthenticated()) return

    this.reply.isLike = !this.reply.isLike;
  
    if (this.reply.isLike) {
      (this.reply.likes as any)++
    } else {
      (this.reply.likes as any)--
    }

    const payload = {
      commentId
    };

    const query = {
      hideLoader: true
    };

    this.subscription.add(
      this._HttpService.postByParams(APIs.updateCommentLike, query ,payload).subscribe()
    );
  }



  isAuthenticated(): boolean {
    if (!this._AuthService.isAuthenticated) {
      this.openAuthDialog();
      return false
    } else {
      return true
    }
  }


  onImgError(event: any){
    event.target.src = 'assets/media/users/user-placeholder.png'
  }


  openAuthDialog() {
    this._MatDialog.open(AuthComponent, {
      width: '550px',
      panelClass: 'auth-dialog'
    });
  }


  
 
}
