import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor() { }
  @Input('data') photos = [];
  @Output() onChange = new EventEmitter<string>();
  math = Math;
  image: any;

  slideCalc = 0;

  ngOnInit() {
  }

  slide(type) {
    if (type === 'next') {
      this.slideCalc -= 68;
    } else {
      this.slideCalc += 68;
    }
  }

  select(image: any) {
    console.log(image);
    this.image = image;
    this.onChange.emit(image);
  }
}
