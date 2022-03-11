import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNumberDesktopComponent } from './card-number-desktop.component';

describe('CardNumberDesktopComponent', () => {
  let component: CardNumberDesktopComponent;
  let fixture: ComponentFixture<CardNumberDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardNumberDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNumberDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
