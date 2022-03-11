import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestHostServicesComponent } from './guest-host-services.component';

describe('GuestHostServicesComponent', () => {
  let component: GuestHostServicesComponent;
  let fixture: ComponentFixture<GuestHostServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestHostServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestHostServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
