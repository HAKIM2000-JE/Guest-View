import {Component, Input, OnInit} from '@angular/core';
import {GuestServiceIntern} from "../guest.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-guest-guide-photo-detail',
  templateUrl: './guest-guide-photo-detail.component.html',
  styleUrls: ['./guest-guide-photo-detail.component.scss']
})
export class GuestGuidePhotoDetailComponent implements OnInit {

  photos;

  constructor(public guideServiceIntern: GuestServiceIntern) { }

  ngOnInit() {
    this.guideServiceIntern.getGuidePhotos().subscribe(photos => {
      console.log('guide photos', photos);
      if (photos) {
        this.photos = photos;
      }
    });

  }

}
