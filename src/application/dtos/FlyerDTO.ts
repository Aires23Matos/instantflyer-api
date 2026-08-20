export interface FlyerDTO {
  id: string;
  title: string;
  description: string | null;
  fileName: string;
  fileType: 'pdf' | 'image';
  notificationDays: number[] | null;
  fileUrl: string; // caminho para download
  createdAt: Date;
  updatedAt: Date;
}