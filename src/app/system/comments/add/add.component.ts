import {Component, Input} from '@angular/core';
import {take} from "rxjs";
import {FormControl} from "@angular/forms";
import {User} from "../../../shared/models";
import {CommentsService} from "../../../shared/services/comments.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  @Input() user: User | undefined;

  constructor(private commentsService: CommentsService) {
  }

  textControl = new FormControl();

  submit(): void {
    this.commentsService.addComment(this.user?.id || -1, this.textControl.value)
      .pipe(take(1))
      .subscribe(res => {
        if (res) {
          this.textControl.patchValue('')
        }
      })
  }

}
