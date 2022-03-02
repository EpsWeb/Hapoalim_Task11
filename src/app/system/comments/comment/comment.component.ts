import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {take} from "rxjs";
import {Comment, User} from "../../../shared/models";
import {UserService} from "../../../shared/services/user.service";
import {EditCommentComponent} from "./entry/edit/edit-comment.component";
import {CommentsService} from "../../../shared/services/comments.service";
import {ReactComponent} from "./entry/react/react.component";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() user: User | undefined;
  @Input() comment: Comment | undefined;

  @Input() isParent = true;

  constructor(private userService: UserService, private commentsService: CommentsService, private dialog: MatDialog) {
  }

  edit(commentId: number, text: string, isParent: boolean): void {
    this.dialog.open(EditCommentComponent, {
      data: {text}
    })
      .afterClosed()
      .pipe(take(1))
      .subscribe(res => {
        if (res) {
          this.commentsService.editComment(commentId, this.user?.id || -1, isParent, res)
        }
      })
  }

  delete(commentId: number, isParent: boolean): void {
    this.commentsService.deleteComment(commentId, isParent);
  }

  react(): void {
    if (this.isParent && this.user?.id !== this.comment?.ownerId) {
      this.dialog.open(ReactComponent)
        .afterClosed()
        .pipe(take(1))
        .subscribe(res => {
          if (res) {
            this.commentsService.reactOnComment(this.user?.id ?? -1, this.comment?.id || -1, res)
          }
        })
    }
  }

}
