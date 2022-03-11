import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SnackbarMessage} from './models/snackbar-message';
import {animate, style, transition, trigger} from '@angular/animations';
import {SharedSnackbarService} from './services/shared-snackbar.service';

@Component({
  selector: 'gusl-shared-snackbar<',
  templateUrl: './shared-snackbar.component.html',
  styleUrls: ['./shared-snackbar.component.scss'],
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
export class SharedSnackbarComponent implements OnInit {

  message$: Observable<SnackbarMessage>;
  type: 'message' | 'error';

  constructor(private snackbar: SharedSnackbarService) { }

  ngOnInit() {
    this.message$ = this.snackbar.newMessageEvent$;
  }

  dismiss() {
    this.snackbar.dismiss();
  }
}
