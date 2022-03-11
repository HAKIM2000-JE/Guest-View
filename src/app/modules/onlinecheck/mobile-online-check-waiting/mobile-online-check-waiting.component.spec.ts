import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileOnlineCheckWaitingComponent } from './mobile-online-check-waiting.component';

describe('MobileOnlineCheckWaitingComponent', () => {
  let component: MobileOnlineCheckWaitingComponent;
  let fixture: ComponentFixture<MobileOnlineCheckWaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileOnlineCheckWaitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileOnlineCheckWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
