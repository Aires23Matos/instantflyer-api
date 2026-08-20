import { FlyerRepository } from '../../domain/repositories/FlyerRepository';
import { AppError } from '../../shared/errors/AppError';

export class GetFlyerFileUseCase {
  constructor(private flyerRepository: FlyerRepository) {}

  async execute(id: string): Promise<{ fileData: Buffer; fileType: string; fileName: string }> {
    const fileInfo = await this.flyerRepository.findFileDataById(id);
    if (!fileInfo) {
      throw new AppError('Arquivo não encontrado', 404);
    }
    return fileInfo;
  }
}