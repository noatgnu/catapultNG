import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileBrowserModalComponent } from './file-browser-modal.component';

describe('FileBrowserModalComponent', () => {
  let component: FileBrowserModalComponent;
  let fixture: ComponentFixture<FileBrowserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileBrowserModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileBrowserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
