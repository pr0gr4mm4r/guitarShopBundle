import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OverviewTitleComponent} from './overview-title.component';

describe('OverviewTitleComponent', () => {
  let component: OverviewTitleComponent;
  let fixture: ComponentFixture<OverviewTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
