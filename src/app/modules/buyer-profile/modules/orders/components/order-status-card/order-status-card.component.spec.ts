import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusCardComponent } from './order-status-card.component';

describe('OrderStatusCardComponent', () => {
  let component: OrderStatusCardComponent;
  let fixture: ComponentFixture<OrderStatusCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderStatusCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
