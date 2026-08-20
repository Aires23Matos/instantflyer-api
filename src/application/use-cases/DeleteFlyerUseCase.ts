import { FlyerRepository } from '../../domain/repositories/FlyerRepository';
import { AppError } from '../../shared/errors/AppError';

export class DeleteFlyerUseCase {
  constructor(private flyerRepository: FlyerRepository) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.flyerRepository.delete(id);
    if (!deleted) {
      throw new AppError('Flyer não encontrado', 404);
    }
  }
}