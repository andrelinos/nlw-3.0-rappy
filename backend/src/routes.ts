import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OphanagesController.index);
routes.get('/orphanages/:id', OphanagesController.show);
routes.post('/orphanages', upload.array('images'), OphanagesController.create);

export default routes;


