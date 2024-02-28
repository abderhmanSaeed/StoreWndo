import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashSalePageComponent } from './flash-sale-page.component';

describe('FlashSalePageComponent', () => {
  let component: FlashSalePageComponent;
  let fixture: ComponentFixture<FlashSalePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashSalePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashSalePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
