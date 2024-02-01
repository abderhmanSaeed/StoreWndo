import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AukCardBPriceComponent } from './auk-card-b-price.component';

describe('AukCardBPriceComponent', () => {
  let component: AukCardBPriceComponent;
  let fixture: ComponentFixture<AukCardBPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AukCardBPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AukCardBPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
