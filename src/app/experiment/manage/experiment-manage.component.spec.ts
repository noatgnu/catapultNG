import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentManageComponent } from './experiment-manage.component';

describe('ManageComponent', () => {
  let component: ExperimentManageComponent;
  let fixture: ComponentFixture<ExperimentManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperimentManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperimentManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
