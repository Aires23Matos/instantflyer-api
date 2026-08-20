import { FlyerRepository } from '../../domain/repositories/FlyerRepository';
import { FlyerMapper } from '../mappers/FlyerMapper';
import { FlyerDTO } from '../dtos/FlyerDTO';
import { AppError } from '../../shared/errors/AppError';

interface UpdateData {
  title?: string;
  description?: string | null;
  fileName?: string;
  fileType?: 'pdf' | 'image';
  fileData?: Buffer;
  notificationDays?: number[] | null;
}

export class UpdateFlyerUseCase {
  constructor(
    private flyerRepository: FlyerRepository,
    private baseUrl: string
  ) {}

  async execute(id: string, data: UpdateData): Promise<FlyerDTO> {
    const existing = await this.flyerRepository.findById(id);
    if (!existing) {
      throw new AppError('Flyer não encontrado', 404);
    }

    const updated = await this.flyerRepository.update(id, data);
    if (!updated) {
      throw new AppError('Erro ao atualizar flyer', 500);
    }

    return FlyerMapper.toDTO(updated, this.baseUrl);
  }
}