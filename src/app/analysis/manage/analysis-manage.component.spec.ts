import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisManageComponent } from './analysis-manage.component';

describe('ManageComponent', () => {
  let component: AnalysisManageComponent;
  let fixture: ComponentFixture<AnalysisManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
