import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsaleSelectorComponent } from './upsale-selector.component';

describe('UpsaleSelectorComponent', () => {
  let component: UpsaleSelectorComponent;
  let fixture: ComponentFixture<UpsaleSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpsaleSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsaleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
