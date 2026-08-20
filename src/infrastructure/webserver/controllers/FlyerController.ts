import { Request, Response, NextFunction } from 'express';
import { CreateFlyerUseCase } from '../../../application/use-cases/CreateFlyerUseCase';
import { GetFlyerUseCase } from '../../../application/use-cases/GetFlyerUseCase';
import { GetFlyerFileUseCase } from '../../../application/use-cases/GetFlyerFileUseCase';
import { UpdateFlyerUseCase } from '../../../application/use-cases/UpdateFlyerUseCase';
import { DeleteFlyerUseCase } from '../../../application/use-cases/DeleteFlyerUseCase';
import { AppError } from '../../../shared/errors/AppError';

export class FlyerController {
  constructor(
    private createFlyer: CreateFlyerUseCase,
    private getFlyer: GetFlyerUseCase,
    private getFlyerFile: GetFlyerFileUseCase,
    private updateFlyer: UpdateFlyerUseCase,
    private deleteFlyer: DeleteFlyerUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, notificationDays } = req.body;
      const file = req.file;
      if (!file) throw new AppError('Arquivo é obrigatório', 400);

      // parse notificationDays (JSON string)
      let days: number[] | undefined = undefined;
      if (notificationDays) {
        try {
          days = JSON.parse(notificationDays);
          if (!Array.isArray(days) || !days.every(d => Number.isInteger(d))) {
            throw new Error();
          }
        } catch {
          throw new AppError('notificationDays deve ser um array JSON de números', 400);
        }
      }

      const flyerDTO = await this.createFlyer.execute({
        title,
        description: description || null,
        fileName: file.originalname,
        fileType: file.mimetype.startsWith('image/') ? 'image' : 'pdf',
        fileData: file.buffer,
        notificationDays: days || null,
      });

      res.status(201).json(flyerDTO);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const flyer = await this.getFlyer.execute(id);
      res.json(flyer);
    } catch (error) {
      next(error);
    }
  }

  async getFile(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { fileData, fileType, fileName } = await this.getFlyerFile.execute(id);
      const contentType = fileType === 'pdf' ? 'application/pdf' : 'image/jpeg';
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.send(fileData);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title, description, notificationDays } = req.body;
      const file = req.file;

      let days: number[] | null | undefined = undefined;
      if (notificationDays !== undefined) {
        if (notificationDays === null || notificationDays === 'null') {
          days = null;
        } else {
          try {
            const parsed = JSON.parse(notificationDays);
            if (!Array.isArray(parsed) || !parsed.every(d => Number.isInteger(d))) {
              throw new Error();
            }
            days = parsed;
          } catch {
            throw new AppError('notificationDays deve ser um array JSON de números ou null', 400);
          }
        }
      }

      const updateData: any = {};
      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description || null;
      if (file) {
        updateData.fileName = file.originalname;
        updateData.fileType = file.mimetype.startsWith('image/') ? 'image' : 'pdf';
        updateData.fileData = file.buffer;
      }
      if (days !== undefined) updateData.notificationDays = days;

      const flyerDTO = await this.updateFlyer.execute(id, updateData);
      res.json(flyerDTO);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.deleteFlyer.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}