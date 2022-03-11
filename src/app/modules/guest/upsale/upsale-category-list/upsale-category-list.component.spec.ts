import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsaleCategoryListComponent } from './upsale-category-list.component';

describe('UpsaleCategoryListComponent', () => {
  let component: UpsaleCategoryListComponent;
  let fixture: ComponentFixture<UpsaleCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpsaleCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsaleCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
