import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouMayAlsoLikeSectionComponent } from './you-may-also-like-section.component';

describe('YouMayAlsoLikeSectionComponent', () => {
  let component: YouMayAlsoLikeSectionComponent;
  let fixture: ComponentFixture<YouMayAlsoLikeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YouMayAlsoLikeSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YouMayAlsoLikeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
