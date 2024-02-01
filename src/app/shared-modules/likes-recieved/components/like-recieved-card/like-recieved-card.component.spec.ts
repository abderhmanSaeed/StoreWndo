import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeRecievedCardComponent } from './like-recieved-card.component';

describe('LikeRecievedCardComponent', () => {
  let component: LikeRecievedCardComponent;
  let fixture: ComponentFixture<LikeRecievedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeRecievedCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeRecievedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
