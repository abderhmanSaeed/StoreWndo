import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedSellersComponent } from './suggested-sellers.component';

describe('SuggestedSellersComponent', () => {
  let component: SuggestedSellersComponent;
  let fixture: ComponentFixture<SuggestedSellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestedSellersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
