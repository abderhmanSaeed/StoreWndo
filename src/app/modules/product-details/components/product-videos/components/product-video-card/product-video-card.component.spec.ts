import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVideoCardComponent } from './product-video-card.component';

describe('ProductVideoCardComponent', () => {
  let component: ProductVideoCardComponent;
  let fixture: ComponentFixture<ProductVideoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductVideoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVideoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
