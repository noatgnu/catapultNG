import { Injectable } from '@angular/core';
import {CatapultRunConfigContent} from "../analysis/catapult-run-config";

@Injectable({
  providedIn: 'root'
})
export class ExtraParameterService {
  proteinIdentified: {min: number|null, max: number|null} = {
    min: null,
    max: null
  }
  precursorIdentified: {min: number|null, max: number|null} = {
    min: null,
    max: null
  }
  diannConfig: CatapultRunConfigContent = new CatapultRunConfigContent()

  constructor() {
    this.resetDiannConfig()
  }

  resetDiannConfig() {
    this.diannConfig.reset()
  }
}
