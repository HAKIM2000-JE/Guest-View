import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalVideoBoxComponent } from './external-video-box.component';

describe('ExternalVideoBoxComponent', () => {
  let component: ExternalVideoBoxComponent;
  let fixture: ComponentFixture<ExternalVideoBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalVideoBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalVideoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
