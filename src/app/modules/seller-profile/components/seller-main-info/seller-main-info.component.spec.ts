import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerMainInfoComponent } from './seller-main-info.component';

describe('SellerMainInfoComponent', () => {
  let component: SellerMainInfoComponent;
  let fixture: ComponentFixture<SellerMainInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerMainInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerMainInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
