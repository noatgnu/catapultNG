import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task, TaskQuery} from "./task";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseURL = environment.baseURL

  constructor(private http: HttpClient) { }

  getTasks(url?: string): Observable<TaskQuery> {
    if (url) {
      return this.http.get<TaskQuery>(url, {observe: "body", responseType: "json"})
    }
    const params: any = {
      "ordering": "-id"
    }
    return this.http.get<TaskQuery>(`${this.baseURL}/api/tasks`, {observe: "body", responseType: "json", params: params})
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseURL}/api/tasks/${id}/`, {observe: "body", responseType: "json"})
  }

  updateTask(id: number, data: Task): Observable<Task> {
    return this.http.patch<Task>(`${this.baseURL}/api/tasks/${id}/`, data, {observe: "body", responseType: "json"})
  }

  searchTasks(query: string): Observable<TaskQuery> {
    return this.http.get<TaskQuery>(`${this.baseURL}/api/tasks?search=${query}`, {observe: "body", responseType: "json"})
  }
}
