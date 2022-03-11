import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit, OnChanges {

  @Input() rating: number;
  @Output() ratingChange = new EventEmitter<number>();
  color: string[] = ['far', 'far', 'far', 'far', 'far'];


  iconClass = {
    0: 'far',
    1: 'fas'
  };

  stars: number[] = [0, 0, 0, 0, 0];

  constructor() { }

  ngOnChanges() {
    this.fillStars();
  }

  ngOnInit() {

  }

  fillStars() {
    let starsToFill = Math.round(this.rating * 2) / 2 ;
    let starsNotToFill = 5 - starsToFill;
    let i = 0;
    console.log(i);
    console.log(starsToFill);
    while (starsToFill > 0) {
      this.color[i] = this.iconClass[1];
      i++;
      starsToFill--;
    }
    while (starsNotToFill > 0) {
      this.color[i] = this.iconClass[0];
      i++;
      starsNotToFill--;
    }
  }

  setRating(i) {
    if (this.rating == i + 1) {
      this.rating = 0;
    } else {
      this.rating = i + 1 ;
    }
     this.ratingChange.emit(this.rating);
  }

  changeStyle($event, i) {
    if ($event.type === 'mouseover') {
      for (let j = 0; j <= i; j++) {
        this.color[j] = 'fas';
      }
      for (let j = i + 1; j <= 5; j++) {
        this.color[j] = 'far';
      }
    } else {
      this.fillStars();
    }
  }

}
