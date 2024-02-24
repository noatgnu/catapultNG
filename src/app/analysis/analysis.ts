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
  end_time: Date;
  log: string;
  fasta_file: string;
  spectral_library: string;
  commands: string;
  output_folder: string;
  default_analysis: boolean;
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
