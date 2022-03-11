import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestInventoryComponent } from './guest-inventory.component';

describe('GuestInventoryComponent', () => {
  let component: GuestInventoryComponent;
  let fixture: ComponentFixture<GuestInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
