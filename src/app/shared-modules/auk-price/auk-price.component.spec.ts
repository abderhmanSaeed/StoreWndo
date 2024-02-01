import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AukPriceComponent } from './auk-price.component';

describe('AukPriceComponent', () => {
  let component: AukPriceComponent;
  let fixture: ComponentFixture<AukPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AukPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AukPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
