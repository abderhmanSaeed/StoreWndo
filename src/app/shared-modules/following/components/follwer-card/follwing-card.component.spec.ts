import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollwingCardComponent } from './follwing-card.component';

describe('FollwingCardComponent', () => {
  let component: FollwingCardComponent;
  let fixture: ComponentFixture<FollwingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollwingCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollwingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
