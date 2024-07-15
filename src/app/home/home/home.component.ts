import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {ExperimentService} from "../../experiment/experiment.service";
import {AnalysisService} from "../../analysis/analysis.service";
import {TaskService} from "../../task/task.service";
import {WorkerQuery} from "../worker";
import {WorkerService} from "../worker.service";
import {WebsocketService} from "../../websocket.service";
import {DatePipe, NgClass} from "@angular/common";
import {Experiment, ExperimentQuery} from "../../experiment/experiment";
import {Analysis, AnalysisQuery} from "../../analysis/analysis";
import {TaskQuery} from "../../task/task";
import {environment} from "../../../environments/environment";
import {forkJoin} from "rxjs";
import {ToastService} from "../../toast.service";

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
  experimentQuery?: ExperimentQuery;
  analysisQuery?: AnalysisQuery;
  taskQuery?: TaskQuery;
  baseURL = environment.baseURL
  selectedTask?: number;

  workerQuery?: WorkerQuery;
  selectedWorker?: string;
  workerInfo?: any;

  @ViewChild('logContainer') logContainer: ElementRef | undefined;
  experiment?: Experiment;
  analysis?: Analysis;

  logMessages: {
    log: string,
    task_id: string,
    hostname: string,
    timestamp: Date
  }[] = []

  constructor(private toastService: ToastService, private websocketService: WebsocketService, private experimentService: ExperimentService, private analysisService: AnalysisService, private taskService: TaskService, private workerService: WorkerService) {
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
      this.toastService.show(data["task_id"], data["status"])
      this.getData()
    })
  }

  ngOnDestroy() {
    this.websocketService.disconnectAnalysisLog()
  }

  getData() {
    this.experimentService.getExperiments().subscribe((data) => {
      this.n_experiments = data.count;
      this.experimentQuery = data;
    });
    this.analysisService.getAnalyses().subscribe((data) => {
      this.n_analyses = data.count;
      this.analysisQuery = data;
    });
    this.taskService.getTasks().subscribe((data) => {
      this.n_tasks = data.count;
      this.taskQuery = data;
    });
    this.workerService.getWorkers().subscribe((data) => {
      this.workerQuery = data;
    })
  }

  clickWorkerRow(worker_hostname: string) {
    if (this.selectedWorker === worker_hostname) {
      this.selectedWorker = undefined
      this.workerInfo = undefined
    } else {
      this.selectedWorker = worker_hostname
      this.workerInfo = this.workerQuery?.results.find((worker) => worker.worker_hostname === worker_hostname)?.worker_info
    }
    console.log(this.workerInfo)
    console.log(this.selectedWorker)
  }

  handleTaskClick(task_id: number) {
    if (this.selectedTask === task_id) {
      this.selectedTask = undefined
      this.experiment = undefined
      this.analysis = undefined
    } else {
      this.selectedTask = task_id
    }
    forkJoin([this.taskService.getAnalysis(task_id), this.taskService.getExperiment(task_id)]).subscribe((data) => {
      this.experiment = data[1]
      this.analysis = data[0]
    })
  }
}
