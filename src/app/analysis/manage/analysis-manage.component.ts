import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GeneralService} from "../../general.service";
import {ExperimentSearchComponent} from "../../experiment/experiment-search/experiment-search.component";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Experiment, ExperimentQuery} from "../../experiment/experiment";
import {AnalysisService} from "../analysis.service";
import {Analysis, AnalysisQuery, AnalysisType} from "../analysis";
import {NgClass} from "@angular/common";
import {forkJoin} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AnalysisCreateComponent} from "../create/analysis-create.component";
import {AnalysisSearchComponent} from "../analysis-search/analysis-search.component";
import {ExperimentService} from "../../experiment/experiment.service";
import { Task } from '../../task/task';
import {WebsocketService} from "../../websocket.service";
import {FileBrowserModalComponent} from "../../file-browser-modal/file-browser-modal.component";

@Component({
  selector: 'app-analysis-manage',
  standalone: true,
  imports: [
    ExperimentSearchComponent,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    AnalysisSearchComponent
  ],
  templateUrl: './analysis-manage.component.html',
  styleUrl: './analysis-manage.component.scss'
})
export class AnalysisManageComponent implements OnInit{
  showSelect: boolean = false;

  previous: string|null = null;
  next: string|null = null;
  n_analysis: number = 0;
  analyses: Analysis[] = []
  clickedAnalysis: number = -1;

  form = this.fb.group({
    id: new FormControl(-1, Validators.required),
    analysis_name: new FormControl("", Validators.required),
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
  })

  analysisTypeChoices: AnalysisType[] = []

  selectedAnalyses: number[] = []

  selectedExperiment?: Experiment
  editExperiment: boolean = false
  tasks?: Task[]

  constructor(private websocketService: WebsocketService, private experimentService: ExperimentService, private modal: NgbModal, private activatedRoute: ActivatedRoute, private generalService: GeneralService, private analysisService: AnalysisService, private fb: FormBuilder) {
    this.analysisService.getAnalysisType().subscribe((data: AnalysisType[]) => {
      this.analysisTypeChoices = data
    })
    this.analysisService.getAnalyses().subscribe((data: AnalysisQuery) => {
      this.analyses = data.results
      this.next = data.next
      this.previous = data.previous
      this.n_analysis = data.count
    })
    this.websocketService.connectNotification().asObservable().subscribe((data: any) => {
      console.log(data)
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
      this.analysisService.getAnalyses().subscribe((data: AnalysisQuery) => {
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
    if (this.clickedAnalysis === analysis_id) {
      this.clickedAnalysis = -1
    } else {
      this.clickedAnalysis = analysis_id
      this.analysisService.getAssociatedTasks(analysis_id).subscribe((tasks: Task[]) => {
        this.tasks = tasks
      })
      this.analysisService.getAnalysis(analysis_id).subscribe((analysis: Analysis) => {
        this.form.patchValue({
          id: analysis.id,
          analysis_name: analysis.analysis_name,
          analysis_type: analysis.analysis_type,
          experiment: analysis.experiment,
          fasta_file: analysis.fasta_file,
          spectral_library: analysis.spectral_library,
          created_at: new Date(analysis.created_at),
          updated_at: new Date(analysis.updated_at),
          processing: analysis.processing,
          completed: analysis.completed,
          start_time: new Date(analysis.start_time),
          end_time: new Date(analysis.stop_time),
          commands: analysis.commands,
          log: analysis.log,
          output_folder: analysis.output_folder,
          ready: analysis.ready,
        })
        this.experimentService.getExperiment(analysis.experiment).subscribe((experiment: Experiment) => {
          this.selectedExperiment = experiment
        })
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
          this.analysisService.getAnalyses().subscribe((data: AnalysisQuery) => {
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
        this.analysisService.getAnalyses().subscribe((data: AnalysisQuery) => {
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
        console.log(analysis)
      })
    }
  }

  openFileBrowser() {
    this.modal.open(FileBrowserModalComponent, {size: "lg"})
  }
}
