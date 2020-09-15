import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TableOverviewSingleBuyComponent} from './table-overview-single-buy.component';

describe('TableOverviewSingleBuyComponent', () => {
  let component: TableOverviewSingleBuyComponent;
  let fixture: ComponentFixture<TableOverviewSingleBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableOverviewSingleBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOverviewSingleBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
