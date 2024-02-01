import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceChargedDialogComponent } from './balance-charged-dialog.component';

describe('BalanceChargedDialogComponent', () => {
  let component: BalanceChargedDialogComponent;
  let fixture: ComponentFixture<BalanceChargedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceChargedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceChargedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
