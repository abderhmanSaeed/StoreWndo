import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedVoucherComponent } from './used-voucher.component';

describe('UsedVoucherComponent', () => {
  let component: UsedVoucherComponent;
  let fixture: ComponentFixture<UsedVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsedVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsedVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
