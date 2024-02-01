import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddPayShipComponent } from './edit-add-pay-ship.component';

describe('EditAddPayShipComponent', () => {
  let component: EditAddPayShipComponent;
  let fixture: ComponentFixture<EditAddPayShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddPayShipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddPayShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
