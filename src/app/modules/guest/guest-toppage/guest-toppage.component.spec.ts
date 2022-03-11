import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestToppageComponent } from './guest-toppage.component';

describe('GuestToppageComponent', () => {
  let component: GuestToppageComponent;
  let fixture: ComponentFixture<GuestToppageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestToppageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestToppageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
