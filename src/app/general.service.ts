import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  currentBreadcrumbs: {paths: string[], active: string} = {paths: [], active: ""}

  breadCrumbsSubject: BehaviorSubject<{ paths: string[], active: string }> = new BehaviorSubject<{paths: string[], active: string}>({paths: [], active: ""});

  constructor() { }


  setBreadcrumbs(paths: string[], active: string) {
    this.currentBreadcrumbs.paths = paths
    this.currentBreadcrumbs.active = active
    this.breadCrumbsSubject.next({paths: paths, active: active})
    console.log(active)
  }
}
