import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackOrderItemComponent } from './track-order-item.component';

describe('TrackOrderItemComponent', () => {
  let component: TrackOrderItemComponent;
  let fixture: ComponentFixture<TrackOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackOrderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
