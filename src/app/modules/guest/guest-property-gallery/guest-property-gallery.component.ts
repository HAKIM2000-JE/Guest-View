import { Component, OnInit } from '@angular/core';
import {Photo} from "../../../models/Photo";
import {ActivatedRoute} from "@angular/router";
import {GuestServiceIntern} from "../guest.service";
import {InternalPropertyService} from "../../../core/services/internal.property.service";

@Component({
  selector: 'app-guest-property-gallery',
  templateUrl: './guest-property-gallery.component.html',
  styleUrls: ['./guest-property-gallery.component.scss']
})
export class GuestPropertyGalleryComponent implements OnInit {

  photos: Photo[];
  constructor(public guideServiceIntern: InternalPropertyService) { }

  ngOnInit() {
    this.guideServiceIntern.getCurrentProperty().subscribe(property => {
      console.log('property', property);
      if (property && property.photos) {
        this.photos = property.photos;
        console.log('this.photos', this.photos);
      }
    });

  }

}
