import { Flyer } from '../../../domain/entities/Flyer';
import { FlyerRepository } from '../../../domain/repositories/FlyerRepository';
import { db } from '../config/knex';

export class PostgreSQLFlyerRepository implements FlyerRepository {
  private table = 'flyers';

  async create(flyer: Flyer): Promise<Flyer> {
    const [id] = await db(this.table).insert({
      id: flyer.id ?? db.raw('gen_random_uuid()'), // se não fornecido, gera UUID
      title: flyer.title,
      description: flyer.description,
      file_name: flyer.fileName,
      file_type: flyer.fileType,
      file_data: flyer.fileData,
      notification_days: flyer.notificationDays ? JSON.stringify(flyer.notificationDays) : null,
      created_at: db.fn.now(),
      updated_at: db.fn.now(),
    }).returning('id');

    const created = await this.findById(id);
    if (!created) throw new Error('Falha ao criar flyer');
    return created;
  }

  async findById(id: string): Promise<Flyer | null> {
    const row = await db(this.table).where({ id }).first();
    if (!row) return null;
    return this.toEntity(row);
  }

  async findFileDataById(id: string): Promise<{ fileData: Buffer; fileType: string; fileName: string } | null> {
    const row = await db(this.table).where({ id }).select('file_data', 'file_type', 'file_name').first();
    if (!row) return null;
    return {
      fileData: row.file_data,
      fileType: row.file_type,
      fileName: row.file_name,
    };
  }

  async update(id: string, data: Partial<Omit<Flyer, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Flyer | null> {
    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.fileName !== undefined) updateData.file_name = data.fileName;
    if (data.fileType !== undefined) updateData.file_type = data.fileType;
    if (data.fileData !== undefined) updateData.file_data = data.fileData;
    if (data.notificationDays !== undefined) {
      updateData.notification_days = data.notificationDays ? JSON.stringify(data.notificationDays) : null;
    }
    updateData.updated_at = db.fn.now();

    await db(this.table).where({ id }).update(updateData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await db(this.table).where({ id }).del();
    return deleted > 0;
  }

  private toEntity(row: any): Flyer {
    return new Flyer({
      id: row.id,
      title: row.title,
      description: row.description,
      fileName: row.file_name,
      fileType: row.file_type,
      fileData: row.file_data,
      notificationDays: row.notification_days ? JSON.parse(row.notification_days) : null,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }
}