import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlsoLikeComponent } from './also-like.component';

describe('AlsoLikeComponent', () => {
  let component: AlsoLikeComponent;
  let fixture: ComponentFixture<AlsoLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlsoLikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlsoLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
