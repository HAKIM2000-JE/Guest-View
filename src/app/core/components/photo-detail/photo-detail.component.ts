import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Photo} from "../../../models/Photo";

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss']
})
export class PhotoDetailComponent implements OnInit {

  photo: Photo;
  photos: Photo[];
  photoIndex: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef< PhotoDetailComponent >) { }

  ngOnInit() {
    if (this.data.photo) {
      this.photo = this.data.photo;
    }
    if (this.data.photos) {
      this.photos = this.data.photos;
    }
    if (this.data.photoIndex) {
      this.photoIndex = this.data.photoIndex;
    }
  }
  closeModal() {
    this.dialogRef.close();
  }
  next() {
    this.photo = this.photos[this.photoIndex + 1];
    this.photoIndex = this.photoIndex + 1;
  }
  prev() {
    this.photo = this.photos[this.photoIndex - 1];
    this.photoIndex = this.photoIndex - 1;
  }
}
