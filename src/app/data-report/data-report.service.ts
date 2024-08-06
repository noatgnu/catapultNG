import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProteinGroupReportContentQuery} from "./protein-group-report-content";
import {PrecursorReportContentQuery} from "./precursor-report-content";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataReportService {
  baseURL = environment.baseURL.replace("http://", "https://")
  protocol: string = window.location.protocol
  refreshReportSubject: Subject<boolean> = new Subject<boolean>()

  constructor(private http: HttpClient) {
    if (this.protocol === "http:") {
      this.baseURL = environment.baseURL.replace("https://", "http://")
    } else {
      this.baseURL = environment.baseURL.replace("http://", "https://")
    }
  }

  getProteinGroupReport(search: string|undefined|null, limit: number = 10, offset: number = 0, sort: string = "intensity", sortDirection: string = "desc", minIntensity: number|null, maxIntensity: number|null, analysisIds: number[] = [], minPrecursor: number|null, maxPrecursor: number|null, minProtein: number|null, maxProtein: number|null) {
    let params = new HttpParams()
    console.log(search)
    if (search && search !== "") {
      params = params.append("search", search)
    }
    params = params.append("limit", limit)
    params = params.append("offset", offset)
    if (sortDirection === "desc") {
      params = params.append("ordering", `-${sort}`)
    } else {
      params = params.append("ordering", sort)
    }
    if (minIntensity) {
      params = params.append("min_intensity", minIntensity)
    }
    if (maxIntensity) {
      params = params.append("max_intensity", maxIntensity)
    }
    if (analysisIds.length > 0) {
      params = params.append("analysis", analysisIds.join(","))
    }

    if (minPrecursor) {
      params = params.append("min_precursor", minPrecursor)
    }
    if (maxPrecursor) {
      params = params.append("max_precursor", maxPrecursor)
    }
    if (minProtein) {
      params = params.append("min_protein", minProtein)
    }
    if (maxProtein) {
      params = params.append("max_protein", maxProtein)
    }

    return this.http.get<ProteinGroupReportContentQuery>(`${this.baseURL}/api/proteingroup/`, {params: params})
  }

  getPrecursorReport(search: string|undefined|null, limit: number = 10, offset: number = 0, sort: string = "intensity", sortDirection: string = "desc", minIntensity: number|null, maxIntensity: number|null, analysisIds: number[] = [], minPrecursor: number|null, maxPrecursor: number|null, minProtein: number|null, maxProtein: number|null) {
    let params = new HttpParams()
    if (search && search !== "") {
      params = params.append("search", search)
    }
    params = params.append("limit", limit)
    params = params.append("offset", offset)
    if (sortDirection === "desc") {
      params = params.append("ordering", `-${sort}`)
    } else {
      params = params.append("ordering", sort)
    }
    if (minIntensity) {
      params = params.append("min_intensity", minIntensity)
    }
    if (maxIntensity) {
      params = params.append("max_intensity", maxIntensity)
    }
    if (analysisIds.length > 0) {
      params = params.append("analysis", analysisIds.join(","))
    }
    if (minPrecursor) {
      params = params.append("min_precursor", minPrecursor)
    }
    if (maxPrecursor) {
      params = params.append("max_precursor", maxPrecursor)
    }
    if (minProtein) {
      params = params.append("min_protein", minProtein)
    }
    if (maxProtein) {
      params = params.append("max_protein", maxProtein)
    }
    return this.http.get<PrecursorReportContentQuery>(`${this.baseURL}/api/precursor/`, {params: params})
  }
}
