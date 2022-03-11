import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {

  photoUrl: any ;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef< ImageDetailComponent >,) { }

  ngOnInit() {
    if (this.data.photoUrl) {
      this.photoUrl = this.data.photoUrl;
    } else {
      this.photoUrl = false;
    }
  }

  closeModal(){
    this.dialogRef.close()
  }
}
