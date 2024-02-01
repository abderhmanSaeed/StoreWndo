import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AukRatingComponent } from './auk-rating.component';

describe('AukRatingComponent', () => {
  let component: AukRatingComponent;
  let fixture: ComponentFixture<AukRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AukRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AukRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
