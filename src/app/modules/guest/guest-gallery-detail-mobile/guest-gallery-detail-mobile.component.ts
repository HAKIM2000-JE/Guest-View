import {Component, Input, OnInit} from '@angular/core';
import {Property} from "../../../models/Property";
import {MatDialog} from "@angular/material/dialog";
import {ImageDetailComponent} from "../../../core/components/image-detail/image-detail.component";
import {PhotoDetailComponent} from "../../../core/components/photo-detail/photo-detail.component";

@Component({
  selector: 'app-guest-gallery-detail-mobile',
  templateUrl: './guest-gallery-detail-mobile.component.html',
  styleUrls: ['./guest-gallery-detail-mobile.component.scss']
})
export class GuestGalleryDetailMobileComponent implements OnInit {

   @Input() property;
  constructor( public dialog: MatDialog) { }

  ngOnInit() {

  }

  openDetailImage(image, index) {
    this.dialog.open(PhotoDetailComponent, {
      data: {
        photo: image,
        photoIndex: index,
        photos : this.property.photos
      },
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'custom-dialog-container-photo'
    });
  }

}
