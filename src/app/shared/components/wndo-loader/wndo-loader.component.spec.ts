import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WndoLoaderComponent } from './wndo-loader.component';

describe('WndoLoaderComponent', () => {
  let component: WndoLoaderComponent;
  let fixture: ComponentFixture<WndoLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WndoLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WndoLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
