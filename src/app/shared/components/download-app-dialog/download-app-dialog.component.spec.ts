import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAppDialogComponent } from './download-app-dialog.component';

describe('DownloadAppDialogComponent', () => {
  let component: DownloadAppDialogComponent;
  let fixture: ComponentFixture<DownloadAppDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadAppDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadAppDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
