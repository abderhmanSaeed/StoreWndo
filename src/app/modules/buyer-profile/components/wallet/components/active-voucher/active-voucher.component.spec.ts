import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveVoucherComponent } from './active-voucher.component';

describe('ActiveVoucherComponent', () => {
  let component: ActiveVoucherComponent;
  let fixture: ComponentFixture<ActiveVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
