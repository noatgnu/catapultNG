import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  token: string = ""
  loggedIn: boolean = false
  protocol: string = window.location.protocol
  baseURL = environment.baseURL.replace("http://", "https://")
  constructor(private http: HttpClient) {
    if (this.protocol === "http:") {
      this.baseURL = environment.baseURL.replace("https://", "http://")
    } else {
      this.baseURL = environment.baseURL.replace("http://", "https://")
    }
  }

  login(username: string, password: string) {
    this.loggedIn = false
    const headers = new HttpHeaders()
    headers.append("Content-Type", "application/json")
    headers.append("Accept", "application/json")
    return this.http.post(`${this.baseURL}/api-token-auth/`, {username: username, password: password}, {headers: headers})
  }

  saveToken(username: string, token: string) {
    this.token = token
    localStorage.setItem("catapult-login-token", token)
    localStorage.setItem("catapult-login-username", username)
  }

  logout() {
    this.token = ""
    this.loggedIn = false
    localStorage.removeItem("catapult-login-token")
    localStorage.removeItem("catapult-login-username")
  }

  loadToken() {
    this.token = localStorage.getItem("catapult-login-token") || ""
    console.log(this.token)
    const username = localStorage.getItem("catapult-login-username")
    if (this.token && username) {
      this.loggedIn = true
    }
  }
}
