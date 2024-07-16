export interface ExperimentFile {
  id: number;
  file_path: string;
  created_at: Date;
  updated_at: Date;
  folder_watching_location: number;
  ready_for_processing: boolean;
  experiment: number;
  size: number;
  processing: boolean;
}

export interface ExperimentFileQuery {
  count: number;
  next: string|null;
  previous: string|null;
  results: ExperimentFile[];
}
