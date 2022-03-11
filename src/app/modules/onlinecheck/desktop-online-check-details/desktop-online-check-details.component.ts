import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import SignaturePad from "signature_pad";
import {BookingForGuest} from "../../../models/guestview/BookingForGuest";
import {takeUntil} from "rxjs/operators";
import {LanguageManagementService} from "../../../core/services/language.service";
import {ActivatedRoute} from "@angular/router";
import {GuestService} from "../../../core/services/guest.service";
import {PropertyForGuest} from "../../../models/guestview/PropertyForGuest";
import {Subject} from "rxjs";

import {MatDialog} from "@angular/material/dialog";
import {DocumentUploadTypes, YaagoDocument} from "../../../models/YaagoDocument";
import {PerfectScrollbarConfigInterface} from "ngx-perfect-scrollbar";
import { UtilsService } from 'src/app/core/services/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Corporate } from 'src/app/models/guestview/Corporate';
import { DeletePhotoComponent } from '../../guest/guest-inventory/delete-photo/delete-photo.component';
import { MatStepper } from '@angular/material';
import { OnlineCheckDetailsComponent } from '../online-check-details.component';

@Component({
  selector: 'app-desktop-online-check-details',
  templateUrl: './desktop-online-check-details.component.html',
  styleUrls: ['./desktop-online-check-details.component.scss']
})
export class DesktopOnlineCheckDetailsComponent extends  OnlineCheckDetailsComponent  implements OnInit , AfterViewInit{
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  signaturePad: any;
  canvas: any;

  // booking: BookingForGuest;
  bookingId: string;
  // property: PropertyForGuest;

  onDestroy = new Subject();
  proofOfIdentity = [];
  proofOfIdentityy = [];
  urlsPhotos = [];
  allowedImages = DocumentUploadTypes.images();
  showSpinner: boolean;
  message: string;
  currentLang: string;
  checkin : any
  checkout : any
 

  @Input() corporate: Corporate;
  @Input()  booking: BookingForGuest;
  @Input() property: PropertyForGuest;
  public config: PerfectScrollbarConfigInterface = {};

  constructor(public languageService: LanguageManagementService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public guestService: GuestService,
    public translateService: TranslateService,
    public fb: FormBuilder,
    public utilService: UtilsService) {
    super(languageService,route, dialog,guestService, translateService, fb, utilService );
  }


  ngOnInit() {

    this.initForm()
    this.route.paramMap.subscribe( ParamMap => {
      this.bookingId = ParamMap.get('bookingId');
      this.guestService.getPropertyAndBookingForGuest(this.bookingId, this.languageService.getLanguageInUrl()).pipe(takeUntil(this.onDestroy)).subscribe(res => {
        this.property = res.property;
        this.booking = res.booking;
        this.corporate = res.corporate
        console.log('booking', this.booking)
        console.log("res", res)
        console.log('corporate', this.corporate)

      });
    });

  }
  ngAfterViewInit(){

    this.canvas = document.querySelector("canvas");
    this.signaturePad = new SignaturePad(this.canvas);

    window.addEventListener("resize", this.resizeCanvas);
    this.resizeCanvas();
    

  }
  resizeCanvas() {
    const ratio =  Math.max(window.devicePixelRatio || 1, 1);
    this.canvas.width = this.canvas.offsetWidth * ratio;
    this.canvas.height = this.canvas.offsetHeight * ratio;
    this.canvas.getContext("2d").scale(ratio, ratio);
    this.signaturePad.clear();
    console.log('heh',this.canvas.width)
  }

  showDialog(index, type: string){
    const dialogRef = this.dialog.open(DeletePhotoComponent, {
      data: {index: index, photos:  this.proofOfIdentity  , urlsPhotos: this.urlsPhotos},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
        this.urlsPhotos = result.urlsPhotos;
        console.log("urlsPhotos",this.urlsPhotos);

      }
    });
  }

  onPictureOutUploaded(doc: YaagoDocument) {
    if (!this.proofOfIdentity) {
      this.proofOfIdentity = [];
    }
    this.proofOfIdentity.push(doc.url);
  }
  getFormatDate(date: string) {
    return UtilsService.formatDateWithLocale(date, this.translateService.currentLang);
  }

  goForward(stepper:MatStepper){

    stepper.next();
    console.log(this.firstFormGroup.value);
  }

  goPrevious(stepper:MatStepper){
    stepper.previous();
  }

  validateOnLineCheck() {

  }

  initForm(){

    this.firstFormGroup = this.fb.group({
      prenom: ['', [Validators.required] ],
      timeIn: ['', [Validators.required] ],
      timeOut: ['', [Validators.required] ],
      nom: ['', [Validators.required] ],
      email: ['', [Validators.required] ],
      pays: ['', [Validators.required] ],
      genre: ['', [Validators.required] ],
      dateNaissance: ['', [Validators.required] ],

    });
 
  }

}
