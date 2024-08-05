import {Component, EventEmitter, Input, Output} from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, map, of, OperatorFunction, switchMap, tap} from "rxjs";
import {Experiment, ExperimentQuery} from "../../experiment/experiment";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ExperimentService} from "../../experiment/experiment.service";
import {AnalysisService} from "../analysis.service";
import {Analysis, AnalysisQuery} from "../analysis";
import {NgbHighlight, NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-analysis-search',
  standalone: true,
  imports: [
    NgbHighlight,
    NgbTypeahead,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './analysis-search.component.html',
  styleUrl: './analysis-search.component.scss'
})
export class AnalysisSearchComponent {
  @Input() mode: "typeahead" | "emit" = "typeahead"
  @Input() searchTerm: string = ""

  searching: boolean = false
  searchFailed: boolean = false

  search: OperatorFunction<string, readonly Analysis[]> = (text$) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.analysisService.searchAnalyses(term).pipe(
          tap(() => this.searchFailed = false),
          map((analysisQuery: AnalysisQuery) => {
            return analysisQuery.results
          }),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => this.searching = false)
    )

  formatter = (x: Analysis) => x.analysis_path;



  @Output() searchQuery: EventEmitter<AnalysisQuery> = new EventEmitter<AnalysisQuery>()
  @Output() selectedAnalysis: EventEmitter<Analysis> = new EventEmitter<Analysis>()
  form = this.fb.group({
    searchTerm: new FormControl("")
  })

  constructor(private analysisService: AnalysisService, private fb: FormBuilder){
    this.form.controls["searchTerm"].valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((term) => {
      if (term) {
        if (term.length > 2) {
          this.searchAnalysisName()
        }
      }

    })
  }

  searchAnalysisName() {
    if (this.form.value["searchTerm"]) {
      this.analysisService.searchAnalyses(this.form.value["searchTerm"]).subscribe((analysisQuery: AnalysisQuery) => {
        this.searchQuery.emit(analysisQuery)
      })
    }
  }

  selectionHandler(event: any) {
    this.selectedAnalysis.emit(event.item)
  }
}
