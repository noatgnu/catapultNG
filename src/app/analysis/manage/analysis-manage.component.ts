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

@Component({
  selector: 'app-analysis-manage',
  standalone: true,
  imports: [
    ExperimentSearchComponent,
    FormsModule,
    ReactiveFormsModule,
    NgClass
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
  })

  analysisTypeChoices: AnalysisType[] = []

  selectedAnalyses: number[] = []

  constructor(private modal: NgbModal, private activatedRoute: ActivatedRoute, private generalService: GeneralService, private analysisService: AnalysisService, private fb: FormBuilder) {
    this.analysisService.getAnalysisType().subscribe((data: AnalysisType[]) => {
      this.analysisTypeChoices = data
    })
    this.analysisService.getAnalyses().subscribe((data: AnalysisQuery) => {
      this.analyses = data.results
      this.next = data.next
      this.previous = data.previous
      this.n_analysis = data.count
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

  selectAnalysis(experiment_id: number) {
    if (this.clickedAnalysis === experiment_id) {
      this.clickedAnalysis = -1
    } else {
      this.clickedAnalysis = experiment_id
      this.analysisService.getAnalysis(experiment_id).subscribe((analysis: Analysis) => {
        this.form.patchValue({
          id: analysis.id,
          analysis_name: analysis.analysis_name,
          analysis_type: analysis.analysis_type,
          experiment: analysis.experiment,
          fasta_file: analysis.fasta_file,
          spectral_library: analysis.spectral_library,
          created_at: new Date(analysis.created_at).toISOString().slice(0, 10),
          updated_at: new Date(analysis.updated_at).toISOString().slice(0, 10),
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
}
