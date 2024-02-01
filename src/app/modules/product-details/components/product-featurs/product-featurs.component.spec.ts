import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFeatursComponent } from './product-featurs.component';

describe('ProductFeatursComponent', () => {
  let component: ProductFeatursComponent;
  let fixture: ComponentFixture<ProductFeatursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFeatursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFeatursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
