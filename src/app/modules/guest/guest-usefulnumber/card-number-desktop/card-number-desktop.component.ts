import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {Property} from '../../../../models/Property';
import {UsefulNumber} from '../../../../models/UsefulNumber';
import {UtilsService} from '../../../../core/services/utils.service';

@Component({
  selector: 'app-card-number-desktop',
  templateUrl: './card-number-desktop.component.html',
  styleUrls: ['./card-number-desktop.component.scss']
})
export class CardNumberDesktopComponent implements OnInit {

  @Input() property: Property;
  @Input() number: UsefulNumber;
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


}
