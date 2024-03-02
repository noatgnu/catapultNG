import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Worker, WorkerQuery} from "./worker";

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  baseURL = environment.baseURL
  constructor(private http: HttpClient) { }

  getWorkers(url?: string) {
    return this.http.get<WorkerQuery>(url ? url : this.baseURL + "/api/workers")
  }

}
