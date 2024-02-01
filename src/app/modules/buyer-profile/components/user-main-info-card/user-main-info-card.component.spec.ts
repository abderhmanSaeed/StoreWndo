import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMainInfoCardComponent } from './user-main-info-card.component';

describe('UserMainInfoCardComponent', () => {
  let component: UserMainInfoCardComponent;
  let fixture: ComponentFixture<UserMainInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMainInfoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMainInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
