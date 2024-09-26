import { Router } from 'express';
import ImageController from '../controllers/ImageController';

const imageRouter = Router();

imageRouter.get('/:nomePasta/:nomeArquivo', ImageController.searchImage);

export default imageRouter;
