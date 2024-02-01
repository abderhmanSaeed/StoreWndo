import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPaymentSummaryComponent } from './shipping-payment-summary.component';

describe('ShippingPaymentSummaryComponent', () => {
  let component: ShippingPaymentSummaryComponent;
  let fixture: ComponentFixture<ShippingPaymentSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingPaymentSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingPaymentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
