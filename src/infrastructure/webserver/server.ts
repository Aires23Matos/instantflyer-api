import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import { createFlyerRoutes } from './routes/flyerRoutes';
import { FlyerController } from './controllers/FlyerController';
// import use cases e repositories conforme a configuração

import { MySQLFlyerRepository } from '../database/repositories/MySQLFlyerRepository';
import { CreateFlyerUseCase } from '../../application/use-cases/CreateFlyerUseCase';
import { GetFlyerUseCase } from '../../application/use-cases/GetFlyerUseCase';
import { GetFlyerFileUseCase } from '../../application/use-cases/GetFlyerFileUseCase';
import { UpdateFlyerUseCase } from '../../application/use-cases/UpdateFlyerUseCase';
import { DeleteFlyerUseCase } from '../../application/use-cases/DeleteFlyerUseCase';

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do banco de dados via variável de ambiente
const repository = new MySQLFlyerRepository(); // ou PostgreSQLFlyerRepository
const baseUrl = process.env.BASE_URL || 'http://localhost:3010';

// Instanciar use cases
const createFlyer = new CreateFlyerUseCase(repository, baseUrl);
const getFlyer = new GetFlyerUseCase(repository, baseUrl);
const getFlyerFile = new GetFlyerFileUseCase(repository);
const updateFlyer = new UpdateFlyerUseCase(repository, baseUrl);
const deleteFlyer = new DeleteFlyerUseCase(repository);

const controller = new FlyerController(
  createFlyer,
  getFlyer,
  getFlyerFile,
  updateFlyer,
  deleteFlyer
);

app.use('/api/flyers', createFlyerRoutes(controller));

app.use(errorHandler);

export { app };