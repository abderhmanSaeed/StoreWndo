import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressReviewsComponent } from './progress-reviews.component';

describe('ProgressReviewsComponent', () => {
  let component: ProgressReviewsComponent;
  let fixture: ComponentFixture<ProgressReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
