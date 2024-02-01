import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { concat, Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import { Comment } from "src/app/shared/models/comment/comment";
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { DropdownItem } from 'src/app/shared/models/dropdown-item/dropdown-item';
import { CommentActions } from 'src/app/modules/product-details/enums/comment-actions';
import { ConfirmationService } from 'src/app/shared-modules/confirmation-dialog/services/confirmation/confirmation.service';
import { ConfirmFor } from 'src/app/shared-modules/confirmation-dialog/enums/confirm-for/confirm-for';
import { CommentTypesEnum } from 'src/app/modules/product-details/enums/comment-types';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {


  // ViewChilds
  @ViewChild("collapse") collapse!: NgbCollapse;


  // Inputs
  @Input() comment!: Comment;
  @Input() productId: string = '';


  // Outputs 
  @Output() onCommentAction: EventEmitter<any> = new EventEmitter();


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
  currentReplyMessage: string = '';
  replyThatNeedsEditing: any = null;
  commentTypesEnum = CommentTypesEnum;
  subscription: Subscription = new Subscription();


  // boolaens
  public isCollapsed = true;
  autofocus: boolean = false;
  public isRepliesCollapsed = true;


  constructor(
    private _MatDialog: MatDialog,
    private _HttpService: HttpService,
    private _AuthService: AuthService,
    private _ConfirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
  }




  updateCommentLike(commentId?: number): void {
    
    if(!this.isAuthenticated()) return

    this.comment.isLike = !this.comment.isLike;
  
    if (this.comment.isLike) {
      (this.comment.likes as any)++
    } else {
      (this.comment.likes as any)--
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


  addReply(reply: string, commentId: number): void {
    if (!this.isAuthenticated()) {
      return
    }
    this.currentReplyMessage = reply;    
    this.replyHandler(reply, commentId);
  }

  
  replyHandler(message: string, commentId: number): void {
    console.log(this.replyThatNeedsEditing);
    
    if (this.replyThatNeedsEditing?.id) {
      this.editReply(message);
      return
    }


    const payload = {
      message,
      commentId
    }
    this.subscription.add(this._HttpService.post(APIs.addReply, payload).subscribe( (res: HResponse) =>{

        if (!res.isSuccess) return
        if (res.responseData) {          
          this.currentReplyMessage = '';
          this.comment.commentReplies.push(res.responseData);
        }
        
      })
    );
  } 


  editReply(message: string): void {
    const payload = {
      message,
      replyId: this.replyThatNeedsEditing?.id
    }

    this.subscription.add(this._HttpService.put(APIs.editReply, payload).subscribe( (res: HResponse) =>{
      if (!res.isSuccess) return
      if (res.responseData) {     
        this.comment.commentReplies[this.replyThatNeedsEditing.replyIndex].message = message;
        this.currentReplyMessage = '';
        this.replyThatNeedsEditing = null;
      }
    })
    );
  }
  

  ngbCollapseChange(e: 'shown' | 'hidden'): void {
    switch (e) {
      case 'shown':
        this.autofocus = true;
        break;
      default:
        this.autofocus = false;
        break;
    }
    
  }


  onAction(e: any, type: CommentTypesEnum, replyIndex : number): void {
    
    switch (type) {
      case CommentTypesEnum.Reply:
        this.replyActionHandler(e, replyIndex);
        break;
    
      default:
        break;
    }
    
  }




  commentActionHandler(e: any): void {
    switch (e.action.key) {
      case CommentActions.Delete:
      console.log(e, 'replyreplyreplyreplyreplyreplyreplyreplyreply');
        this.openDeleteConfirmationDialog(e.id, CommentTypesEnum.Comment, 0);
      break;
    
      default:
        break;
    }
  }


  replyActionHandler(e: any, replyIndex: number): void {
    switch (e.action.key) {
      case CommentActions.Delete:
        this.openDeleteConfirmationDialog(e.reply?.id, CommentTypesEnum.Reply, replyIndex);
      break;
    

      case CommentActions.Edit:
        this.isCollapsed = false;
        this.ngbCollapseChange('shown');
        this.currentReplyMessage = e.reply?.message;
        this.replyThatNeedsEditing = {
          ...e.reply,
          replyIndex
        }
      break;

      default:
        break;
    }
  }


  deleteReply(replyId: any, replyIndex: number): void {
    this.subscription.add(
      this._HttpService.delete(`${APIs.deleteReply}/${replyId}`).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.comment.commentReplies.splice(replyIndex, 1);
        }
      })
    );
  }



  openDeleteConfirmationDialog(replyId: any, commentType: CommentTypesEnum, replyIndex: number): void {
    this.subscription.add( this._ConfirmationService.openConfirmationDialog(ConfirmFor.DeleteComment)
     .subscribe((confirmed) => {
      if (confirmed) {

        switch (commentType) {
          case CommentTypesEnum.Comment:
            break;

          case CommentTypesEnum.Reply:
              this.deleteReply(replyId, replyIndex);
            break;
        
          default:
            break;
        }
      }
     }));
   };
}
