import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {ExperimentService} from "../../experiment/experiment.service";
import {AnalysisService} from "../../analysis/analysis.service";
import {TaskService} from "../../task/task.service";
import {WorkerQuery} from "../worker";
import {WorkerService} from "../worker.service";
import {WebsocketService} from "../../websocket.service";
import {DatePipe, NgClass} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgClass,
    DatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {
  n_experiments: number = 0;
  n_analyses: number = 0;
  n_tasks: number = 0;
  workerQuery?: WorkerQuery;
  selectedWorker?: string;
  @ViewChild('logContainer') logContainer: ElementRef | undefined;

  logMessages: {
    log: string,
    task_id: string,
    hostname: string,
    timestamp: Date
  }[] = []

  constructor(private websocketService: WebsocketService, private experimentService: ExperimentService, private analysisService: AnalysisService, private taskService: TaskService, private workerService: WorkerService) {
    this.getData()
    this.websocketService.connectAnalysisLog().asObservable().subscribe((data: any) => {
      data.timestamp = new Date(data.timestamp*1000)
      if (data.hostname === this.selectedWorker) {
        this.logMessages.push(data)
        if (this.logMessages.length > 100) {
          this.logMessages = this.logMessages.slice(1)
        }
        if (this.logContainer) {
          this.logContainer.nativeElement.scrollTop = this.logContainer.nativeElement.scrollHeight
        }
      } else {
        if (data.task_id === "general") {
          this.logMessages.push(data)
          if (this.logMessages.length > 100) {
            this.logMessages = this.logMessages.slice(1)
          }
          if (this.logContainer) {
            this.logContainer.nativeElement.scrollTop = this.logContainer.nativeElement.scrollHeight
          }
        }
      }
    })
    this.websocketService.connectNotification().asObservable().subscribe((data: any) => {
      this.getData()
    })
  }

  ngOnDestroy() {
    this.websocketService.disconnectAnalysisLog()
  }

  getData() {
    this.experimentService.getExperiments().subscribe((data) => {
      this.n_experiments = data.count;
    });
    this.analysisService.getAnalyses().subscribe((data) => {
      this.n_analyses = data.count;
    });
    this.taskService.getTasks().subscribe((data) => {
      this.n_tasks = data.count;
    });
    this.workerService.getWorkers().subscribe((data) => {
      this.workerQuery = data;
    })
  }

  clickWorkerRow(worker_hostname: string) {
    if (this.selectedWorker === worker_hostname) {
      this.selectedWorker = undefined
    } else {
      this.selectedWorker = worker_hostname
    }
    console.log(this.selectedWorker)
  }
}
