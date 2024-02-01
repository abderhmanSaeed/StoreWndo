import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesRecievedComponent } from './likes-recieved.component';

describe('LikesRecievedComponent', () => {
  let component: LikesRecievedComponent;
  let fixture: ComponentFixture<LikesRecievedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikesRecievedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikesRecievedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
