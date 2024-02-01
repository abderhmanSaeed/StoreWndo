import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedSellerCardComponent } from './suggested-seller-card.component';

describe('SuggestedSellerCardComponent', () => {
  let component: SuggestedSellerCardComponent;
  let fixture: ComponentFixture<SuggestedSellerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestedSellerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedSellerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
