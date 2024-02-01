import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglerSettingsComponent } from './toggler-settings.component';

describe('TogglerSettingsComponent', () => {
  let component: TogglerSettingsComponent;
  let fixture: ComponentFixture<TogglerSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TogglerSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TogglerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
