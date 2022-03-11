import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import QRCode from 'qrcode';
import {ClipboardService} from 'ngx-clipboard';


@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() url: string;
  @Input() isLogin = false;
  @Output() closeComponent = new EventEmitter<boolean>();
  @Input() isCopyVisible = true;
  public qrImage: string;

  @Input() id = 'qr-container';

  constructor(private translate: TranslateService,
               private clipboardService: ClipboardService) { }

  ngOnInit() {
    this.qrImage = '';
    console.log(this.url);
    // tiny url is needed for qrcode generation. If One does not already exist, resaving will create.

  }
  ngAfterViewInit() {
    if (!this.isLogin && this.url) {
      this.generateQRCode(this.url);
    } else {
      this.generateQRCode('https://tinyurl.com/y38vswns'); // tiny url for https://app.yaago.com)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.generateQRCode(this.url);
  }


  generateQRCode(tinyUrl: string) {
    QRCode.toDataURL(tinyUrl, { errorCorrectionLevel: 'H' , width: '200'}, function(err, url) {
      if (err)  {
        throw err;
      }
      console.log('URL inside QRCode', url);
    });
    QRCode.toCanvas(tinyUrl, { errorCorrectionLevel: 'H' , width: '200'}, (err, canvas) => {
      if (err) {
        throw err;
      }

      console.log('QR-CODE', this.id);
      const container = document.getElementById(this.id);
      if (container) {
        if (container.lastChild) {
          container.removeChild(container.lastChild);
        }
        container.appendChild(canvas);
      }
    });
  }

  share() {
    this.clipboardService.copyFromContent(this.url);
    // this.snackbar.push(new SnackbarMessage(this.translate.instant(' '), 'info', this.translate.instant('dialog-share-property.link-copied')));
  }

}
