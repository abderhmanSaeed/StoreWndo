import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsHomeComponent } from './product-details-home.component';

describe('ProductDetailsHomeComponent', () => {
  let component: ProductDetailsHomeComponent;
  let fixture: ComponentFixture<ProductDetailsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
