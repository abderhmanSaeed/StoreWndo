import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsReviewsComponent } from './stars-reviews.component';

describe('StarsReviewsComponent', () => {
  let component: StarsReviewsComponent;
  let fixture: ComponentFixture<StarsReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarsReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
