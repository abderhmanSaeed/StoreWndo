import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridViewSliderComponent } from './grid-view-slider.component';

describe('GridViewSliderComponent', () => {
  let component: GridViewSliderComponent;
  let fixture: ComponentFixture<GridViewSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridViewSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridViewSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
