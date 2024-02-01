import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayBtnComponent } from './play-btn.component';

describe('PlayBtnComponent', () => {
  let component: PlayBtnComponent;
  let fixture: ComponentFixture<PlayBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
