import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestGuidesListComponent } from './guest-guides-list.component';

describe('GuestGuidesListComponent', () => {
  let component: GuestGuidesListComponent;
  let fixture: ComponentFixture<GuestGuidesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestGuidesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestGuidesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
