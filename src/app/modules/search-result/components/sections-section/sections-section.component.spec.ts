import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsSectionComponent } from './sections-section.component';

describe('SectionsSectionComponent', () => {
  let component: SectionsSectionComponent;
  let fixture: ComponentFixture<SectionsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
