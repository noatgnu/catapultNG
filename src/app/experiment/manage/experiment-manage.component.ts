import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GeneralService} from "../../general.service";
import {ExperimentService} from "../experiment.service";
import {Experiment, ExperimentQuery, VendorChoice} from "../experiment";
import {DatePipe, NgClass} from "@angular/common";
import {FormBuilder, FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ExperimentCreateComponent} from "../create/experiment-create.component";
import {forkJoin} from "rxjs";
import {ExperimentSearchComponent} from "../experiment-search/experiment-search.component";
import {AnalysisCreateComponent} from "../../analysis/create/analysis-create.component";
import {ExperimentFile} from "../experiment-file";
import {ResultSummary} from "../../data-report/result-summary";
import {
  BarChartResultSummaryComponent
} from "../../result-summary/bar-chart-result-summary/bar-chart-result-summary.component";

@Component({
  selector: 'app-experiment-manage',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    ExperimentSearchComponent,
    DatePipe,
    BarChartResultSummaryComponent
  ],
  providers: [ExperimentService],
  templateUrl: './experiment-manage.component.html',
  styleUrl: './experiment-manage.component.scss'
})
export class ExperimentManageComponent implements OnInit{
  experiments: Experiment[] = []
  next: string|null = ""
  previous: string|null = ""
  n_experiment: number = 0
  showSelect: boolean = false
  selectedExperiments: number[] = []
  clickedExperiment: number = -1
  vendorChoices: VendorChoice[] = []
  form = this.fb.group({
    experiment_name: new FormControl(''),
    sample_count: new FormControl(),
    vendor: new FormControl(),
    created_at: new FormControl(),
    updated_at: new FormControl(),
    id: new FormControl()
  })
  associatedFiles: ExperimentFile[] = []

  private _experimentId: number = -1

  @Input() set experimentId(experimentId: number) {
    this.selectExperiment(experimentId)
    this._experimentId = experimentId
  }

  get experimentId(): number {
    return this._experimentId
  }

  resultSummaries: ResultSummary[] = []

  constructor(private activatedRoute: ActivatedRoute, private generalService: GeneralService, private experimentService: ExperimentService, private fb: FormBuilder, private modal: NgbModal) {
    this.experimentService.getExperiments().subscribe((data: ExperimentQuery) => {
      this.experiments = data.results
      this.next = data.next
      this.previous = data.previous
      this.n_experiment = data.count
    })
    this.experimentService.getVendorChoices().subscribe((data: VendorChoice[]) => {
      this.vendorChoices = data
    })
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
        this.generalService.setBreadcrumbs(data.breadcrumbs, data.breadcrumbs.join("/"))
      }
    )
  }

  toggleExperimentSelect(experiment_id: number, toggle: Event) {
    if (toggle.target) {
      const target = toggle.target as HTMLInputElement;
      if ("checked" in target) {
        if (target.checked) {
          this.selectedExperiments.push(experiment_id)
        } else {
          this.selectedExperiments = this.selectedExperiments.filter((value) => value !== experiment_id)
        }
      }
    }
  }

  selectExperiment(experiment_id: number) {
    if (this.clickedExperiment === experiment_id) {
      this.clickedExperiment = -1
    } else {
      this.clickedExperiment = experiment_id
      this.experimentService.getExperiment(experiment_id).subscribe((experiment: Experiment) => {
        this.form.patchValue({
          experiment_name: experiment.experiment_name,
          sample_count: experiment.sample_count,
          vendor: experiment.vendor,
          created_at: new Date(experiment.created_at).toISOString().slice(0, 10),
          updated_at: new Date(experiment.updated_at).toISOString().slice(0, 10),
          id: experiment.id
        })
        this.experimentService.getAssociatedFiles(experiment.id).subscribe((files: ExperimentFile[]) => {
          this.associatedFiles = files
          console.log(files)
        })
      })
      this.experimentService.getResultSummaries(experiment_id).subscribe((data: ResultSummary[]) => {
        this.resultSummaries = data
      })
    }
  }

  updateExperiment() {
    if (this.form.valid) {
      this.experimentService.updateExperiment(this.form.value.id, <Experiment>this.form.value).subscribe((experiment: Experiment) => {
        this.experimentService.getExperiments().subscribe((data: ExperimentQuery) => {
          this.experiments = data.results
          this.next = data.next
          this.previous = data.previous
          this.n_experiment = data.count
        })
      })
    }

  }

  deleteExperiment(experiment_id: number) {
    if (experiment_id && experiment_id > 0) {
      this.experimentService.deleteExperiment(experiment_id).subscribe((experiment: Experiment) => {
        this.clickedExperiment = -1
        this.experimentService.getExperiments().subscribe((data: ExperimentQuery) => {
          this.experiments = data.results
          this.next = data.next
          this.previous = data.previous
          this.n_experiment = data.count
        })
      })
    }
  }

  openCreateExperimentModal() {
    const ref = this.modal.open(ExperimentCreateComponent)
    ref.closed.subscribe((result: any) => {
      this.experimentService.getExperiments().subscribe((data: ExperimentQuery) => {
        this.experiments = data.results
        this.next = data.next
        this.previous = data.previous
        this.n_experiment = data.count
      })
    })
  }

  deleteAllSelected() {
    const obsCollection = []
    for (const experiment_id of this.selectedExperiments) {
      obsCollection.push(this.experimentService.deleteExperiment(experiment_id))
    }
    forkJoin(obsCollection).subscribe((results: any) => {
      this.experimentService.getExperiments().subscribe((data: ExperimentQuery) => {
        this.experiments = data.results
        this.next = data.next
        this.previous = data.previous
        this.n_experiment = data.count
      })
    })
  }

  handleSearchQueryResult(ExperimentQuery: ExperimentQuery) {
    this.experiments = ExperimentQuery.results
    this.next = ExperimentQuery.next
    this.previous = ExperimentQuery.previous
    this.n_experiment = ExperimentQuery.count
  }

  nextPage() {
    if (this.next) {
      this.experimentService.getExperiments(this.next).subscribe((data: ExperimentQuery) => {
        this.experiments = data.results
        this.next = data.next
        this.previous = data.previous
        this.n_experiment = data.count
      })
    }
  }

  previousPage() {
    if (this.previous) {
      this.experimentService.getExperiments(this.previous).subscribe((data: ExperimentQuery) => {
        this.experiments = data.results
        this.next = data.next
        this.previous = data.previous
        this.n_experiment = data.count
      })
    }
  }

  openCreateAnalysisModal() {
    const ref = this.modal.open(AnalysisCreateComponent)
    ref.componentInstance.mode = "fromExp"
    this.experimentService.getExperiment(this.clickedExperiment).subscribe((experiment: Experiment) => {
      ref.componentInstance.selectedExperiment = experiment
    })
  }
}
