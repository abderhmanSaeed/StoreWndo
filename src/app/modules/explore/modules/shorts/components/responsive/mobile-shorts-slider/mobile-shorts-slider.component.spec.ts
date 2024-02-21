import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileShortsSliderComponent } from './mobile-shorts-slider.component';

describe('MobileShortsSliderComponent', () => {
  let component: MobileShortsSliderComponent;
  let fixture: ComponentFixture<MobileShortsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileShortsSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileShortsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
