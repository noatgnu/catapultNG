import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  notificationConnection?: WebSocketSubject<any>
  analysisLogConnection?: WebSocketSubject<any>
  personalID: string = crypto.randomUUID()
  connectingNotificationChannel: boolean = false
  connectingAnalysisLogChannel: boolean = false
  protocol: string = window.location.protocol
  baseURL = environment.baseURL.replace("http", this.protocol.slice(0, -1)).replace("http", "ws")

  constructor() { }

  connectNotification(): WebSocketSubject<any> {
    this.connectingNotificationChannel = true
    if (!this.notificationConnection) {
      this.notificationConnection = new WebSocketSubject({
        url: `${this.baseURL}/ws/notification/alert/${this.personalID}/`,
        openObserver: {
          next: () => {
            console.log("Connected to notification channel")
          }
        },
        closeObserver: {
          next: () => {
            console.log("Closed connection to notification channel")
          }
        }
      })
      this.connectingNotificationChannel = false
      return this.notificationConnection
    } else {
      this.connectingNotificationChannel = false
      return this.notificationConnection
    }
  }

  connectAnalysisLog(): WebSocketSubject<any> {
    this.connectingAnalysisLogChannel = true
    if (!this.analysisLogConnection) {
      this.analysisLogConnection = new WebSocketSubject({
        url: `${this.baseURL}/ws/log/analysis_log/`,
        openObserver: {
          next: () => {
            console.log("Connected to analysis log channel")
          }
        },
        closeObserver: {
          next: () => {
            console.log("Closed connection to analysis log channel")
          }
        }
      })
      this.connectingAnalysisLogChannel = false
      return this.analysisLogConnection
    } else {
      this.connectingAnalysisLogChannel = false
      return this.analysisLogConnection
    }
  }

  disconnectNotification() {
    this.notificationConnection?.complete()
    this.notificationConnection = undefined
  }

  disconnectAnalysisLog() {
    this.analysisLogConnection?.complete()
    this.analysisLogConnection = undefined
  }
}
