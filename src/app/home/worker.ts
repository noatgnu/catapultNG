import {Task} from "../task/task";

export interface Worker {
  id: number;
  worker_hostname: string;
  worker_status: string;
  worker_os: string;
  current_tasks: Task[];
}

export interface WorkerQuery {
  next: string|null;
  previous: string|null;
  count: number;
  results: Worker[];
}
