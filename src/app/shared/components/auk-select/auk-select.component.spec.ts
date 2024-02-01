import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AukSelectComponent } from './auk-select.component';

describe('AukSelectComponent', () => {
  let component: AukSelectComponent;
  let fixture: ComponentFixture<AukSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AukSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AukSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
