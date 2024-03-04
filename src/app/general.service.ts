import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  baseURL = environment.baseURL
  currentBreadcrumbs: {paths: string[], active: string} = {paths: [], active: ""}

  breadCrumbsSubject: BehaviorSubject<{ paths: string[], active: string }> = new BehaviorSubject<{paths: string[], active: string}>({paths: [], active: ""});

  constructor(private http: HttpClient) { }


  setBreadcrumbs(paths: string[], active: string) {
    this.currentBreadcrumbs.paths = paths
    this.currentBreadcrumbs.active = active
    this.breadCrumbsSubject.next({paths: paths, active: active})
    console.log(active)
  }

  postFileLocation(fileLocation: string) {
    return this.http.post<FileLocation>(this.baseURL + "/api/file-browser/", {file_path: fileLocation})
  }
}

export interface FileLocation {
  "current": string,
  "folders": string[],
  "files": string[]
}
