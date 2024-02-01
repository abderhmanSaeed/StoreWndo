import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AukCardCComponent } from './auk-card-c.component';

describe('AukCardCComponent', () => {
  let component: AukCardCComponent;
  let fixture: ComponentFixture<AukCardCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AukCardCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AukCardCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
