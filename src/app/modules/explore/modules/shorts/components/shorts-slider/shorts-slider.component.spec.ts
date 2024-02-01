import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortsSliderComponent } from './shorts-slider.component';

describe('ShortsSliderComponent', () => {
  let component: ShortsSliderComponent;
  let fixture: ComponentFixture<ShortsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortsSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
