import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LogRecord, LogRecordQuery} from "./log-record";

@Injectable({
  providedIn: 'root'
})
export class LogService {
  protocol: string = window.location.protocol
  baseURL = environment.baseURL.replace("http", this.protocol.slice(0, -1))

  constructor(private http: HttpClient) { }

  getLog(worker_id: number = 0, search: string = "", offset: number = 0, page_size: number = 20) {
    let params: HttpParams = new HttpParams()
    if (worker_id !== 0) {
      params = params.append("worker_id", worker_id.toString())
    }
    if (search !== "") {
      params = params.append("search", search)
    }
    params = params.append("offset", offset.toString())
    params = params.append("page_size", page_size.toString())
    params = params.append("ordering", "-created_at")
    return this.http.get<LogRecordQuery>(this.baseURL + "/api/logrecords/", {params: params})
  }
}
