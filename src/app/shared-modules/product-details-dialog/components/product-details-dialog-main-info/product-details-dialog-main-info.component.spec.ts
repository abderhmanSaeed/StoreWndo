import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsDialogMainInfoComponent } from './product-details-dialog-main-info.component';

describe('ProductDetailsDialogMainInfoComponent', () => {
  let component: ProductDetailsDialogMainInfoComponent;
  let fixture: ComponentFixture<ProductDetailsDialogMainInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsDialogMainInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsDialogMainInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
