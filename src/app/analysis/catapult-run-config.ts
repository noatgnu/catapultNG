export interface CatapultRunConfig {
  id: number;
  created_at: Date;
  updated_at: Date;
  config_file_path: string;
  content: any;
  fasta_ready: boolean;
  fasta_required: boolean;
  spectral_library_ready: boolean;
  spectral_library_required: boolean;
}

export interface CatapultRunConfigQuery {
  count: number;
  next: string|null;
  previous: string|null;
  results: CatapultRunConfig[];
}
