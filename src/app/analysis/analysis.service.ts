import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Analysis, AnalysisQuery, AnalysisType} from "./analysis";
import { Task } from '../task/task';
import {environment} from "../../environments/environment";
import {ResultSummary} from "../data-report/result-summary";

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  protocol: string = window.location.protocol
  baseURL = environment.baseURL.replace("http", this.protocol.slice(0, -1))

  constructor(private http: HttpClient) { }

  getAnalyses(url?: string, minPrecursor: number|null = null, maxPrecursor: number|null = null, minProtein: number|null = null, maxProtein: number|null = null, configSearchObject: any|null = null): Observable<AnalysisQuery> {
    if (url) {
      return this.http.get<AnalysisQuery>(url, {observe: "body", responseType: "json"})
    }
    let params: HttpParams = new HttpParams()
    params = params.append("ordering", "-id")
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
    if (configSearchObject) {
      for (const key in configSearchObject) {
        if (configSearchObject.hasOwnProperty(key)) {
          if (configSearchObject[key] === null) {
            continue
          }
          if (typeof configSearchObject[key] === "boolean") {
            params = params.append(key, configSearchObject[key] ? "True" : "False")
          } else if (typeof configSearchObject[key] === "string") {
            params = params.append(key, configSearchObject[key])
          } else if (typeof configSearchObject[key] === "number") {
            params = params.append(key, configSearchObject[key].toString())
          } else if (Array.isArray(configSearchObject[key])) {
            if (configSearchObject[key].length === 0) {
              continue
            }
            params = params.append(key, configSearchObject[key].join(","))
          } else {
            params = params.append(key, configSearchObject[key])
          }
        }
      }
    }
    return this.http.get<AnalysisQuery>(`${this.baseURL}/api/analyses`, {observe: "body", responseType: "json", params: params})
  }

  getAnalysis(id: number): Observable<Analysis> {
    return this.http.get<Analysis>(`${this.baseURL}/api/analyses/${id}/`, {observe: "body", responseType: "json"})
  }

  getAnalysisType(): Observable<AnalysisType[]> {
    return this.http.get<AnalysisType[]>(`${this.baseURL}/api/analyses/get_analysis_types`, {observe: "body", responseType: "json"})
  }

  updateAnalysis(id: number, data: Analysis): Observable<Analysis> {
    return this.http.patch<Analysis>(`${this.baseURL}/api/analyses/${id}/`, data, {observe: "body", responseType: "json"})
  }

  deleteAnalysis(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/api/analyses/${id}/`, {observe: "body", responseType: "json"})
  }

  createAnalysis(analysis_path: string, experiment: number, analysis_type: string, fasta_file: string, spectral_library: string): Observable<Analysis> {
    return this.http.post<Analysis>(`${this.baseURL}/api/analyses`, {
      analysis_path:analysis_path, experiment: experiment, analysis_type: analysis_type, fasta_file: fasta_file, spectral_library: spectral_library},
      {observe: "body", responseType: "json"})
  }

  searchAnalyses(search: string): Observable<AnalysisQuery> {
    const params: any = {
      "search": search
    }
    return this.http.get<AnalysisQuery>(`${this.baseURL}/api/analyses`, {observe: "body", responseType: "json", params: params})
  }

  getAssociatedTasks(analysis_id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseURL}/api/analyses/${analysis_id}/get_associated_tasks`, {observe: "body", responseType: "json"})
  }

  queueAnalysis(analysis_id: number): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/api/analyses/${analysis_id}/queue_analysis/`, {observe: "body", responseType: "json"})
  }

  getResultSummaries(analysis_id: number): Observable<any> {
    return this.http.get<ResultSummary>(`${this.baseURL}/api/analyses/${analysis_id}/get_result_summaries/`, {observe: "body", responseType: "json"})
  }
}
