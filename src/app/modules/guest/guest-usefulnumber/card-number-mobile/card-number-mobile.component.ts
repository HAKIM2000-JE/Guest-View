import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {Property} from '../../../../models/Property';
import {UsefulNumber} from '../../../../models/UsefulNumber';
import {UtilsService} from '../../../../core/services/utils.service';

@Component({
  selector: 'app-card-number-mobile',
  templateUrl: './card-number-mobile.component.html',
  styleUrls: ['./card-number-mobile.component.scss']
})
export class CardNumberMobileComponent implements OnInit {

  @Input() property: Property;
  @Input() number: UsefulNumber;
  @Input() fake = false;
  constructor(public utilService: UtilsService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  Call(use) {
    document.location.href = 'tel:' + use.phoneNumber;
  }

  emailPerson(use) {
    if (use.email) {
      document.location.href = 'mailto:' + use.email;
    }
  }

  getDirection(address) {
    window.open(
      'https://www.google.com/maps/dir/' + address + '/' + this.property.fullAddress,
      '_blank' // <- This is what makes it open in a new window.
    );
  }
}
