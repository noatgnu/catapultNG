import {Analysis} from "../analysis/analysis";
import {ExperimentFile} from "../experiment/experiment-file";

export interface PrecursorReportContent {
  id: number;
  gene_names: string;
  protein_group: string;
  precursor_id: string;
  proteotypic: boolean;
  intensity: number;
  result_summary: number;
  analysis: Analysis;
  file: ExperimentFile;
}

export interface PrecursorReportContentQuery {
  count: number;
  next: string|null;
  previous: string|null;
  results: PrecursorReportContent[];
}
