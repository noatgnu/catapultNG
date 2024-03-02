export interface Worker {
  worker_hostname: string;
  worker_status: string;
  worker_os: string;
}

export interface WorkerQuery {
  next: string|null;
  previous: string|null;
  count: number;
  results: Worker[];
}
