import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AukVideoComponent } from './auk-video.component';

describe('AukVideoComponent', () => {
  let component: AukVideoComponent;
  let fixture: ComponentFixture<AukVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AukVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AukVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
