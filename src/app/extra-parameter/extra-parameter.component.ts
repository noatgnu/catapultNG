import { Component } from '@angular/core';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FilterModalComponent} from "../filter-modal/filter-modal.component";
import {ExtraParameterService} from "./extra-parameter.service";

@Component({
  selector: 'app-extra-parameter',
  standalone: true,
  imports: [
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgbDropdownToggle
  ],
  templateUrl: './extra-parameter.component.html',
  styleUrl: './extra-parameter.component.scss'
})
export class ExtraParameterComponent {
  constructor(private modal: NgbModal, private extraParameterService: ExtraParameterService) {
  }

  openFilterModal() {
    const ref = this.modal.open(FilterModalComponent, {scrollable: true})
    ref.closed.subscribe((value) => {
      this.extraParameterService.proteinIdentified.min = value.form.min_protein
      this.extraParameterService.proteinIdentified.max = value.form.max_protein
      this.extraParameterService.precursorIdentified.min = value.form.min_precursor
      this.extraParameterService.precursorIdentified.max = value.form.max_precursor
      this.extraParameterService.diannConfig = value.diannConfig
    })
  }
}
