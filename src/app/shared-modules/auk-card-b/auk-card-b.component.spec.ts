import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AukCardBComponent } from './auk-card-b.component';

describe('AukCardBComponent', () => {
  let component: AukCardBComponent;
  let fixture: ComponentFixture<AukCardBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AukCardBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AukCardBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
