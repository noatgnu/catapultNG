export interface Experiment {
 id: number;
 experiment_name: string;
 created_at: Date;
  updated_at: Date;
  vendor: string;
  sample_count: number;
}

export interface ExperimentQuery {
  count: number;
  next: string|null;
  previous: string|null;
  results: Experiment[];
}

export interface VendorChoice {
  value: string;
  vendor: string;
}
