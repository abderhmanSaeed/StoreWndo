import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAsideComponent } from './seller-aside.component';

describe('SellerAsideComponent', () => {
  let component: SellerAsideComponent;
  let fixture: ComponentFixture<SellerAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerAsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
