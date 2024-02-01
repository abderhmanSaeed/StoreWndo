import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRateDialogComponent } from './add-rate-dialog.component';

describe('AddRateDialogComponent', () => {
  let component: AddRateDialogComponent;
  let fixture: ComponentFixture<AddRateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
