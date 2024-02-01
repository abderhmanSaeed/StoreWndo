import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AukPlayIconComponent } from './auk-play-icon.component';

describe('AukPlayIconComponent', () => {
  let component: AukPlayIconComponent;
  let fixture: ComponentFixture<AukPlayIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AukPlayIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AukPlayIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
