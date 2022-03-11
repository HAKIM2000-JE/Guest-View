import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {GuestService} from '../../../core/services/guest.service';
import {LanguageManagementService} from '../../../core/services/language.service';
import {AbstractWindow} from '../../../core/abstract/AbstractWindow';
import {IntercomService} from '../../../core/services/IntercomService';
import {SharedSnackbarService} from '../../../shared/components/shared-snackbar/services/shared-snackbar.service';
import {TranslateService} from '@ngx-translate/core';
import {UtilsService} from '../../../core/services/utils.service';
import {ApiService} from '../../../core/http/api.service';
import {MessageCreationDto} from '../../../models/guestview/MessageCreationDto';
import {MessageAudit} from '../../../models/guestview/MessageAudit';
import {Property} from "../../../models/Property";
import {PropertyForGuest} from "../../../models/guestview/PropertyForGuest";

@Component({
  selector: 'app-guest-messaging',
  templateUrl: './guest-messaging.component.html',
  styleUrls: ['./guest-messaging.component.scss']
})
export class GuestMessagingComponent extends AbstractWindow implements OnInit, OnDestroy {

  textToSend: string;
  bookingId: string;
  property: PropertyForGuest;
  messages: MessageAudit[] = [];
  menuSelected: number = 1;
  myTimerFunction: any;

  constructor(private route: ActivatedRoute,
              public intercomService: IntercomService,
              private snackbar: SharedSnackbarService,
              private translate: TranslateService,
              private apiService: ApiService,
              public utilService: UtilsService,
              private languageService: LanguageManagementService,
              private guestService: GuestService) {
    super(intercomService, utilService);
  }

  ngOnDestroy() {
    clearInterval(this.myTimerFunction);
  }

  ngOnInit() {
    this.route.paramMap.subscribe( ParamMap => {
      this.bookingId = ParamMap.get('bookingId');

      this.getMessages();

      this.myTimerFunction = setInterval( () => {
        this.getMessages();
      }, 10000);

      this.guestService.getPropertyAndBookingForGuest( this.bookingId , this.languageService.getLanguageInUrl()).pipe(takeUntil(this.onDestroy)).subscribe( res => {
        this.property = res.property;
      });

    });
  }

  getMessages() {
    if (!this.bookingId) {
      return;
    }
    this.apiService.getMessages(this.bookingId).subscribe( msgs => {
      if (msgs != null && this.messages != null && msgs.length != this.messages.length) {
        this.messages = msgs;
        setTimeout( () => {
          this.scrollToLastMessage();
        }, 1000);
        console.log('--> myMessages', this.messages);
      }
    });
  }

  scrollToLastMessage() {
    let htmlElement = document.getElementById("message-container");
    console.log("htmlElement", htmlElement);
    if (htmlElement != null) {
      htmlElement.scrollTo({
        behavior: 'smooth',
        top: htmlElement.scrollHeight
      });
    }
  }

  sendMessage() {
    const message = new MessageCreationDto();
    message.type = 'internal';
    message.content = this.textToSend;
    this.apiService.sendMessage(this.bookingId, message).subscribe( messageBack => {
      this.messages.push(messageBack);
      this.textToSend = '';
      setTimeout( () => {
        this.scrollToLastMessage();
      }, 500);
      console.log(this.messages);
    });
  }

  replaceLinks(content: string) {
    if (!content) {
      return content;
    }
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return content.replace(urlRegex, (url) => {
      return '<div class="chat-link-container"><a href="' + url + '" target="_blank">' + url + '</a></div>';
    });
  }
}
