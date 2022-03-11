import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineCheckWaitingComponent } from './online-check-waiting.component';

describe('OnlineCheckWaitingComponent', () => {
  let component: OnlineCheckWaitingComponent;
  let fixture: ComponentFixture<OnlineCheckWaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineCheckWaitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineCheckWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
