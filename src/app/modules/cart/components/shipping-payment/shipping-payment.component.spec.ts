import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPaymentComponent } from './shipping-payment.component';

describe('ShippingPaymentComponent', () => {
  let component: ShippingPaymentComponent;
  let fixture: ComponentFixture<ShippingPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
