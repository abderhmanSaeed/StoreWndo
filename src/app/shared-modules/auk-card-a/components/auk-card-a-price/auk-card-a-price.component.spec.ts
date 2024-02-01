import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AukCardAPriceComponent } from './auk-card-a-price.component';

describe('AukCardAPriceComponent', () => {
  let component: AukCardAPriceComponent;
  let fixture: ComponentFixture<AukCardAPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AukCardAPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AukCardAPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
