import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsBarComponent } from './reviews-bar.component';

describe('ReviewsBarComponent', () => {
  let component: ReviewsBarComponent;
  let fixture: ComponentFixture<ReviewsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
