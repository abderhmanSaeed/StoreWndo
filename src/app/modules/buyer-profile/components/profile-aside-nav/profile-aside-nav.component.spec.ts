import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAsideNavComponent } from './profile-aside-nav.component';

describe('ProfileAsideNavComponent', () => {
  let component: ProfileAsideNavComponent;
  let fixture: ComponentFixture<ProfileAsideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAsideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAsideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
