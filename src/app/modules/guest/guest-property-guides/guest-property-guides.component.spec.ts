import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPropertyGuidesComponent } from './guest-property-guides.component';

describe('GuestPropertyGuidesComponent', () => {
  let component: GuestPropertyGuidesComponent;
  let fixture: ComponentFixture<GuestPropertyGuidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestPropertyGuidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestPropertyGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
