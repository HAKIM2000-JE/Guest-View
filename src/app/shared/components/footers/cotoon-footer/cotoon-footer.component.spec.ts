import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotoonFooterComponent } from './cotoon-footer.component';

describe('CotoonFooterComponent', () => {
  let component: CotoonFooterComponent;
  let fixture: ComponentFixture<CotoonFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotoonFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotoonFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
