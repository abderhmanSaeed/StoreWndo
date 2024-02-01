import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultStoreCardComponent } from './search-result-store-card.component';

describe('SearchResultStoreCardComponent', () => {
  let component: SearchResultStoreCardComponent;
  let fixture: ComponentFixture<SearchResultStoreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultStoreCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultStoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
