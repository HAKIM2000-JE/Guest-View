import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSnackbarComponent } from './shared-snackbar.component';

describe('SharedSnackbarComponent', () => {
  let component: SharedSnackbarComponent;
  let fixture: ComponentFixture<SharedSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
