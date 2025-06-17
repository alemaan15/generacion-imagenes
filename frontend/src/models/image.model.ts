export interface ImageStatus {
  status: 'processing' | 'completed' | 'failed';
  url?: string;
}

export interface GenerateResponse {
  taskId: string;
}