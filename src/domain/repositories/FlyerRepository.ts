import { Flyer } from '../entities/Flyer';

export interface FlyerRepository {
  create(flyer: Flyer): Promise<Flyer>;
  findById(id: string): Promise<Flyer | null>;
  findFileDataById(id: string): Promise<{ fileData: Buffer; fileType: string; fileName: string } | null>;
  update(id: string, data: Partial<Omit<Flyer, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Flyer | null>;
  delete(id: string): Promise<boolean>;
}