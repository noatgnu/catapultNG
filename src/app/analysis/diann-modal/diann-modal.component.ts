import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, ReactiveFormsModule} from "@angular/forms";
import {Diann} from "../diann";

@Component({
  selector: 'app-diann-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './diann-modal.component.html',
  styleUrl: './diann-modal.component.scss'
})
export class DiannModalComponent {


  form = this.fb.group({
    commands: new FormControl(""),
    "N-term M excision": new FormControl(true),
    "C carbamidomethylation": new FormControl(true),
    "Oxidation M": new FormControl(false),
    "Acetyl N-term": new FormControl(false),
    "Phospho STY": new FormControl(false),
    "K-GG": new FormControl(false),
    "FASTA digest for library-free search / library generation": new FormControl(false),
    "Deep learning-based spectra, RTs and IMs prediction": new FormControl(false),
  })

  constructor(private fb: FormBuilder , private modal: NgbActiveModal) {
    this.createDiann()
  }


  submit() {

  }

  close() {
    this.modal.dismiss()
  }

  createDiann() {
    let diann = new Diann()
    if (this.form.controls["N-term M excision"].value) {
      diann.addNTermMethionineExcision()
    }
    if (this.form.controls["C carbamidomethylation"].value) {
      diann.addCCarbamidomethyl()
    }
    if (this.form.controls["Oxidation M"].value) {
      diann.addOxidationM()
    }
    if (this.form.controls["Acetyl N-term"].value) {
      diann.addAcetylN()
    }
    if (this.form.controls["Phospho STY"].value) {
      diann.addPhosphoSTY()
    }
    if (this.form.controls["K-GG"].value) {
      diann.addKGG()
    }
    console.log(diann.convertAttributesToCommandParams())
    this.form.controls["commands"].setValue(diann.convertAttributesToCommandParams().join(" "))
  }
}
