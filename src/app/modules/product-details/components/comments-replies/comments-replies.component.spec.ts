import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsRepliesComponent } from './comments-replies.component';

describe('CommentsRepliesComponent', () => {
  let component: CommentsRepliesComponent;
  let fixture: ComponentFixture<CommentsRepliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsRepliesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
