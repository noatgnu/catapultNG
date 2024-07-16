export interface LogRecord {
  id: number;
  created_at: Date;
  updated_at: Date;
  log: string;
  task: number;
}

export interface LogRecordQuery {
  count: number;
  next: string|null;
  previous: string|null;
  results: LogRecord[];
}
