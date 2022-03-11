import {Component, HostListener, OnInit} from '@angular/core';
import {UtilsService} from '../../../../core/services/utils.service';
import {GuestService} from '../../../../core/services/guest.service';
import {Comment} from '../../../../models/guestview/Comment';

@Component({
  selector: 'app-guest-recommendations-reviews',
  templateUrl: './guest-recommendations-reviews.component.html',
  styleUrls: ['./guest-recommendations-reviews.component.scss']
})
export class GuestRecommendationsReviewsComponent implements OnInit {

  reviews: Comment[] = [];
  showReviews: Comment[] = [];
  recommendationTitle: any;
  readMoreIndex: number;
  paginate = { page: 1, perPage: 4, totalPages: 0 };
  pages = [];

  constructor(
    public guestService: GuestService,
    public utils: UtilsService
  ) { }

  ngOnInit() {
    this.getStatusOfReviews();
  }

  getStatusOfReviews() {
    this.guestService.getStatusOfReviews().subscribe(
      res => {
        if ( res.reviews ) {
          this.reviews = res.reviews;
          this.recommendationTitle = res.title;
          this.parseReviews();
        } else {
          this.reviews = res.reviews;
          this.recommendationTitle = res.title;
        }
      },
      err => {

      }
    );
  }

  parseReviews() {
    if (!this.reviews) {
      return;
    }
    this.paginate.totalPages = Math.ceil(this.reviews.length / this.paginate.perPage);
    this.pages = Array(this.paginate.totalPages).fill(0).map((x, i) => i + 1);
    this.showReviews = [];
    if ( this.reviews.length <= this.paginate.perPage ) {
      this.showReviews = this.reviews;
    } else {
      for (let i = (this.paginate.page - 1) * this.paginate.perPage; i < this.paginate.page * this.paginate.perPage; i++) {
        if ( this.reviews[i] ) {
          this.showReviews.push(this.reviews[i]);
        }
      }
    }
  }

  showMoreContent(review, reviewIndex) {
    if (this.readMoreIndex === reviewIndex) {
      this.readMoreIndex = null;
    } else {
      this.readMoreIndex = reviewIndex;
    }
    this.parseContent(review, this.readMoreIndex);
  }

  parseContent(review, index) {
    if ( index || index === 0 ) {
      review.comment = review.commentLong;
    } else {
      review.comment = review.commentShort;
    }
  }

  next() {
    if (this.paginate.page === this.paginate.totalPages) {
      return;
    }
    this.paginate.page++;
    this.parseReviews();
  }

  back() {
    if (this.paginate.page <= 1) {
      return;
    }
    this.paginate.page--;
    this.parseReviews();
  }

  close() {
    this.guestService.closeReviews();
  }

  @HostListener('window:resize', ['$event'])
  isDesktopMode(event?) {
    return this.utils.isDesktop(window.innerWidth);
  }

  getFirstLetter(comment) {
    if (!comment) {
      return '';
    }
    if (comment.name) {
      return comment.name.substr(0, 1).toUpperCase();
    }
    if (comment.type && comment.type === 'community') {
      return comment.type.substr(0, 1).toUpperCase();
    }
    return '';
  }
}
