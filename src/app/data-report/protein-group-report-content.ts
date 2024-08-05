import {Analysis} from "../analysis/analysis";
import {ExperimentFile} from "../experiment/experiment-file";

export interface ProteinGroupReportContent {
  id: number;
  gene_names: string;
  protein_group: string;
  result_summary: number;
  intensity: number;
  analysis: Analysis;
  file: ExperimentFile;
}

export interface ProteinGroupReportContentQuery {
  count: number;
  next: string|null;
  previous: string|null;
  results: ProteinGroupReportContent[];
}
