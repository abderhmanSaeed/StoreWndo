import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackOrderProgressComponent } from './track-order-progress.component';

describe('TrackOrderProgressComponent', () => {
  let component: TrackOrderProgressComponent;
  let fixture: ComponentFixture<TrackOrderProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackOrderProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackOrderProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
