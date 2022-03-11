import {Component, Input, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {GuestGalleryDetailComponent} from '../../../../shared/components/guest-gallery-detail/guest-gallery-detail.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-images-carousel',
  templateUrl: './images-carousel.component.html',
  styleUrls: ['./images-carousel.component.scss']
})
export class ImagesCarouselComponent implements OnInit {



  @Input() pictureUrls;
  @Input() photos;
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: false
  };
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    console.log('pictureUrls', this.pictureUrls);
  }
  showImgDialog(image){
    console.log('myphotos', this.photos);
    const dialogRef = this.dialog.open(GuestGalleryDetailComponent, {
      panelClass: 'custom-dialog-container',
      width: "1016px",
      height: "747px",
      autoFocus: false,
      data: { index: 0, myPhotos: this.photos},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
      }
    });
  }


}
