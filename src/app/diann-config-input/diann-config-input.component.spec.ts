import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiannConfigInputComponent } from './diann-config-input.component';

describe('DiannConfigInputComponent', () => {
  let component: DiannConfigInputComponent;
  let fixture: ComponentFixture<DiannConfigInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiannConfigInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiannConfigInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
