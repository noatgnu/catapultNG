import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ExtraParameterService} from "../extra-parameter/extra-parameter.service";
import {DiannConfigInputComponent} from "../diann-config-input/diann-config-input.component";
import {CatapultRunConfigContent} from "../analysis/catapult-run-config";

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DiannConfigInputComponent
  ],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.scss'
})
export class FilterModalComponent {

  form = this.fb.group({
    min_precursor: [this.extraParameterService.precursorIdentified.min],
    max_precursor: [this.extraParameterService.precursorIdentified.max],
    min_protein: [this.extraParameterService.proteinIdentified.min],
    max_protein: [this.extraParameterService.proteinIdentified.max],
  })

  diannConfig: CatapultRunConfigContent = new CatapultRunConfigContent()

  constructor(private activeModal: NgbActiveModal, private fb: FormBuilder, private extraParameterService: ExtraParameterService) {
  }

  submit() {
    this.activeModal.close({form: this.form.value, diannConfig: this.diannConfig})
  }

  close() {
    this.activeModal.dismiss()
  }

  handleDiannConfigUpdate(value: any) {
    this.diannConfig.reset()
    console.log(value)

    Object.keys(this.diannConfig).forEach((key) => {
      const v = value[key]
      if (value[`${key}_catenable`]) {
        console.log(v)
        // @ts-ignore
        this.diannConfig[key as keyof CatapultRunConfigContent] = v
        this.extraParameterService.diannConfigEnableMap[key] = true
      }
    })
    console.log(this.diannConfig)
  }

}
