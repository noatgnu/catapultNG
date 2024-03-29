import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Experiment, ExperimentQuery, VendorChoice} from "./experiment";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {
  baseURL = environment.baseURL

  constructor(private http: HttpClient) { }

  getExperiments(url?: string): Observable<ExperimentQuery> {
    if (url) {
      return this.http.get<ExperimentQuery>(url, {observe: "body", responseType: "json"})
    }
    const params: any = {
      "ordering": "-id"
    }
    return this.http.get<ExperimentQuery>(`${this.baseURL}/api/experiments`, {observe: "body", responseType: "json", params: params})
  }

  getExperiment(id: number): Observable<Experiment> {
    return this.http.get<Experiment>(`${this.baseURL}/api/experiments/${id}/`, {observe: "body", responseType: "json"})
  }

  getVendorChoices(): Observable<VendorChoice[]> {
    return this.http.get<VendorChoice[]>(`${this.baseURL}/api/experiments/get_vendor_choices`, {observe: "body", responseType: "json"})
  }

  updateExperiment(id: number, data: Experiment): Observable<Experiment> {
    return this.http.patch<Experiment>(`${this.baseURL}/api/experiments/${id}/`, data, {observe: "body", responseType: "json"})
  }

  deleteExperiment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/api/experiments/${id}/`, {observe: "body", responseType: "json"})
  }

  createExperiment(experiment: string, vendor: string, sample_count: number): Observable<Experiment> {
    return this.http.post<Experiment>(`${this.baseURL}/api/experiments`, {experiment_name: experiment, vendor: vendor, sample_count: sample_count}, {observe: "body", responseType: "json"})
  }

  searchExperiments(query: string): Observable<ExperimentQuery> {
    return this.http.get<ExperimentQuery>(`${this.baseURL}/api/experiments?search=${query}`, {observe: "body", responseType: "json"})
  }
}
