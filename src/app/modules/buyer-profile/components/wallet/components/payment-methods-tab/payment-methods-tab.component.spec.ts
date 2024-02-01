import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodsTabComponent } from './payment-methods-tab.component';

describe('PaymentMethodsTabComponent', () => {
  let component: PaymentMethodsTabComponent;
  let fixture: ComponentFixture<PaymentMethodsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMethodsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
