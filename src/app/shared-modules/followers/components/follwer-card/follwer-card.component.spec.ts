import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollwerCardComponent } from './follwer-card.component';

describe('FollwerCardComponent', () => {
  let component: FollwerCardComponent;
  let fixture: ComponentFixture<FollwerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollwerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollwerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
