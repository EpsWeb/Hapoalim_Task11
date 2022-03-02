import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommentsComponent} from './comments/comments.component';
import {CommentComponent} from './comments/comment/comment.component';
import {ImageByIdPipe} from './comments/comment/pipes/image-by-id.pipe';
import {TimePipe} from './comments/comment/pipes/time.pipe';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {UserNameByIdPipe} from './comments/comment/pipes/user-name-by-id.pipe';
import {EditCommentComponent} from './comments/comment/entry/edit/edit-comment.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {AddComponent} from './comments/add/add.component';
import {ReactComponent} from './comments/comment/entry/react/react.component';

const routes: Routes = [
  {
    path: 'comments',
    component: CommentsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  declarations: [
    CommentsComponent,
    CommentComponent,
    ImageByIdPipe,
    TimePipe,
    UserNameByIdPipe,
    EditCommentComponent,
    AddComponent,
    ReactComponent
  ],
  entryComponents: [
    EditCommentComponent,
    ReactComponent
  ]
})

export class SystemModule {
}
















