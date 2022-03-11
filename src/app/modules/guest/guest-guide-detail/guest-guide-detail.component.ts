import { Component, OnInit } from '@angular/core';
import {GuestServiceIntern} from "../guest.service";
import {Guide} from "../../../models/Guide";
import {ImageDetailComponent} from "../../../core/components/image-detail/image-detail.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-guest-guide-detail',
  templateUrl: './guest-guide-detail.component.html',
  styleUrls: ['./guest-guide-detail.component.scss']
})
export class GuestGuideDetailComponent implements OnInit {

  guides: Guide[];
  selectedGuide: Guide;
  selectedIndex:number;
  listStyleWith:number;
  bookingId: string;
  constructor(private guestServiceIntern:GuestServiceIntern,
              public dialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe( ParamMap => {
      this.bookingId = ParamMap.get('bookingId')
    });
    this.guestServiceIntern.getGuideDetail().subscribe(data=>{
      this.guides = data;
    });
    this.guestServiceIntern.getActiveGuideIndex().subscribe(data => {
      this.selectedIndex = data;
      this.selectItem(this.selectedIndex)
    });
  }
  selectItem(index) {
    console.log('titit')
    this.selectedIndex = index;
    this.selectedGuide = this.guides.find((element, index) => {
      return index === this.selectedIndex ? element : null ;
    });
    if (this.selectedGuide && this.selectedGuide.pictureUrls && this.selectedGuide.pictureUrls.length) {
      this.listStyleWith = this.selectedGuide.pictureUrls.length * 170;
    }


  }
  getNameOfPdf(link) {
    const namesSplit = link.split('/');
    return namesSplit[namesSplit.length - 1];
  }

  openDetailImage(image){
    this.dialog.open(ImageDetailComponent, {
      data: {
        photoUrl: image
      }
    });
  }
}


