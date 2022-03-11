import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationsCreateComponent } from './recommendations-create.component';

describe('RecommendationsCreateComponent', () => {
  let component: RecommendationsCreateComponent;
  let fixture: ComponentFixture<RecommendationsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendationsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
