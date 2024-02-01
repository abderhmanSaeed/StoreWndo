import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileFormComponent } from './mobile-form.component';

describe('MobileFormComponent', () => {
  let component: MobileFormComponent;
  let fixture: ComponentFixture<MobileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
