import { Router } from 'express';
import ImageController from '../controllers/ImageController';

const imageRouter = Router();

imageRouter.get('/:companyID/:fileName', ImageController.searchImage);
imageRouter.get('/:companyID/brands/:fileName', ImageController.searchImageFromBrands);

export default imageRouter;
