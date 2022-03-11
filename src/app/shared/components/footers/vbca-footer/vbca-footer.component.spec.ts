import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VbcaFooterComponent } from './vbca-footer.component';

describe('VbcaFooterComponent', () => {
  let component: VbcaFooterComponent;
  let fixture: ComponentFixture<VbcaFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VbcaFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VbcaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
