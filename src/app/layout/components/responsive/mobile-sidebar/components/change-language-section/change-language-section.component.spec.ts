import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLanguageSectionComponent } from './change-language-section.component';

describe('ChangeLanguageSectionComponent', () => {
  let component: ChangeLanguageSectionComponent;
  let fixture: ComponentFixture<ChangeLanguageSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeLanguageSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLanguageSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
