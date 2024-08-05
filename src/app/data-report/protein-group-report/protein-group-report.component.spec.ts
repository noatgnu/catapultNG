import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinGroupReportComponent } from './protein-group-report.component';

describe('ProteinGroupReportComponent', () => {
  let component: ProteinGroupReportComponent;
  let fixture: ComponentFixture<ProteinGroupReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProteinGroupReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProteinGroupReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
