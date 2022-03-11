import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNumberMobileComponent } from './card-number-mobile.component';

describe('CardNumberMobileComponent', () => {
  let component: CardNumberMobileComponent;
  let fixture: ComponentFixture<CardNumberMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardNumberMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNumberMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
