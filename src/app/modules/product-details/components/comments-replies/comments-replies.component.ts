import { Component, Input, OnInit } from '@angular/core';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { Comment } from "src/app/shared/models/comment/comment";
import { HttpService } from 'src/app/core/services/http/http.service';
import { Subscription, concat } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { CommentActions } from '../../enums/comment-actions';
import { CommentTypesEnum } from '../../enums/comment-types';
import { ConfirmationService } from 'src/app/shared-modules/confirmation-dialog/services/confirmation/confirmation.service';
import { ConfirmFor } from 'src/app/shared-modules/confirmation-dialog/enums/confirm-for/confirm-for';
@Component({
  selector: 'comments-replies',
  templateUrl: './comments-replies.component.html',
  styleUrls: ['./comments-replies.component.scss']
})
export class CommentsRepliesComponent implements OnInit {

  // Inputs
  @Input() comments: Comment[] = [];
  @Input() productId: string = '';


  // props 
  currentMessage: string = '';
  ngbAccordionIndex: any = null;
  commentThatNeedsEditing: any = null;
  commentTypesEnum = CommentTypesEnum;
  subscription: Subscription = new Subscription();

  constructor(
    private _MatDialog: MatDialog,
    private _HttpService: HttpService,
    private _AuthService: AuthService,
    private _ConfirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.ngbAccordionIndex = 1;
  }


  
  isAuthenticated(): boolean {
    if (!this._AuthService.isAuthenticated) {
      this.openAuthDialog();
      return false
    } else {
      return true
    }
  }



  addComment(message: string): void {
    if (!this.isAuthenticated()) {
      return
    }
    this.currentMessage = message;    
    this.commentHandler(message);
  }



  commentHandler(message: string): void {

    if (this.commentThatNeedsEditing?.id) {
      this.editComment(message);
      return
    }


    const payload = {
      message,
      productId: this.productId
    },
    query = {
      maxResultCount: 1
    },
    addComment =  this._HttpService.post(APIs.addComment, payload),
    getProductComments =  this._HttpService.get(`${APIs.getProductComments}/${this.productId}`, query);
    this.subscription.add(
      concat(
        addComment,
        getProductComments
      ).subscribe( (res: HResponse) =>{
        if (res.responseData?.items?.length) {          
          this.comments.push(res.responseData.items[0]);
          this.currentMessage = '';
        }
      })
    );
  } 



  editComment(message: string): void {
    const payload = {
      message,
      commentId: this.commentThatNeedsEditing?.id
    },
    query = {
      maxResultCount: 1
    },
    editComment =  this._HttpService.put(APIs.editComment, payload),
    getProductComments =  this._HttpService.get(`${APIs.getProductComments}/${this.productId}`, query);
    this.subscription.add(
      concat(
        editComment,
        getProductComments
      ).subscribe( (res: HResponse) =>{
        if (res.responseData?.items?.length) {          
          this.comments[this.commentThatNeedsEditing?.commentIndex].message = message;
          this.currentMessage = '';
          this.commentThatNeedsEditing = null;
        }
      })
    );
  }

    
  openAuthDialog() {
    this._MatDialog.open(AuthComponent, {
      width: '550px',
      panelClass: 'auth-dialog'
    });
  }


  onAction(e: any, type: CommentTypesEnum, commentIndex : number): void {
    
    switch (type) {
      case CommentTypesEnum.Comment:
          this.commentActionHandler(e, commentIndex);
        break;
    
      default:
        break;
    }
    
  }




  commentActionHandler(e: any, commentIndex: number): void {
    switch (e.action.key) {
      case CommentActions.Delete:
        this.openDeleteConfirmationDialog(e.comment?.id, CommentTypesEnum.Comment, commentIndex);
      break;

      case CommentActions.Edit:
          this.currentMessage = e.comment?.message;
          this.commentThatNeedsEditing = {
            ...e.comment,
            commentIndex
          }
      break;
    
      default:
        break;
    }
  }


  openDeleteConfirmationDialog(commentId: any, commentType: CommentTypesEnum, commentIndex: number): void {
    this.subscription.add( this._ConfirmationService.openConfirmationDialog(ConfirmFor.DeleteComment)
     .subscribe((confirmed) => {
      if (confirmed) {

        switch (commentType) {
          case CommentTypesEnum.Comment:
              this.deleteComment(commentId, commentIndex);
            break;
        
          default:
            break;
        }
      }
     }));
   };


   
  deleteComment(commentId: any, commentIndex: number): void {

    const query = {
      commentId
    }


    this.subscription.add(
      this._HttpService.delete(APIs.deleteComment, query).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.comments.splice(commentIndex, 1);
        }
      })
    );
  }

}
