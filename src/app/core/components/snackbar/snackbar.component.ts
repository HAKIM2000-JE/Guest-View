import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Observable} from 'rxjs';
import {SnackbarService} from '../../services/SnackbarService';
import {SnackbarMessage} from "../../../models/snackbar/SnackbarMessage";

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [
    trigger(
      'fadeInOut', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class SnackbarComponent implements OnInit {

  message$: Observable<SnackbarMessage>;
  type: 'message' | 'error';
  constructor(private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.message$ = this.snackbarService.newMessageEvent$;
  }
  dismiss() {
    this.snackbarService.dismiss();
  }

}
