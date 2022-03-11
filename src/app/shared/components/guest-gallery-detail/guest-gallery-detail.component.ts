import {Component, Inject, Input, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {GuestServiceIntern} from "../../../modules/guest/guest.service";

@Component({
  selector: 'app-guest-gallery-detail',
  templateUrl: './guest-gallery-detail.component.html',
  styleUrls: ['./guest-gallery-detail.component.scss']
})
export class GuestGalleryDetailComponent implements OnInit {

  // navigation = this.router.getCurrentNavigation();
  // state = this.navigation.extras.state as {
  //   index: 0,
  // };

  @Input() photos;
  selectedPhoto;
  bookingId;
  defaultGuide;
  index : number = 0;
  myPhotos = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private guideServiceIntern: GuestServiceIntern,
              @Inject(MAT_DIALOG_DATA) public data: {index: number,myPhotos},
              private dialogRef: MatDialogRef<GuestGalleryDetailComponent>) {

               }

  ngOnInit() {
    if(this.data){
      this.index = this.data.index;
      console.log(this.index);
      this.myPhotos = this.data.myPhotos;
      console.log(this.myPhotos);
      console.log(this.data.myPhotos);
    }

    // if (this.photos) {

    //   if (this.photos[0].url) {
    //     this.selectedPhoto = this.photos[0].url.replace('aki_policy=medium', 'aki_policy=large');
    //   } else {
    //     this.selectedPhoto = this.photos[0];
    //   }
    // }
    // this.route.paramMap.subscribe(params => {
    //   if (params) {
    //     this.bookingId = params.get('bookingId');
    //   }
    // });
    // this.guideServiceIntern.getGuideOneDetail().subscribe(data => {
    //   if (data) {
    //     this.defaultGuide = data;
    //   }
    // });
  }
  // setSelectedPhoto(photo) {
  //   if (photo.url) {
  //     this.selectedPhoto = photo.url.replace('aki_policy=medium', 'aki_policy=large');
  //   } else {
  //     this.selectedPhoto =  photo;
  //   }
  // }


  navigateRight(){
    if(this.index < this.myPhotos.length){
      this.index ++;
    }
  }

  navigateLeft(){
    if(this.index > 0){
      this.index --;
    }
  }
  onClose(){
    this.dialogRef.close();
  }
  //goBack() {
    // const url = this.route.snapshot.routeConfig.path;
    // const lastPath = url.split('/').pop();
    // if (lastPath === 'guide-detail-photo') {
    //   this.guideServiceIntern.setGuideOneDetail(this.defaultGuide);
    //   this.router.navigate(['/guest/' + this.bookingId + '/guide-full-detail']);
    // } else if (lastPath === 'property-gallery') {
      //this.router.navigate(['/guest/' + this.bookingId ]);
  //}
}
