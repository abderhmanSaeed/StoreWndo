import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletNavsComponent } from './wallet-navs.component';

describe('WalletNavsComponent', () => {
  let component: WalletNavsComponent;
  let fixture: ComponentFixture<WalletNavsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletNavsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletNavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
