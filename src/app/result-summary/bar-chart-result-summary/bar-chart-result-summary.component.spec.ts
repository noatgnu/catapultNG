import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartResultSummaryComponent } from './bar-chart-result-summary.component';

describe('BarChartResultSummaryComponent', () => {
  let component: BarChartResultSummaryComponent;
  let fixture: ComponentFixture<BarChartResultSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartResultSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartResultSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
