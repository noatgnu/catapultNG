import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentCreateComponent } from './experiment-create.component';

describe('CreateComponent', () => {
  let component: ExperimentCreateComponent;
  let fixture: ComponentFixture<ExperimentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperimentCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperimentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
