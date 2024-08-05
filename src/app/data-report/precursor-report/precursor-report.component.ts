import {Component, Input, OnInit} from '@angular/core';
import {ProteinGroupReportContentQuery} from "../protein-group-report-content";
import {DataReportService} from "../data-report.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {PrecursorReportContentQuery} from "../precursor-report-content";
import {DecimalPipe} from "@angular/common";
import {NgbPagination, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {ExtraParameterService} from "../../extra-parameter/extra-parameter.service";

@Component({
  selector: 'app-precursor-report',
  standalone: true,
  imports: [
    DecimalPipe,
    NgbPagination,
    ReactiveFormsModule,
    NgbTooltip
  ],
  templateUrl: './precursor-report.component.html',
  styleUrl: './precursor-report.component.scss'
})
export class PrecursorReportComponent implements OnInit{
  page = 1;
  @Input() pageSize = 15;
  @Input() set analysisIds(value: number[]) {
    this.searchForm.controls["analysisIds"].setValue(value)
  };
  query: PrecursorReportContentQuery|undefined = undefined;
  searchTerm: string|undefined = undefined;

  searchForm = this.fb.group({
    searchTerm: [''],
    sortBy: ['intensity'],
    sortDirection: ['desc'],
    minIntensity: [null],
    maxIntensity: [null],
    analysisIds: [this.analysisIds]
  })

  sortOptions = [
    {value: "intensity", label: "Intensity"},
    {value: "precursor_id", label: "Precursor"},
    {value: "gene_names", label: "Gene Names"},
    {value: "protein_group", label: "Protein Group"}
  ]

  constructor(private dataReportService: DataReportService, private fb: FormBuilder, public extraParameterService: ExtraParameterService) {
    this.dataReportService.refreshReportSubject.subscribe(() => {
      this.refresh()
    })

  }

  ngOnInit() {
    this.refresh()
  }

  search() {
    // @ts-ignore
    this.dataReportService.getPrecursorReport(this.searchForm.value.searchTerm, this.pageSize, 0, this.searchForm.value.sortBy, this.searchForm.value.sortDirection, this.searchForm.value.minIntensity, this.searchForm.value.maxIntensity, this.searchForm.value.analysisIds, this.extraParameterService.precursorIdentified.min, this.extraParameterService.precursorIdentified.max, this.extraParameterService.proteinIdentified.min, this.extraParameterService.proteinIdentified.max).subscribe(
      (query) => {
        this.query = query;
      }
    )
  }

  handlePageChange() {
    const offset = (this.page - 1) * this.pageSize;
    console.log(offset)
    console.log(this.page)
    // @ts-ignore
    this.dataReportService.getPrecursorReport(this.searchForm.value.searchTerm, this.pageSize, offset, this.searchForm.value.sortBy, this.searchForm.value.sortDirection, this.searchForm.value.minIntensity, this.searchForm.value.maxIntensity, this.searchForm.value.analysisIds, this.extraParameterService.precursorIdentified.min, this.extraParameterService.precursorIdentified.max, this.extraParameterService.proteinIdentified.min, this.extraParameterService.proteinIdentified.max).subscribe(
      (query) => {
        this.query = query;
      }
    )
  }

  refresh() {
    // @ts-ignore
    this.dataReportService.getPrecursorReport(null, this.pageSize, 0, this.searchForm.value.sortBy, this.searchForm.value.sortDirection, this.searchForm.value.minIntensity, this.searchForm.value.maxIntensity, this.searchForm.value.analysisIds, this.extraParameterService.precursorIdentified.min, this.extraParameterService.precursorIdentified.max, this.extraParameterService.proteinIdentified.min, this.extraParameterService.proteinIdentified.max).subscribe(
      (query) => {
        this.query = query;
      }
    )
  }
}
