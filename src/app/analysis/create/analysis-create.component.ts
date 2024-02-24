import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GeneralService} from "../../general.service";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AnalysisService} from "../analysis.service";
import {ExperimentService} from "../../experiment/experiment.service";
import {Experiment} from "../../experiment/experiment";
import {ExperimentSearchComponent} from "../../experiment/experiment-search/experiment-search.component";
import {AnalysisType} from "../analysis";

@Component({
  selector: 'app-analysis-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ExperimentSearchComponent
  ],
  templateUrl: './analysis-create.component.html',
  styleUrl: './analysis-create.component.scss'
})
export class AnalysisCreateComponent implements OnInit{

  form = this.fb.group({
    analysis_name: new FormControl(null, Validators.required),
    experiment: new FormControl(null, Validators.required),
    analysis_type: new FormControl("diann-spectral", Validators.required),
    fasta_file: new FormControl(null),
    spectral_library: new FormControl(null),
  })

  analysisTypeChoices: AnalysisType[] = []
  selectedExperiment?: Experiment
  constructor(private generalService: GeneralService, private fb: FormBuilder, private modal: NgbActiveModal, private experimentService: ExperimentService, private analysisService: AnalysisService) {
    this.analysisService.getAnalysisType().subscribe((data) => {
      this.analysisTypeChoices = data
    })
  }

  ngOnInit() {

  }

  handleExperimentSelect(experiment: Experiment) {
    this.selectedExperiment = experiment
  }

  submit() {
    if (this.form.valid) {
      if (this.form.value["analysis_name"] && this.selectedExperiment && this.form.value["analysis_type"] && this.form.value["fasta_file"] && this.form.value["spectral_library"]) {
        this.analysisService.createAnalysis(this.form.value["analysis_name"], this.selectedExperiment.id, this.form.value["analysis_type"], this.form.value["fasta_file"], this.form.value["spectral_library"]).subscribe((data) => {
          this.modal.close(data)
        })
      }
    }
  }

  close() {
    this.modal.dismiss()
  }
}
