import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenitiesCounterComponent } from './amenities-counter.component';

describe('AmenitiesCounterComponent', () => {
  let component: AmenitiesCounterComponent;
  let fixture: ComponentFixture<AmenitiesCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmenitiesCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenitiesCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
