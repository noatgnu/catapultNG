import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
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
export class AnalysisLogComponent implements AfterViewInit{
  @ViewChild('logContainer') logContainer: ElementRef | undefined;

  logMessages: {
    log: string,
    task_id: string,
    hostname: string,
    timestamp: Date
  }[] = []
  constructor(private websocketService: WebsocketService) {

    this.websocketService.connectAnalysisLog().asObservable().subscribe((data: any) => {
      data.timestamp = new Date(data.timestamp*1000)

      this.logMessages.push(data)
      if (this.logContainer) {
        this.logContainer.nativeElement.scrollTop = this.logContainer.nativeElement.scrollHeight
      }
    })
  }

  ngAfterViewInit() {
    /*for (let i = 0; i < 100; i++) {
      this.logMessages.push({
        log: "test",
        task_id: "test",
        hostname: "test",
        timestamp: new Date()
      })

    }
    if (this.logContainer) {
      this.logContainer.nativeElement.scrollTop = this.logContainer.nativeElement.scrollHeight
    }*/
  }
}
