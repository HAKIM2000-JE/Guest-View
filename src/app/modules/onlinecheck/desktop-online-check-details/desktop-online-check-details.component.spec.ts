import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopOnlineCheckDetailsComponent } from './desktop-online-check-details.component';

describe('OnlineCheckDetailsComponent', () => {
  let component: DesktopOnlineCheckDetailsComponent;
  let fixture: ComponentFixture<DesktopOnlineCheckDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopOnlineCheckDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopOnlineCheckDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
