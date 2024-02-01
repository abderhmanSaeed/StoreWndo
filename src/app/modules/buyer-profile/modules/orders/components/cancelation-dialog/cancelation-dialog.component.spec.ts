import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelationDialogComponent } from './cancelation-dialog.component';

describe('CancelationDialogComponent', () => {
  let component: CancelationDialogComponent;
  let fixture: ComponentFixture<CancelationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
