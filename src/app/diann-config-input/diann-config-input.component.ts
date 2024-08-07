import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CatapultRunConfigContent, DiannContentBlank} from "../analysis/catapult-run-config";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ExtraParameterService} from "../extra-parameter/extra-parameter.service";
import yaml from 'js-yaml';

@Component({
  selector: 'app-diann-config-input',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './diann-config-input.component.html',
  styleUrl: './diann-config-input.component.scss'
})
export class DiannConfigInputComponent {
  config: CatapultRunConfigContent = new CatapultRunConfigContent()
  configSearchForm: FormGroup = this.fb.group({
    searchTerm: new FormControl('')
  })
  form : FormGroup;
  fields:{name: string, type: string}[] = []
  @Output() updateConfig: EventEmitter<any> = new EventEmitter<any>()
  private _enableColumn: boolean = false
  @Input() set enableColumn(value: boolean) {
    this._enableColumn = value
    const formControls = this.fields.reduce((acc, field) => {

      acc[field.name] = new FormControl(null);
      if (field.type === 'array') {
        acc[`${field.name}_input`] = new FormControl('');
      }
      if (value) {
        if (this.extraParameterService.diannConfigEnableMap[field.name]) {
          acc[`${field.name}_catenable`] = new FormControl(true);
        } else {
          acc[`${field.name}_catenable`] = new FormControl(false);
        }
      }
      return acc;
    }, {} as { [key: string]: FormControl });
    for (const f in DiannContentBlank) {
      const s = this.extraParameterService.diannConfig[f as keyof CatapultRunConfigContent];
      if (formControls[f]) {
        formControls[f].setValue(s);
      }
    }
    this.form = this.fb.group(formControls);
    this.form.valueChanges.subscribe((value) => {
      this.updateConfig.emit(value);
    })
  }

  get enableColumn() {
    return this._enableColumn
  }

  constructor(private fb: FormBuilder, private extraParameterService: ExtraParameterService) {
    this.configSearchForm.controls["searchTerm"].valueChanges.subscribe((value) => {
      if (value) {

      }
    })
    this.fields = Object.keys(this.config).filter((key: string) => !key.startsWith("cat_")).map((key: string) => {
      const value = this.config[key as keyof CatapultRunConfigContent];
      return { name: key, type: Array.isArray(value) ? 'array' : typeof value };
    });
    const formControls = this.fields.reduce((acc, field) => {
      const value = this.config[field.name as keyof CatapultRunConfigContent];
      acc[field.name] = new FormControl(null);
      if (field.type === 'array') {
        acc[`${field.name}_input`] = new FormControl('');
      }
      if (this.enableColumn) {
        acc[`${field.name}_catenable`] = new FormControl(false);
      }
      console.log(this.enableColumn)
      return acc;
    }, {} as { [key: string]: FormControl });
    this.form = this.fb.group(formControls);
    this.form.valueChanges.subscribe((value) => {
      this.updateConfig.emit(value);
    })
  }

  getConfigValue(key: string) {
    return this.config[key as keyof CatapultRunConfigContent];
  }

  addSearchList(input_control: string, array_control: string) {
    const value = this.form.controls[input_control].value;
    const array = this.form.controls[array_control].value;
    if (array) {
      if (!array.includes(value)) {
        array.push(value);
        this.form.controls[array_control].setValue(array);
        this.form.controls[input_control].setValue(null);
      }
    } else {
      this.form.controls[array_control].setValue([value]);
      this.form.controls[input_control].setValue(null);
    }
  }

  removeFromList(index: number, array_control: string) {
    const array = this.form.controls[array_control].value;
    array.splice(index, 1);
    this.form.controls[array_control].setValue(array);

  }
}
