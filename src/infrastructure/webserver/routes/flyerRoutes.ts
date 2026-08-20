import { Router } from 'express';
import { FlyerController } from '../controllers/FlyerController';
import { upload } from '../middlewares/multerConfig';

export const createFlyerRoutes = (controller: FlyerController) => {
  const router = Router();

  router.post('/', upload.single('file'), controller.create.bind(controller));
  router.get('/:id', controller.get.bind(controller));
  router.get('/:id/file', controller.getFile.bind(controller));
  router.put('/:id', upload.single('file'), controller.update.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));

  return router;
};