import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentViewedCardComponent } from './recent-viewed-card.component';

describe('RecentViewedCardComponent', () => {
  let component: RecentViewedCardComponent;
  let fixture: ComponentFixture<RecentViewedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentViewedCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentViewedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
