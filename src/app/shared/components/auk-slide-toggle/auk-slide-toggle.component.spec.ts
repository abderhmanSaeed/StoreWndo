import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AukSlideToggleComponent } from './auk-slide-toggle.component';

describe('AukSlideToggleComponent', () => {
  let component: AukSlideToggleComponent;
  let fixture: ComponentFixture<AukSlideToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AukSlideToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AukSlideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
