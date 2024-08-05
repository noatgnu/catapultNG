import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GeneralService} from "../../general.service";
import {ExperimentSearchComponent} from "../../experiment/experiment-search/experiment-search.component";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Experiment, ExperimentQuery} from "../../experiment/experiment";
import {AnalysisService} from "../analysis.service";
import {Analysis, AnalysisQuery, AnalysisType} from "../analysis";
import {DatePipe, NgClass} from "@angular/common";
import {forkJoin} from "rxjs";
import {NgbModal, NgbNav, NgbNavContent, NgbNavItem, NgbNavLinkButton, NgbNavOutlet} from "@ng-bootstrap/ng-bootstrap";
import {AnalysisCreateComponent} from "../create/analysis-create.component";
import {AnalysisSearchComponent} from "../analysis-search/analysis-search.component";
import {ExperimentService} from "../../experiment/experiment.service";
import { Task } from '../../task/task';
import {WebsocketService} from "../../websocket.service";
import {FileBrowserModalComponent} from "../../file-browser-modal/file-browser-modal.component";
import {ToastService} from "../../toast.service";
import {ResultSummary} from "../../data-report/result-summary";
import {
  BarChartResultSummaryComponent
} from "../../result-summary/bar-chart-result-summary/bar-chart-result-summary.component";
import {PrecursorReportComponent} from "../../data-report/precursor-report/precursor-report.component";
import {ProteinGroupReportComponent} from "../../data-report/protein-group-report/protein-group-report.component";
import {ExtraParameterComponent} from "../../extra-parameter/extra-parameter.component";
import {FilterModalComponent} from "../../filter-modal/filter-modal.component";
import {ExtraParameterService} from "../../extra-parameter/extra-parameter.service";
import {DataReportService} from "../../data-report/data-report.service";

@Component({
  selector: 'app-analysis-manage',
  standalone: true,
  imports: [
    ExperimentSearchComponent,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    AnalysisSearchComponent,
    BarChartResultSummaryComponent,
    PrecursorReportComponent,
    NgbNav,
    NgbNavItem,
    NgbNavLinkButton,
    NgbNavContent,
    ProteinGroupReportComponent,
    NgbNavOutlet,
    ExtraParameterComponent,
    DatePipe
  ],
  templateUrl: './analysis-manage.component.html',
  styleUrl: './analysis-manage.component.scss'
})
export class AnalysisManageComponent implements OnInit{
  showSelect: boolean = false;
  active = "precursor"
  previous: string|null = null;
  next: string|null = null;
  n_analysis: number = 0;
  analyses: Analysis[] = []
  clickedAnalysis: number = -1;
  searchTerm: string = ""

  form = this.fb.group({
    id: new FormControl(-1, Validators.required),
    analysis_path: new FormControl("", Validators.required),
    experiment: new FormControl(-1, Validators.required),
    analysis_type: new FormControl("diann-spectral", Validators.required),
    fasta_file: new FormControl(""),
    spectral_library: new FormControl(""),
    created_at: new FormControl(),
    updated_at: new FormControl(),
    processing: new FormControl(false),
    completed: new FormControl(false),
    start_time: new FormControl(),
    end_time: new FormControl(),
    log: new FormControl(""),
    commands: new FormControl(""),
    output_folder: new FormControl(""),
    default_analysis: new FormControl(false),
    ready: new FormControl(false),
    analysis_name: new FormControl(""),
  })

  analysisTypeChoices: AnalysisType[] = []

  selectedAnalyses: number[] = []

  selectedExperiment?: Experiment
  editExperiment: boolean = false
  tasks?: Task[]
  private _analysisId: number = -1
  @Input() set analysisId(analysisId: number) {
    this._analysisId = analysisId
    this.selectAnalysis(analysisId)
  }

  get analysisId(): number {
    return this._analysisId
  }
  resultSummaries: ResultSummary[] = []
  constructor(private dataReportService: DataReportService, private toastService: ToastService, private websocketService: WebsocketService, private experimentService: ExperimentService, private modal: NgbModal, private activatedRoute: ActivatedRoute, private generalService: GeneralService, private analysisService: AnalysisService, private fb: FormBuilder, public extraParameterService: ExtraParameterService) {
    this.analysisService.getAnalysisType().subscribe((data: AnalysisType[]) => {
      this.analysisTypeChoices = data
    })
    this.analysisService.getAnalyses(undefined, this.extraParameterService.precursorIdentified.min, this.extraParameterService.precursorIdentified.max, this.extraParameterService.proteinIdentified.min, this.extraParameterService.proteinIdentified.max, this.extraParameterService.diannConfig).subscribe((data: AnalysisQuery) => {
      this.analyses = data.results
      this.next = data.next
      this.previous = data.previous
      this.n_analysis = data.count
    })
    this.websocketService.connectNotification().asObservable().subscribe((data: any) => {
      this.toastService.show(data["task_id"], data["status"])
      if (this.clickedAnalysis > 0) {
        this.analysisService.getAssociatedTasks(this.clickedAnalysis).subscribe((tasks: Task[]) => {
          this.tasks = tasks
        })
      }
    })
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      this.generalService.setBreadcrumbs(data.breadcrumbs, data.breadcrumbs.join("/"))
      }
    )
  }

  openCreateAnalysisModal() {
    this.modal.open(AnalysisCreateComponent)
  }

  deleteAllSelected() {
    const obsCollection = []
    for (const experiment_id of this.selectedAnalyses) {
      obsCollection.push(this.analysisService.deleteAnalysis(experiment_id))
    }
    forkJoin(obsCollection).subscribe((results: any) => {
      this.analysisService.getAnalyses(undefined, this.extraParameterService.precursorIdentified.min, this.extraParameterService.precursorIdentified.max, this.extraParameterService.proteinIdentified.min, this.extraParameterService.proteinIdentified.max, this.extraParameterService.diannConfig).subscribe((data: AnalysisQuery) => {
        this.analyses = data.results
        this.next = data.next
        this.previous = data.previous
        this.n_analysis = data.count
      })
    })

  }

  nextPage() {
    if (this.next) {
      this.analysisService.getAnalyses(this.next).subscribe((data: AnalysisQuery) => {
        this.analyses = data.results
        this.next = data.next
        this.previous = data.previous
        this.n_analysis = data.count
      })
    }
  }

  previousPage() {
    if (this.previous) {
      this.analysisService.getAnalyses(this.previous).subscribe((data: AnalysisQuery) => {
        this.analyses = data.results
        this.next = data.next
        this.previous = data.previous
        this.n_analysis = data.count
      })
    }
  }

  selectAnalysis(analysis_id: number) {
    this.selectedExperiment= undefined
    if (this.clickedAnalysis === analysis_id || !analysis_id) {
      this.clickedAnalysis = -1
    } else {
      this.clickedAnalysis = analysis_id
      this.analysisService.getAssociatedTasks(analysis_id).subscribe((tasks: Task[]) => {
        this.tasks = tasks
      })
      this.analysisService.getAnalysis(analysis_id).subscribe((analysis: Analysis) => {
        const data: any = {
          id: analysis.id,
            analysis_path: analysis.analysis_path,
          analysis_type: analysis.analysis_type,
          experiment: analysis.experiment,
          created_at: new Date(analysis.created_at),
          updated_at: new Date(analysis.updated_at),
          processing: analysis.processing,
          completed: analysis.completed,
          commands: analysis.commands,
          log: analysis.log,
          output_folder: analysis.output_folder,
          analysis_name: analysis.analysis_name,
        }
        if (analysis.start_time) {
          data.start_time = new Date(analysis.start_time)
        }
        if (analysis.stop_time) {
          data.end_time = new Date(analysis.stop_time)
        }
        this.form.patchValue(
          data
        )
        this.experimentService.getExperiment(analysis.experiment).subscribe((experiment: Experiment) => {
          this.selectedExperiment = experiment
        })
      })
      this.analysisService.getResultSummaries(analysis_id).subscribe((data) => {
        this.resultSummaries = data
      })
    }
  }
  toggleAnalysisSelect(analysis_id: number, toggle: Event) {
    if (toggle.target) {
      const target = toggle.target as HTMLInputElement;
      if ("checked" in target) {
        if (target.checked) {
          this.selectedAnalyses.push(analysis_id)
        } else {
          this.selectedAnalyses = this.selectedAnalyses.filter((value) => value !== analysis_id)
        }
      }
    }
  }

  updateAnalysis() {
    if (this.form.valid) {
      if (this.form.value.id) {
        this.analysisService.updateAnalysis(this.form.value.id, <Analysis>this.form.value).subscribe((analysis: Analysis) => {
          this.analysisService.getAnalyses(undefined, this.extraParameterService.precursorIdentified.min, this.extraParameterService.precursorIdentified.max, this.extraParameterService.proteinIdentified.min, this.extraParameterService.proteinIdentified.max, this.extraParameterService.diannConfig).subscribe((data: AnalysisQuery) => {
            this.analyses = data.results
            this.next = data.next
            this.previous = data.previous
            this.n_analysis = data.count
          })
        })
      }

    }
  }

  deleteAnalysis(analysis_id: number) {
    if (analysis_id && analysis_id > 0) {
      this.analysisService.deleteAnalysis(analysis_id).subscribe((analysis: Analysis) => {
        this.clickedAnalysis = -1
        this.analysisService.getAnalyses(undefined, this.extraParameterService.precursorIdentified.min, this.extraParameterService.precursorIdentified.max, this.extraParameterService.proteinIdentified.min, this.extraParameterService.proteinIdentified.max, this.extraParameterService.diannConfig).subscribe((data: AnalysisQuery) => {
          this.analyses = data.results
          this.next = data.next
          this.previous = data.previous
          this.n_analysis = data.count
        })

      })
    }
  }

  handleAnalysisSearchQuery(analysisQuery: AnalysisQuery) {
    this.analyses = analysisQuery.results
    this.next = analysisQuery.next
    this.previous = analysisQuery.previous
    this.n_analysis = analysisQuery.count
  }

  handleExperimentSelect(experiment: Experiment) {
    this.form.patchValue({
      experiment: experiment.id
    })
    this.selectedExperiment = experiment
    this.editExperiment = false
  }

  queueAnalysis(analysis_id: number) {
    if (analysis_id > 0) {
      this.analysisService.queueAnalysis(analysis_id).subscribe((analysis: any) => {
        this.toastService.show("Analysis", "Successfully Queued")
      })
    }
  }

  openFileBrowser() {
    this.modal.open(FileBrowserModalComponent, {size: "lg"})
  }

  openFilterModal() {
    const ref = this.modal.open(FilterModalComponent, {scrollable: true})
    ref.closed.subscribe((value) => {
      this.extraParameterService.proteinIdentified.min = value.min_protein
      this.extraParameterService.proteinIdentified.max = value.max_protein
      this.extraParameterService.precursorIdentified.min = value.min_precursor
      this.extraParameterService.precursorIdentified.max = value.max_precursor
      this.extraParameterService.diannConfig = value.diannConfig
      this.analysisService.getAnalyses(undefined, this.extraParameterService.precursorIdentified.min, this.extraParameterService.precursorIdentified.max, this.extraParameterService.proteinIdentified.min, this.extraParameterService.proteinIdentified.max, this.extraParameterService.diannConfig).subscribe((data: AnalysisQuery) => {
        this.analyses = data.results
        this.next = data.next
        this.previous = data.previous
        this.n_analysis = data.count
      })
      this.dataReportService.refreshReportSubject.next(true)

    })
  }

  resetFilter() {
    this.extraParameterService.proteinIdentified.min = null
    this.extraParameterService.proteinIdentified.max = null
    this.extraParameterService.precursorIdentified.min = null
    this.extraParameterService.precursorIdentified.max = null
    this.searchTerm = ""
    this.analysisService.getAnalyses(undefined, this.extraParameterService.precursorIdentified.min, this.extraParameterService.precursorIdentified.max, this.extraParameterService.proteinIdentified.min, this.extraParameterService.proteinIdentified.max, this.extraParameterService.diannConfig).subscribe((data: AnalysisQuery) => {
      this.analyses = data.results
      this.next = data.next
      this.previous = data.previous
      this.n_analysis = data.count
    })
    this.dataReportService.refreshReportSubject.next(true)
  }
}
