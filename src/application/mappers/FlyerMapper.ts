import { Flyer } from '../../domain/entities/Flyer';
import { FlyerDTO } from '../dtos/FlyerDTO';

export class FlyerMapper {
  static toDTO(flyer: Flyer, baseUrl: string): FlyerDTO {
    return {
      id: flyer.id!,
      title: flyer.title,
      description: flyer.description,
      fileName: flyer.fileName,
      fileType: flyer.fileType,
      notificationDays: flyer.notificationDays,
      fileUrl: `/api/flyers/${flyer.id}/file`,
      createdAt: flyer.createdAt!,
      updatedAt: flyer.updatedAt!,
    };
  }
}