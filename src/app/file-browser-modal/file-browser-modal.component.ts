import { Component } from '@angular/core';
import {GeneralService} from "../general.service";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-file-browser-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './file-browser-modal.component.html',
  styleUrl: './file-browser-modal.component.scss'
})
export class FileBrowserModalComponent {

  form = this.fb.group({
    path: new FormControl(".", Validators.required)
  })

  folders: string[] = []
  files: string[] = []

  clickedFolder: string = ""
  clickedFile: string = ""

  constructor(private fb: FormBuilder, private generalService: GeneralService) {
    this.browse()
  }

  browse() {
    if (this.form.valid && this.form.value.path) {
      this.files = []
      this.folders = []
      this.generalService.postFileLocation(this.form.value.path).subscribe((data) => {
        this.form.controls.path.setValue(data.current)
        this.folders = data.folders
        this.files = data.files
      })
    }
  }
}
