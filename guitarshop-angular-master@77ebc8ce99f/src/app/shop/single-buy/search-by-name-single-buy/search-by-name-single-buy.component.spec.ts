import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchByNameSingleBuyComponent} from './search-by-name-single-buy.component';

describe('SearchByNameSingleBuyComponent', () => {
  let component: SearchByNameSingleBuyComponent;
  let fixture: ComponentFixture<SearchByNameSingleBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByNameSingleBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByNameSingleBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
