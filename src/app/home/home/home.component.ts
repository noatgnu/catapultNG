import { Component } from '@angular/core';
import {ExperimentService} from "../../experiment/experiment.service";
import {AnalysisService} from "../../analysis/analysis.service";
import {TaskService} from "../../task/task.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  n_experiments: number = 0;
  n_analyses: number = 0;
  n_tasks: number = 0;
  constructor(private experimentService: ExperimentService, private analysisService: AnalysisService, private taskService: TaskService) {
    this.experimentService.getExperiments().subscribe((data) => {
      this.n_experiments = data.count;
    });
    this.analysisService.getAnalyses().subscribe((data) => {
      this.n_analyses = data.count;
    });
    this.taskService.getTasks().subscribe((data) => {
      this.n_tasks = data.count;
    });
  }
}
