import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestUsefulnumberFullListDesktopComponent } from './guest-usefulnumber-full-list-desktop.component';

describe('GuestUsefulnumberFullListDesktopComponent', () => {
  let component: GuestUsefulnumberFullListDesktopComponent;
  let fixture: ComponentFixture<GuestUsefulnumberFullListDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestUsefulnumberFullListDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestUsefulnumberFullListDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
