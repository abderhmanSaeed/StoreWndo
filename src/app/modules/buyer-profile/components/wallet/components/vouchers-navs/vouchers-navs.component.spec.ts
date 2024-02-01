import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersNavsComponent } from './vouchers-navs.component';

describe('VouchersNavsComponent', () => {
  let component: VouchersNavsComponent;
  let fixture: ComponentFixture<VouchersNavsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VouchersNavsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersNavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
