import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Analysis, AnalysisQuery, AnalysisType} from "./analysis";
import { Task } from '../task/task';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  baseURL = environment.baseURL

  constructor(private http: HttpClient) { }

  getAnalyses(url?: string): Observable<AnalysisQuery> {
    if (url) {
      return this.http.get<AnalysisQuery>(url, {observe: "body", responseType: "json"})
    }
    const params: any = {
      "ordering": "-id"
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

  createAnalysis(analysis_name: string, experiment: number, analysis_type: string, fasta_file: string, spectral_library: string): Observable<Analysis> {
    return this.http.post<Analysis>(`${this.baseURL}/api/analyses`, {
      analysis_name:analysis_name, experiment: experiment, analysis_type: analysis_type, fasta_file: fasta_file, spectral_library: spectral_library},
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
}
