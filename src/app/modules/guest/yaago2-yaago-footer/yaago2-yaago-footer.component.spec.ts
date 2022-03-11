import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Yaago2YaagoFooterComponent } from './yaago2-yaago-footer.component';

describe('Yaago2YaagoFooterComponent', () => {
  let component: Yaago2YaagoFooterComponent;
  let fixture: ComponentFixture<Yaago2YaagoFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Yaago2YaagoFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Yaago2YaagoFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
