import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  notificationConnection?: WebSocketSubject<any>
  analysisLogConnection?: WebSocketSubject<any>
  personalID: string = crypto.randomUUID()
  connectingNotificationChannel: boolean = false
  connectingAnalysisLogChannel: boolean = false

  constructor() { }

  connectNotification(): WebSocketSubject<any> {
    this.connectingNotificationChannel = true
    if (!this.notificationConnection) {
      this.notificationConnection = new WebSocketSubject({
        url: `ws://localhost/ws/notification/alert/${this.personalID}/`,
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
        url: `ws://localhost/ws/log/analysis_log/`,
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
}
