import {ExperimentFile} from "../experiment/experiment-file";

export interface Analysis {
  id: number;
  analysis_name: string;
  experiment: number;
  analysis_type: string;
  created_at: Date;
  updated_at: Date;
  processing: boolean;
  completed: boolean;
  start_time: Date;
  stop_time: Date;
  log: string;
  commands: string;
  output_folder: string;
  default_analysis: boolean;
  generating_quant: ExperimentFile[];
  generated_quant: ExperimentFile[];
  config: number;
  total_files: number;
}

export interface AnalysisQuery {
  count: number;
  next: string|null;
  previous: string|null;
  results: Analysis[];
}

export interface AnalysisType {
  value: string;
  analysis_type: string;
}
