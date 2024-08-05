import {Component, Input} from '@angular/core';
import {DataReportService} from "../data-report.service";
import {ProteinGroupReportContentQuery} from "../protein-group-report-content";
import {DecimalPipe} from "@angular/common";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {NgbPagination, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-protein-group-report',
  standalone: true,
  imports: [
    DecimalPipe,
    ReactiveFormsModule,
    NgbPagination,
    NgbTooltip
  ],
  templateUrl: './protein-group-report.component.html',
  styleUrl: './protein-group-report.component.scss'
})
export class ProteinGroupReportComponent {

  page = 1;
  @Input() pageSize = 15;
  @Input() analysisIds: number[] = [];
  query: ProteinGroupReportContentQuery|undefined = undefined;
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
    {value: "gene_names", label: "Gene Names"},
    {value: "protein_group", label: "Protein Group"}
    ]

  constructor(private dataReportService: DataReportService, private fb: FormBuilder) {
    this.refresh()
    this.dataReportService.refreshReportSubject.subscribe(() => {
      this.refresh()
    })
  }

  search() {
    // @ts-ignore
    this.dataReportService.getProteinGroupReport(this.searchForm.value.searchTerm, this.pageSize, 0, this.searchForm.value.sortBy, this.searchForm.value.sortDirection, this.searchForm.value.minIntensity, this.searchForm.value.maxIntensity, this.searchForm.value.analysisIds).subscribe(
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
    this.dataReportService.getProteinGroupReport(this.searchForm.value.searchTerm, this.pageSize, offset, this.searchForm.value.sortBy, this.searchForm.value.sortDirection, this.searchForm.value.minIntensity, this.searchForm.value.maxIntensity, this.searchForm.value.analysisIds).subscribe(
      (query) => {
        this.query = query;
      }
    )
  }

  refresh() {
    // @ts-ignore
    this.dataReportService.getProteinGroupReport(null, this.pageSize, 0, this.searchForm.value.sortBy, this.searchForm.value.sortDirection, this.searchForm.value.minIntensity, this.searchForm.value.maxIntensity, this.searchForm.value.analysisIds).subscribe(
      (query) => {
        this.query = query;
      }
    )
  }

}
