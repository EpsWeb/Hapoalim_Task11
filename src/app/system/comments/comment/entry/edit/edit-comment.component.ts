import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {
  commentControl = new FormControl();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditCommentComponent>) {
  }

  ngOnInit() {
    this.commentControl = new FormControl(this.data.text);
  }

  edit(): void {
    this.dialogRef.close(this.commentControl.value);
  }

}
