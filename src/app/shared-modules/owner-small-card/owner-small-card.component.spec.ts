import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerSmallCardComponent } from './owner-small-card.component';

describe('OwnerSmallCardComponent', () => {
  let component: OwnerSmallCardComponent;
  let fixture: ComponentFixture<OwnerSmallCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerSmallCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerSmallCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
