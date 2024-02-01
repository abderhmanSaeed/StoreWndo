import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HybridPaymentMethodsComponent } from './hybrid-payment-methods.component';

describe('HybridPaymentMethodsComponent', () => {
  let component: HybridPaymentMethodsComponent;
  let fixture: ComponentFixture<HybridPaymentMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HybridPaymentMethodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HybridPaymentMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
