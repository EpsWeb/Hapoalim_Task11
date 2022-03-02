import {Injectable} from '@angular/core';
import {allComments} from "../../data/comments";
import {Comment} from '../models';
import {Observable, of, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  onCommentsUpdated: Subject<any>;

  constructor() {
    this.onCommentsUpdated = new Subject<Comment[]>();
  }

  comments: Comment[] | undefined;
  lastCommentId = 0;

  getComments(): Comment[] {
    const data = localStorage.getItem('data');
    let comments: Comment[]
    const isLocalStorageEmpty = !data || data === 'undefined'

    if (isLocalStorageEmpty) {
      comments = allComments;

      // lastCommentId init
      if (!this.lastCommentId) {
        this.lastCommentId = this.getLastCommentId(comments);
      }
      this.updateLastCommentId();

      const commentsParents = comments.filter(comment => !comment.parentCommentId);
      commentsParents.forEach(parent => {
        parent.children = comments.filter(comment => comment.parentCommentId === parent.id)
        if (!parent.children) {
          parent.children = [];
        }
      });
      return commentsParents;
    } else {
      comments = JSON.parse(data!)

      // lastCommentId init
      if (!this.lastCommentId) {
        const lastId = localStorage.getItem('lastCommentId') || '';
        this.lastCommentId = lastId ? +lastId : 0;
      }

      return comments
    }
  }

  updateLastCommentId(): void {
    localStorage.setItem('lastCommentId', this.lastCommentId.toString());
  }

  getLastCommentId(comments: Comment[]): number {
    if (!comments?.length) {
      return 0;
    }
    let res = 0;
    comments.forEach(comment => {
      if (comment.id > res) {
        res = comment.id;
      }
    })
    return res;
  }

  addComment(userId: number, text: string): Observable<boolean> {
    if (userId === -1) {
      return of(false);
    }
    let comments = this.getComments();

    const newComment: Comment = {
      parentCommentId: null,
      ownerId: userId,
      id: ++this.lastCommentId,
      txt: text,
      children: [],
      createdAt: new Date().toISOString(),
      deletedAt: null
    }
    comments.push(newComment)
    this.updateLastCommentId();
    this.save(comments);
    return of(true);
  }

  editComment(commentID: number, userId: number, isParent: boolean, text: string): void {
    if (userId === -1) {
      return;
    }
    const comments = this.getComments();
    if (isParent) {
      const comment = comments.find(comment => comment.id === commentID);
      if (comment) {
        comment.txt = text;
        this.save(comments)
      }
    } else {
      comments.forEach(comment => {
        comment.children?.forEach(child => {
          if (child.id === commentID) {
            child.txt = text;
            this.save(comments)
            return;
          }
        })
      })
    }
  }

  deleteComment(commentID: number, isParent: boolean) {
    let comments = this.getComments();
    if (isParent) {
      const comment = comments.find(c => c.id === commentID);
      if (comment) {
        comments = comments.filter(c => c.id !== commentID)
        this.save(comments)
      }
    } else {
      comments.forEach(comment => {
        comment.children?.forEach(child => {
          // const comm = comments.find(comment => child.id === commentID);
          if (child.id === commentID) {
            comment.children = comment.children?.filter(c => c.id !== commentID);
            this.save(comments)
            return;
          }
        })
      })
    }
  }

  reactOnComment(userId: number, commentId: number, text: string): void {
    if (userId === -1 || commentId === -1 || !text) {
      return;
    }
    let comments = this.getComments();
    const newComment: Comment = {
      parentCommentId: commentId,
      ownerId: userId,
      id: ++this.lastCommentId,
      txt: text,
      children: null,
      createdAt: new Date().toISOString(),
      deletedAt: null
    }
    let parentComment = comments?.find(c => c.id === commentId);
    parentComment?.children?.push(newComment);
    this.updateLastCommentId();
    this.save(comments);
  }

  save(comments: Comment[]): void {
    localStorage.setItem('data', JSON.stringify(comments));
    this.onCommentsUpdated.next(comments);
  }
}
