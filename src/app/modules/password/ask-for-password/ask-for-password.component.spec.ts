import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskForPasswordComponent } from './ask-for-password.component';

describe('AskForPasswordComponent', () => {
  let component: AskForPasswordComponent;
  let fixture: ComponentFixture<AskForPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskForPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskForPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
