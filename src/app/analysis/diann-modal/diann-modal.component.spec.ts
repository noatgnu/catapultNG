import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiannModalComponent } from './diann-modal.component';

describe('DiannModalComponent', () => {
  let component: DiannModalComponent;
  let fixture: ComponentFixture<DiannModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiannModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiannModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
