import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Diann} from "../diann";
import {DiannConfigInputComponent} from "../../diann-config-input/diann-config-input.component";
import {ConfigToDiannCMD} from "../catapult-run-config";
import yaml from "js-yaml";

@Component({
  selector: 'app-diann-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DiannConfigInputComponent
  ],
  templateUrl: './diann-modal.component.html',
  styleUrl: './diann-modal.component.scss'
})
export class DiannModalComponent {

  form = this.fb.group({
    diannCMD: [""]
  })
  currentConfig: any = {}

  constructor(private modal: NgbActiveModal, private fb: FormBuilder) {

  }


  submit() {

  }

  close() {
    this.modal.dismiss()
  }

  handleConfigChange(value: any) {
    this.currentConfig = value
    const payload: any = {}
    for (const key in value) {
      if (!key.endsWith("_catenable") && !key.endsWith("_input")) {
        payload[key] = value[key]
      }
    }
    const result = ConfigToDiannCMD(payload)
    this.form.controls["diannCMD"].setValue(result)
  }
  export() {
    const payload: any = {}
    for (const key in this.currentConfig) {
      if (!key.endsWith("_catenable") && !key.endsWith("_input")) {
        // @ts-ignore
        payload[key] = this.currentConfig[key]
      }
    }
    const yamlString = yaml.dump(payload);

    const blob = new Blob([yamlString], { type: 'application/x-yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.yaml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

  }
}
