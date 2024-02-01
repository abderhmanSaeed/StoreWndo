import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveUCComponent } from './responsive-uc.component';

describe('ResponsiveUCComponent', () => {
  let component: ResponsiveUCComponent;
  let fixture: ComponentFixture<ResponsiveUCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsiveUCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveUCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
