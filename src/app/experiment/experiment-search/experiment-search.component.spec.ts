import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentSearchComponent } from './experiment-search.component';

describe('ExperimentSearchComponent', () => {
  let component: ExperimentSearchComponent;
  let fixture: ComponentFixture<ExperimentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperimentSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExperimentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
