import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {CommentsService} from "../../shared/services/comments.service";
import {UserService} from "../../shared/services/user.service";
import {Comment, User} from "../../shared/models";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<void>;

  constructor(private commentsService: CommentsService, private userService: UserService) {
    this._unsubscribeAll = new Subject();
  }

  user: User | undefined;
  comments: Comment[] | undefined;

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.comments = this.commentsService.getComments();
    this.commentsService.onCommentsUpdated
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(updatedComments => {
        this.comments = updatedComments;
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
