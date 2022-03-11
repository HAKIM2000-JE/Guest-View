import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PropertyBooking} from '../../../models/PropertyBooking';
import {BookingForGuest} from '../../../models/guestview/BookingForGuest';
import {ApiService} from '../../../core/http/api.service';
import {BookletReviews} from '../../../models/BookletReviews';
import {BookletReviewsLight} from '../../../models/BookletReviewsLight';

@Component({
  selector: 'app-footer-booklet-reviews',
  templateUrl: './footer-booklet-reviews.component.html',
  styleUrls: ['./footer-booklet-reviews.component.scss']
})
export class FooterBookletReviewsComponent implements OnInit, OnChanges {

  @Input() bookletReviews: BookletReviews;
  @Input() bookingId: string;
  textReview: string = "";
  rating: number = 0;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.bookletReviews && this.bookletReviews) {
      this.textReview = this.bookletReviews.guestReviewComment;
      this.rating = this.bookletReviews.guestReviewRate;
    }
  }

  saveReview() {
    if (this.textReview.length>0) {
      const bookletReviewsLight = new BookletReviewsLight();
      bookletReviewsLight.guestReviewComment = this.textReview;
      bookletReviewsLight.guestReviewRate = this.rating;
      this.apiService.leaveBookletReviews(this.bookingId, bookletReviewsLight).subscribe(res => {
      });
    }
  }

}
