import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Yaagov2HygieneComponent } from './yaagov2-hygiene.component';

describe('Yaagov2HygieneComponent', () => {
  let component: Yaagov2HygieneComponent;
  let fixture: ComponentFixture<Yaagov2HygieneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Yaagov2HygieneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Yaagov2HygieneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
