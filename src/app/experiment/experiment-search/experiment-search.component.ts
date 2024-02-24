import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ExperimentService} from "../experiment.service";
import {Experiment, ExperimentQuery} from "../experiment";
import {catchError, debounceTime, distinctUntilChanged, map, of, OperatorFunction, switchMap, tap} from "rxjs";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbHighlight, NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-experiment-search',
  standalone: true,
  imports: [
    FormsModule,
    NgbTypeahead,
    NgbHighlight,
    ReactiveFormsModule
  ],
  templateUrl: './experiment-search.component.html',
  styleUrl: './experiment-search.component.scss'
})
export class ExperimentSearchComponent {
  @Input() mode: "typeahead" | "emit" = "typeahead"
  searchTerm: string = ""

  searching: boolean = false
  searchFailed: boolean = false

  search: OperatorFunction<string, readonly Experiment[]> = (text$) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.experimentService.searchExperiments(term).pipe(
          tap(() => this.searchFailed = false),
          map((experimentQuery: ExperimentQuery) => {
            return experimentQuery.results
          }),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => this.searching = false)
    )

  formatter = (x: Experiment) => x.experiment_name;



  @Output() searchQuery: EventEmitter<ExperimentQuery> = new EventEmitter<ExperimentQuery>()
  @Output() selectedExperiment: EventEmitter<Experiment> = new EventEmitter<Experiment>()
  form = this.fb.group({
    searchTerm: new FormControl("")
  })

  constructor(private experimentService: ExperimentService, private fb: FormBuilder){
    this.form.controls["searchTerm"].valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((term) => {
      if (term) {
        if (term.length > 2) {
          this.searchExperimentName()
        }
      }

    })
  }

  searchExperimentName() {
    if (this.form.value["searchTerm"]) {
      this.experimentService.searchExperiments(this.form.value["searchTerm"]).subscribe((experimentQuery: ExperimentQuery) => {
        this.searchQuery.emit(experimentQuery)
      })
    }
  }

  selectionHandler(event: any) {
    this.selectedExperiment.emit(event.item)
  }
}
