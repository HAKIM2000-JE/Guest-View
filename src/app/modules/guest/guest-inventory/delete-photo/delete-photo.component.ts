import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-photo',
  templateUrl: './delete-photo.component.html',
  styleUrls: ['./delete-photo.component.scss']
})
export class DeletePhotoComponent implements OnInit {

  photos = [];
  urlsPhotos = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: {index: number, photos, urlsPhotos},
              private dialog: MatDialogRef<DeletePhotoComponent>) { }

  ngOnInit() {
    if (this.data) {
      this.photos = this.data.photos;
      this.urlsPhotos = this.data.urlsPhotos;
    }

  }

  removeImg() {
    if (this.data) {
      if (this.urlsPhotos) {
        this.urlsPhotos.push(this.photos[this.data.index]);
      }
      this.photos.splice(this.data.index, 1);
      this.dialog.close({ urlsPhotos: this.urlsPhotos});
    }
  }

}
