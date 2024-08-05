import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecursorReportComponent } from './precursor-report.component';

describe('PrecursorReportComponent', () => {
  let component: PrecursorReportComponent;
  let fixture: ComponentFixture<PrecursorReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrecursorReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrecursorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
