import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AukCardAComponent } from './auk-card-a.component';

describe('AukCardAComponent', () => {
  let component: AukCardAComponent;
  let fixture: ComponentFixture<AukCardAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AukCardAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AukCardAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
