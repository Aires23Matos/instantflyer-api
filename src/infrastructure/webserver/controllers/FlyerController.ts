import { Request, Response, NextFunction } from "express";
import { CreateFlyerUseCase } from "../../../application/use-cases/CreateFlyerUseCase";
import { GetFlyerUseCase } from "../../../application/use-cases/GetFlyerUseCase";
import { GetFlyerFileUseCase } from "../../../application/use-cases/GetFlyerFileUseCase";
import { UpdateFlyerUseCase } from "../../../application/use-cases/UpdateFlyerUseCase";
import { DeleteFlyerUseCase } from "../../../application/use-cases/DeleteFlyerUseCase";
import { AppError } from "../../../shared/errors/AppError";

export class FlyerController {
  constructor(
    private createFlyer: CreateFlyerUseCase,
    private getFlyer: GetFlyerUseCase,
    private getFlyerFile: GetFlyerFileUseCase,
    private updateFlyer: UpdateFlyerUseCase,
    private deleteFlyer: DeleteFlyerUseCase,
  ) {}

  /**
   * Helper para extrair o ID dos parâmetros da rota
   * Garante que o ID seja uma string, lançando erro se for um array ou não existir
   */
  private extractId(params: any): string {
    const id = params.id;
    if (!id) throw new AppError("ID não fornecido", 400);
    if (Array.isArray(id)) {
      if (id.length === 0) throw new AppError("ID vazio", 400);
      return id[0]; // pega o primeiro se for array
    }
    return id;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, notificationDays } = req.body;
      const file = req.file;
      if (!file) {
        throw new AppError("Arquivo é obrigatório", 400);
      }

      // Valida e converte notificationDays
      let days: number[] | null = null;
      if (
        notificationDays !== undefined &&
        notificationDays !== null &&
        notificationDays !== ""
      ) {
        try {
          const parsed =
            typeof notificationDays === "string"
              ? JSON.parse(notificationDays)
              : notificationDays;
          if (
            !Array.isArray(parsed) ||
            !parsed.every((d: any) => Number.isInteger(d) && d >= 0)
          ) {
            throw new Error("Formato inválido");
          }
          days = parsed;
        } catch {
          throw new AppError(
            "notificationDays deve ser um array JSON de números inteiros não negativos",
            400,
          );
        }
      }

      const flyerDTO = await this.createFlyer.execute({
        title,
        description: description || null,
        fileName: file.originalname,
        fileType: file.mimetype.startsWith("image/") ? "image" : "pdf",
        fileData: file.buffer,
        notificationDays: days,
      });

      res.status(201).json(flyerDTO);

      console.log("Arquivo recebido:", {
        originalname: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        hasBuffer: !!file.buffer,
        bufferLength: file.buffer?.length || 0,
      });
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = this.extractId(req.params);
      const flyer = await this.getFlyer.execute(id);
      res.json(flyer);
    } catch (error) {
      next(error);
    }
  }

  async getFile(req: Request, res: Response, next: NextFunction) {
    try {
      const id = this.extractId(req.params);
      const { fileData, fileType, fileName } =
        await this.getFlyerFile.execute(id);
      const contentType = fileType === "pdf" ? "application/pdf" : "image/jpeg";
      res.setHeader("Content-Type", contentType);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${fileName}"`,
      );
      res.send(fileData);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = this.extractId(req.params);
      const { title, description, notificationDays } = req.body;
      const file = req.file;

      // Monta objeto de atualização
      const updateData: any = {};
      if (title !== undefined) updateData.title = title;
      if (description !== undefined)
        updateData.description = description || null;

      if (file) {
        updateData.fileName = file.originalname;
        updateData.fileType = file.mimetype.startsWith("image/")
          ? "image"
          : "pdf";
        updateData.fileData = file.buffer;
      }

      // Trata notificationDays: pode ser null, array ou undefined (não alterar)
      if (notificationDays !== undefined) {
        if (
          notificationDays === null ||
          notificationDays === "null" ||
          notificationDays === ""
        ) {
          updateData.notificationDays = null;
        } else {
          try {
            const parsed =
              typeof notificationDays === "string"
                ? JSON.parse(notificationDays)
                : notificationDays;
            if (
              !Array.isArray(parsed) ||
              !parsed.every((d: any) => Number.isInteger(d) && d >= 0)
            ) {
              throw new Error("Formato inválido");
            }
            updateData.notificationDays = parsed;
          } catch {
            throw new AppError(
              "notificationDays deve ser um array JSON de números inteiros não negativos ou null",
              400,
            );
          }
        }
      }

      const flyerDTO = await this.updateFlyer.execute(id, updateData);
      res.json(flyerDTO);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = this.extractId(req.params);
      await this.deleteFlyer.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
