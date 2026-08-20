import { FlyerRepository } from '../../domain/repositories/FlyerRepository';
import { FlyerMapper } from '../mappers/FlyerMapper';
import { FlyerDTO } from '../dtos/FlyerDTO';
import { AppError } from '../../shared/errors/AppError';

export class GetFlyerUseCase {
  constructor(
    private flyerRepository: FlyerRepository,
    private baseUrl: string
  ) {}

  async execute(id: string): Promise<FlyerDTO> {
    const flyer = await this.flyerRepository.findById(id);
    if (!flyer) {
      throw new AppError('Flyer não encontrado', 404);
    }
    return FlyerMapper.toDTO(flyer, this.baseUrl);
  }
}