import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Yaagov2ServicesForGuestsComponent } from './yaagov2-services-for-guests.component';

describe('Yaagov2ServicesForGuestsComponent', () => {
  let component: Yaagov2ServicesForGuestsComponent;
  let fixture: ComponentFixture<Yaagov2ServicesForGuestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Yaagov2ServicesForGuestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Yaagov2ServicesForGuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
