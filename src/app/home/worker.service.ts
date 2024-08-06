import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Worker, WorkerQuery} from "./worker";

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  protocol: string = window.location.protocol
  baseURL = environment.baseURL.replace("http://", "https://")
  constructor(private http: HttpClient) {
    if (this.protocol === "http:") {
      this.baseURL = environment.baseURL.replace("https://", "http://")
    } else {
      this.baseURL = environment.baseURL.replace("http://", "https://")
    }
  }

  getWorkers(url?: string) {
    return this.http.get<WorkerQuery>(url ? url : this.baseURL + "/api/workers")
  }

}
