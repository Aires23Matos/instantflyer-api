export interface UpdateFlyerRequest {
  title?: string;
  description?: string | null;
  fileName?: string;
  fileType?: 'pdf' | 'image';
  fileData?: Buffer;
  notificationDays?: number[] | null;
}