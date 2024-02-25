import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisLogComponent } from './analysis-log.component';

describe('AnalysisLogComponent', () => {
  let component: AnalysisLogComponent;
  let fixture: ComponentFixture<AnalysisLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalysisLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
