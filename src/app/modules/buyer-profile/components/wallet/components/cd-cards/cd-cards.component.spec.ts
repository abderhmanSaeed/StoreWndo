import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDCardsComponent } from './cd-cards.component';

describe('CDCardsComponent', () => {
  let component: CDCardsComponent;
  let fixture: ComponentFixture<CDCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CDCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
