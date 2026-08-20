import { Flyer, FlyerProps } from '../../domain/entities/Flyer';
import { FlyerRepository } from '../../domain/repositories/FlyerRepository';
import { FlyerMapper } from '../mappers/FlyerMapper';
import { FlyerDTO } from '../dtos/FlyerDTO';

export class CreateFlyerUseCase {
  constructor(
    private flyerRepository: FlyerRepository,
    private baseUrl: string
  ) {}

  async execute(data: Omit<FlyerProps, 'id' | 'createdAt' | 'updatedAt'>): Promise<FlyerDTO> {
    const flyer = new Flyer(data);
    const created = await this.flyerRepository.create(flyer);
    return FlyerMapper.toDTO(created, this.baseUrl);
  }
}