import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {GeneralService} from "../../general.service";
import {VendorChoice} from "../experiment";
import {ExperimentService} from "../experiment.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-experiment-create',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './experiment-create.component.html',
  styleUrl: './experiment-create.component.scss'
})
export class ExperimentCreateComponent implements OnInit{

  form = this.fb.group({
    experiment: new FormControl(null, Validators.required),
    vendor: new FormControl(null, Validators.required),
    sample_count: new FormControl(null, Validators.required),
  })

  vendorChoices: VendorChoice[] = []

  constructor(private fb: FormBuilder, private generalService: GeneralService, private experimentService: ExperimentService, private modal: NgbActiveModal) {
    this.experimentService.getVendorChoices().subscribe((data: VendorChoice[]) => {
      this.vendorChoices = data
    })
  }

  ngOnInit() {

  }

  close() {
    this.modal.dismiss()
  }

  createExperiment() {
    if (this.form.valid) {
      if (this.form.value["experiment"] && this.form.value["vendor"] && this.form.value["sample_count"]) {
        this.experimentService.createExperiment(this.form.value["experiment"], this.form.value["vendor"], this.form.value["sample_count"]).subscribe((data) => {
          this.modal.close(data)
        })
      }

    }
  }
}
