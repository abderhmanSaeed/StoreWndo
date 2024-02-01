import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferRequestDialogComponent } from './transfer-request-dialog.component';

describe('TransferRequestDialogComponent', () => {
  let component: TransferRequestDialogComponent;
  let fixture: ComponentFixture<TransferRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferRequestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
