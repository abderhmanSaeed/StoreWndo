import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresSectionComponent } from './stores-section.component';

describe('StoresSectionComponent', () => {
  let component: StoresSectionComponent;
  let fixture: ComponentFixture<StoresSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoresSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
