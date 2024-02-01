import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLookupsComponent } from './product-lookups.component';

describe('ProductLookupsComponent', () => {
  let component: ProductLookupsComponent;
  let fixture: ComponentFixture<ProductLookupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductLookupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLookupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
