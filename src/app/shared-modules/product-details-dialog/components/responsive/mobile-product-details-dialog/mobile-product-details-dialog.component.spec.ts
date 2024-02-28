import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileProductDetailsDialogComponent } from './mobile-product-details-dialog.component';

describe('MobileProductDetailsDialogComponent', () => {
  let component: MobileProductDetailsDialogComponent;
  let fixture: ComponentFixture<MobileProductDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileProductDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileProductDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
