import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotEnoughBalanceComponent } from './not-enough-balance.component';

describe('NotEnoughBalanceComponent', () => {
  let component: NotEnoughBalanceComponent;
  let fixture: ComponentFixture<NotEnoughBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotEnoughBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotEnoughBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
