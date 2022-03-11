import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() text: string;
  @Input() disabled: boolean;
  @Input() type: ButtonType = ButtonType.PRIMARY;
  @Input() routerLink: any[] | string;
  @Input()  queryParams: {
    [k: string]: any;
  };
  @Input() rightIcon: string;
  @Input() leftIcon: string;
  @Output() debounceClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.debounceClick.emit();
  }

}

export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SECONDARY_SMALL = 'secondary-small',
  SECONDARY_X_SMALL = 'secondary-x-small',
  SECONDARY_LIGHT = 'secondary-light',
  SHADOW = 'shadow',
}
