export interface FlyerProps {
  id?: string;
  title: string;
  description: string | null;
  fileName: string;
  fileType: 'pdf' | 'image';
  fileData: Buffer;
  notificationDays: number[] | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Flyer {
  public readonly id?: string;
  public readonly title: string;
  public readonly description: string | null;
  public readonly fileName: string;
  public readonly fileType: 'pdf' | 'image';
  public readonly fileData: Buffer;
  public readonly notificationDays: number[] | null;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: FlyerProps) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description ?? null;
    this.fileName = props.fileName;
    this.fileType = props.fileType;
    this.fileData = props.fileData;
    this.notificationDays = props.notificationDays ?? null;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}