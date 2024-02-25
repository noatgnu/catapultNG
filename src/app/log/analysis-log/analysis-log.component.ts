import { Component } from '@angular/core';
import {WebsocketService} from "../../websocket.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-analysis-log',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './analysis-log.component.html',
  styleUrl: './analysis-log.component.scss'
})
export class AnalysisLogComponent {
  logMessages: {
    log: string,
    task_id: string,
    hostname: string,
    timestamp: Date
  }[] = []
  constructor(private websocketService: WebsocketService) {
    this.websocketService.connectAnalysisLog().asObservable().subscribe((data: any) => {
      data.timestamp = new Date(data.timestamp*1000)
      this.logMessages = [data].concat(this.logMessages)
    })
  }
}
