import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTypeCardComponent } from './search-type-card.component';

describe('SearchTypeCardComponent', () => {
  let component: SearchTypeCardComponent;
  let fixture: ComponentFixture<SearchTypeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTypeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTypeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
