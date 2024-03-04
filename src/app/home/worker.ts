import {Task} from "../task/task";

export interface Worker {
  id: number;
  worker_hostname: string;
  worker_status: string;
  worker_os: string;
  current_tasks: Task[];
  worker_info: {
    "System": string;
    "Node Name": string;
    "Release": string;
    "Version": string;
    "Machine": string;
    "Processor": string;
    "Physical cores": number;
    "Total cores": number;
    "Total Memory": string;
    "CPU Frequency": string;
  }
}

export interface WorkerQuery {
  next: string|null;
  previous: string|null;
  count: number;
  results: Worker[];
}
