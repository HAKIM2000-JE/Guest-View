import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsaleBasketComponent } from './upsale-basket.component';

describe('UpsaleBasketComponent', () => {
  let component: UpsaleBasketComponent;
  let fixture: ComponentFixture<UpsaleBasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpsaleBasketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsaleBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
