import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraParameterComponent } from './extra-parameter.component';

describe('ExtraParameterComponent', () => {
  let component: ExtraParameterComponent;
  let fixture: ComponentFixture<ExtraParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtraParameterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtraParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
