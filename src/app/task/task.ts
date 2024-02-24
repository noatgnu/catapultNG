export interface Task {
  id: number;
  task_id: string;
  created_at: Date;
  updated_at: Date;
  task_name: string;
  user: number;
  status: string;
  analysis: number;
  analysis_params: any;
}

export interface TaskQuery {
  count: number;
  next: string|null;
  previous: string|null;
  results: Task[];
}

