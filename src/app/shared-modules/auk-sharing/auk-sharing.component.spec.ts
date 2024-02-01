import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AukSharingComponent } from './auk-sharing.component';

describe('AukSharingComponent', () => {
  let component: AukSharingComponent;
  let fixture: ComponentFixture<AukSharingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AukSharingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AukSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
