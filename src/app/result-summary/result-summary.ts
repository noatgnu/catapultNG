import {Analysis} from "../analysis/analysis";
import {ExperimentFile} from "../experiment/experiment-file";

export interface ResultSummary {
  id: number;
  created_at: Date;
  updated_at: Date;
  analysis: Analysis;
  file: ExperimentFile;
  protein_identified: number;
  precursor_identified: number;
}

export interface ResultSummaryQuery {
  count: number;
  next: string|null;
  previous: string|null;
  results: ResultSummary[];
}
